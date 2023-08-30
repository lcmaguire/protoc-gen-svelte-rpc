#!/usr/bin/env -S npx tsx

// #!/usr/bin/env -S npx tsx is required in addition to chmod 755 on your plugin to get it working locally.

import { createEcmaScriptPlugin, runNodeJs } from "@bufbuild/protoplugin";
import {
  literalString,
  makeJsDoc,
  localName,
  findCustomMessageOption,
} from "@bufbuild/protoplugin/ecmascript";
import { DescField, DescMessage, DescMethod, DescService, FieldDescriptorProto, MethodKind, ScalarType } from "@bufbuild/protobuf";
import type { Schema } from "@bufbuild/protoplugin/ecmascript";

export const genMessage = "<!-- this file was generated by protoc-gen-svelte-rpc do not edit-->"


const protocGen = createEcmaScriptPlugin({
  name: "protoc-gen-svelte",
  version: `v0.2.1`,
  parseOption,
  generateTs,
});

runNodeJs(protocGen);

function parseOption(key: string, value: string | undefined) {

}

function generateTs(schema: Schema) {
  // schema.targets.
  // for each file
  for (let i = 0; i < schema.files.length; i++) {
    let file = schema.files[i]
    // i believe it has difficulty with services.
    for (let m = 0; m < file.messages.length; m++) {
      generateView(schema, file.messages[m])
      editView(schema, file.messages[m])
    }

    for (let j = 0; j < file.services.length; j++) {
      let service = file.services[j]
      client(schema, service.name, service.file.name)
      //genClientFile(schema, service) // gens client for service.
      for (let k = 0; k < service.methods.length; k++) {
        let method = service.methods[k]

        //generateView(schema, method.input)
        //generateView(schema, method.output)
        // make route with message inside.
        generateRoute(schema, method)

      }
    }

    //for (let j = 0; j < file.messages.length; j++) {
    //  generateView(schema, file.messages[j])
    //}
  }
}

function generateView(schema: Schema, message: DescMessage) {
  let nf = schema.generateFile(`lib/${message.typeName.replace(".", "/")}View.svelte`)


  let imports = []

  // gather imports
  for (let i = 0; i < message.fields.length; i++) {
    let curr = message.fields[i]
    if (curr.message != undefined) {
      let a = `import ${curr.message.name}View from '$lib/${curr.message.typeName.replace(".", "/")}View.svelte'`
      imports.push(a)
    }
  }

  nf.print("<script> // @ts-nocheck")
  nf.print(`export let ${message.name};`) // todo have this be type asserted
  nf.print(`if (${message.name} == null ) {
    ${message.name} = {}
}`)
  for (let i in imports) {
    nf.print(imports[i])
  }

  nf.print("</script>")
  for (let i = 0; i < message.fields.length; i++) {
    let currentField = message.fields[i]
    let fieldName = `${message.name}.${protoCamelCase(currentField.name)}` // todo convert to snakeCase

    switch (currentField.fieldKind) {
      case "scalar":
        nf.print(`${getScalarView(currentField, fieldName)}`)
        break
      case "enum":
        nf.print(`${getEnumView(currentField, fieldName)}`)
        break;
      case "message":
        let i = nf.import(currentField.message)
        nf.print(`<!-- ${i.from} ${i.id} ${i.name} -->`)
        nf.print(`${getMessageView(currentField.message, fieldName)}`)
        break;
    }
  }
}

function getScalarView(currentField: DescField, currentName: string) {
  switch (currentField.scalar) {
    case ScalarType.STRING:
      return `<p class="${protoPathToCssPath(currentName)}"> ${currentName} : {${currentName}} </p>\n`
    case ScalarType.BOOL:
      return `<p class="${protoPathToCssPath(currentName)}"> ${currentName} : {${currentName}}  </p>\n`
    case ScalarType.INT32: case ScalarType.INT64: case ScalarType.UINT32: case ScalarType.UINT64: ScalarType.FIXED32;
    case ScalarType.FIXED64: case ScalarType.SFIXED32: case ScalarType.SFIXED64: case ScalarType.DOUBLE: case ScalarType.FLOAT:
      return `<p class="${protoPathToCssPath(currentName)}"> ${currentName} : {${currentName}} </p>\n`
    default:
      return ""
  }
}

