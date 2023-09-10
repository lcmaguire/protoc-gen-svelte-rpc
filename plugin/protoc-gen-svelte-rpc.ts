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
import { generateView } from "./view";
import { editView } from "./input";
import { formatMethodName, protoCamelCase } from "./helpers";

export const genMessage = "<!-- this file was generated by protoc-gen-svelte-rpc do not edit-->"
export const genMessageJScomment = "/* this file was generated by protoc-gen-svelte-rpc do not edit */"


const protocGen = createEcmaScriptPlugin({
  name: "protoc-gen-svelte-rpc",
  version: `v0.2.1`,
  parseOption,
  generateTs,
});

runNodeJs(protocGen);

function parseOption(key: string, value: string | undefined) {

}

function generateTs(schema: Schema) {
  for (let i = 0; i < schema.files.length; i++) {
    let file = schema.files[i]

    for (let m = 0; m < file.messages.length; m++) {
      generateView(schema, file.messages[m])
      editView(schema, file.messages[m])
    }

    for (let j = 0; j < file.services.length; j++) {
      let service = file.services[j]
      client(schema, service.name, service.file.name)

      for (let k = 0; k < service.methods.length; k++) {
        let method = service.methods[k]
        // make route with message inside.
        generateRpcComponent(schema, method)
        generateRoute(schema, method)
        apiRoutes(schema, method)
      }
    }
  }
}

function generateRoute(schema: Schema, method: DescMethod) {
  let nf = schema.generateFile(`routes/${method.name}/+page.svelte`)

  nf.print("<script> // @ts-nocheck")
  nf.print(genMessageJScomment)
  nf.print(`import ${method.name} from '$lib/rpc/${method.name}.svelte'`)
  nf.print("</script>")
  nf.print(genMessage)

  nf.print(`<${method.name}/> <br>`)
}

function generateRpcComponent(schema: Schema, method: DescMethod) {
  let nf = schema.generateFile(`lib/rpc/${method.name}.svelte`) // todo consider using full path.

  nf.print("<script> // @ts-nocheck")
  nf.print(genMessageJScomment)
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

  nf.print(`let request = new ${method.input.name}()`)
  nf.print(`let response = new ${method.output.name}()`)

  // todo ${methodName} format in snakeCase.
  nf.print(`
  async function makeRequest() {
    console.log(request)
    // response = await ${serviceName}Client.${formatMethodName(methodName)}(request)
    let apiRes = await fetch("/api/${methodName}", {
      method: "POST",
      body: request.toJsonString(),
      headers: { // todo have headers work nicer
        "content-type": "application/json",
        Authorization: "AHHHHHHH",
      },
    });

    response = response.fromJson(await apiRes.json())
}
  `)

  nf.print("</script>")
  nf.print(genMessage)

  // import request
  nf.print("<h3> Request</h3>")
  nf.print(`<${editComponent} message={request}/> <br>`)

  nf.print(`<button on:click={makeRequest}> Send Request</button> <br>`)

  // import response
  nf.print("<h3> Response</h3>")
  nf.print(`<${viewComponent} message={response}/>`)
}

function client(schema: Schema, serviceName: string, fileName: string) {
  let client = `  
  ${genMessageJScomment}
  import { createConnectTransport } from "@bufbuild/connect-web";
  import { createPromiseClient } from "@connectrpc/connect";


  import {${serviceName}} from "$lib/gen/${fileName}_connect"
  // TODO have a component which edits BaseURL + headers
  let baseURL = "http://localhost:8080"
const transport = createConnectTransport({
  baseUrl: baseURL,
})
export const ${serviceName}Client = createPromiseClient(${serviceName}, transport)`

  let nf = schema.generateFile(`lib/client/${serviceName}.ts`)
  nf.print(client)

}

function apiRoutes(schema: Schema, method: DescMethod) {
  let nf = schema.generateFile(`routes/api/${method.name}/+server.js`) // todo consider using full path.

  let serviceName = method.parent.name
  let requestName = protoCamelCase(method.input.name) // todo consider using nf.Import()
  let methodName = formatMethodName(method.name)
  let tplate = `
  import { ${serviceName}Client } from '$lib/client/${serviceName}';
import { ${requestName} } from '$lib/gen/${method.parent.file.name}_pb';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    let req = ${requestName}.fromJson(await request.json())
    let response = await ${serviceName}Client.${methodName}(req, {headers: request.headers})
    return json(response);
}`

  nf.print(tplate)
}

// Lazy way to include headers into functions.
function headerComponent(schema: Schema) {
  let nf = schema.generateFile(`lib/headers/EditHeaders.svelte`)
  nf.print(`
  <script>
    // @ts-nocheck
    /* this file was generated by protoc-gen-svelte-rpc do not edit */
    export let headers = [];

    if (headers.size == 0) {
        headers[0] = {
            key: "",
            value: "",
        };
        headers = headers;
    }
    function pushHeader() {
        headers = headers.concat({
            key: "",
            value: "",
        });
        headers = headers;
    }
    function removeHeader(index) {
        headers.splice(index, 1);
        headers = headers;
    }
</script>

<h4>Headers</h4>

{#each headers as item, index}
    Key
    <input class="headers-key" bind:value={item.key} />
    Value
    <input class="headers-value" bind:value={item.value} />
    <button on:click={() => removeHeader(index)}> Remove </button> <br />
{/each}

<button on:click={pushHeader}> Add new header</button><br />

  `)


  let headerTypescriptFile = schema.generateFile(`lib/headers/headers.ts`)
  headerTypescriptFile.print(`
  export function httpHeaders(requestHeaders: any) {
      const h = new Headers();
      for (let i in requestHeaders) {
          h.set(requestHeaders[i].key, requestHeaders[i].value);
      }
      return h
  }`)

}