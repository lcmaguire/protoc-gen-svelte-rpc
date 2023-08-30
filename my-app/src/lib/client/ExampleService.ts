  
  import { createConnectTransport } from "@bufbuild/connect-web";
  import { createPromiseClient } from "@connectrpc/connect";


  import {ExampleService} from "$lib/gen/example_connectweb"
  let baseURL = "http://localhost:8080"
const transport = createConnectTransport({
  baseUrl: baseURL,
})
export const ExampleServiceClient = createPromiseClient(ExampleService, transport)
