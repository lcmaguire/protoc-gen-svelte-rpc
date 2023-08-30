<script> // @ts-nocheck
import ExampleEdit from '$lib/tutorial/ExampleEdit.svelte'
import ExampleView from '$lib/tutorial/ExampleView.svelte'
import {Example} from "$lib/gen/example_pb"
import {ExampleServiceClient} from '$lib/client/ExampleService'
let request = new Example()
let response = new Example()

  async function makeRequest() {
    response = await ExampleServiceClient.createExample(request)
}
  
</script>
Request
<ExampleEdit Example={request}/> <br> <br>
<button on:click={makeRequest}> Send Request</button> <br> <br>
Response <br> <br>
<ExampleView Example={response}/>