function getEnumView(currentField: DescField, currentName: string) {
  return `<p class="${protoPathToCssPath(currentName)}"> ${currentName} : {${currentName}} </p>\n`
}

function getMessageView(message: DescMessage, currentName: string) {
  return `<${message.name}View ${message.name}={${currentName}} />\n`
}
/*
  get - scalar types
  get - enums
  get - messages
  get - nested messages
  get - nested enum
  get - oneof
  get - repeated

*/

function editView(schema: Schema, message: DescMessage) {
  let nf = schema.generateFile(`lib/${message.typeName.replace(".", "/")}Edit.svelte`)

  nf.print("<script> // @ts-nocheck")
  nf.print(`export let ${message.name};`) // todo have this be type asserted.

  nf.print("</script>")
  for (let i = 0; i < message.fields.length; i++) {
    let currentField = message.fields[i]
    let fieldName = `${message.name}.${protoCamelCase(currentField.name)}` // todo convert to snakeCase
    nf.print(`<input class="${fieldName}" bind:value={${fieldName}} >`)
  }
}

function generateRoute(schema: Schema, method: DescMethod) {
  let nf = schema.generateFile(`routes/${method.name}/+page.svelte`)

  nf.print("<script> // @ts-nocheck")

  let editComponent = `${method.input.name}Edit`
  nf.print(`import ${editComponent} from '$lib/${method.input.typeName.replace(".", "/")}Edit.svelte'`)

  let viewComponent = `${method.output.name}View`
  nf.print(`import ${viewComponent} from '$lib/${method.output.typeName.replace(".", "/")}View.svelte'`)

  nf.print(`import {${method.input.name}} from "$lib/gen/${method.input.file.name}_pb"`)
  if (method.output.name !== method.input.name) {
    nf.print(`import {${method.output.name}} from "$lib/gen/${method.output.file.name}_pb"`)
  }

  let serviceName = method.parent.name
  let methodName = method.name

  nf.print(`import {${serviceName}Client} from '$lib/client/${serviceName}'`)

  nf.print(`let request = new ${method.input.name}()`) // todo have this be type asserted.
  nf.print(`let response = new ${method.output.name}()`) // todo have this be type asserted.

  // todo ${methodName} format in snakeCase.
  nf.print(`
  async function makeRequest() {
    response = await ${serviceName}Client.${formatMethodName(methodName)}(request)
}
  `)

  nf.print("</script>")

  // import request
  nf.print("Request")
  nf.print(`<${editComponent} ${method.input.name}={request}/> <br> <br>`)

  nf.print(`<button on:click={makeRequest}> Send Request</button> <br> <br>`)

  // import response
  nf.print("Response <br> <br>")
  nf.print(`<${viewComponent} ${method.output.name}={response}/>`)
}

function client(schema: Schema, serviceName: string, fileName: string) {
  let client = `  
  import { createConnectTransport } from "@bufbuild/connect-web";
  import { createPromiseClient } from "@connectrpc/connect";


  import {${serviceName}} from "$lib/gen/${fileName}_connectweb"
  let baseURL = "http://localhost:8080"
const transport = createConnectTransport({
  baseUrl: baseURL,
})
export const ${serviceName}Client = createPromiseClient(${serviceName}, transport)`

  let nf = schema.generateFile(`lib/client/${serviceName}.ts`)
  nf.print(client)

}

function protoPathToCssPath(input: string) {
  return input.replace(".", "-")
}

function protoCamelCase(snakeCase: string): string {
  let capNext = false;
  let a = ""
  for (let i = 0; i < snakeCase.length; i++) {
    let c = snakeCase.charAt(i);
    switch (c) {
      case "_":
        capNext = true;
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        a = a + c
        capNext = false;
        break;
      default:
        if (capNext) {
          capNext = false;
          c = c.toUpperCase();
        }
        a = a + c
        break;
    }
  }
  return a;
}

function formatMethodName(input: string) {
  let firstChar = input.charAt(0).toLocaleLowerCase()
  let out = firstChar + input.substring(1)
  return out
}
