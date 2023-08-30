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
  let nf = schema.generateFile(`lib/${message.typeName.replace(".", "/")}.svelte`)
  nf.print(message.name)
  nf.print(message.typeName) // write to this dir split.
  for (let i = 0; i < message.fields.length; i++) {
    let currentField = message.fields[i]
    nf.print(currentField.name)
  }
}

function generateRoute(schema: Schema, method: DescMethod) {
  let nf = schema.generateFile(`routes/${method.name}/+page.svelte`)

  nf.print("<script>")

  nf.print(`import ${method.input.name} from '$lib/${method.input.typeName.replace(".", "/")}.svelte'`)

  if (method.input.typeName !== method.output.typeName) {
    nf.print(`import ${method.output.name} from '$lib/${method.output.typeName.replace(".", "/")}.svelte'`)
  }

  let serviceName = method.parent.name
  let methodName = method.name

  nf.print(`import ${serviceName}Client from '$lib/client/${serviceName}'`)

  nf.print("let request = {}")
  nf.print("let response = {}")

  nf.print(`
  async function makeRequest() {
    response = await ${serviceName}Client.${methodName}(request)
}
  `)

  nf.print("</script>")

  // import request
  nf.print("Request")
  nf.print(`<${method.input.name} />`)

  nf.print(`<button on:click={makeRequest}> Send Request</button>`)

  // import response
  nf.print("Response")
  nf.print(`<${method.output.name} />`)
}

/*

let baseURL = ""
const transport = createConnectTransport({
  baseUrl: baseURL,
})
const client = createPromiseClient(ExampleService, transport)
  
export {client}
*/

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