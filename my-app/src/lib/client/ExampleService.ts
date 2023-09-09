  
  /* this file was generated by protoc-gen-svelte-rpc do not edit */
  import { createConnectTransport } from "@bufbuild/connect-web";
  import { createPromiseClient } from "@connectrpc/connect";


  import {ExampleService} from "$lib/gen/example_connect"
  // TODO have a component which edits BaseURL + headers
  let baseURL = "http://localhost:8080"
const transport = createConnectTransport({
  baseUrl: baseURL,
})
export const ExampleServiceClient = createPromiseClient(ExampleService, transport)
