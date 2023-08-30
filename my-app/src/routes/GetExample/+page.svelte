<script> // @ts-nocheck
import GetExampleRequestEdit from '$lib/tutorial/GetExampleRequestEdit.svelte'
import ExampleView from '$lib/tutorial/ExampleView.svelte'
import {GetExampleRequest} from "$lib/gen/example_pb"
import {Example} from "$lib/gen/example_pb"
import {ExampleServiceClient} from '$lib/client/ExampleService'
let request = new GetExampleRequest()
let response = new Example()

  async function makeRequest() {
    response = await ExampleServiceClient.getExample(request)
}
  
</script>
Request
<GetExampleRequestEdit message={request}/> <br> <br>
<button on:click={makeRequest}> Send Request</button> <br> <br>
Response <br> <br>
<ExampleView message={response}/>
