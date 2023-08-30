<script> // @ts-nocheck
import ExampleEdit from '$lib/tutorial/ExampleEdit.svelte'
import Example from '$lib/tutorial/Example.svelte'
import {ExampleServiceClient} from '$lib/client/ExampleService'
let request = {}
let response = {}

  async function makeRequest() {
    response = await ExampleServiceClient.CreateExample(request)
}
  
</script>
Request
<ExampleEdit Example={request}/>
<button on:click={makeRequest}> Send Request</button>
Response
<Example Example={response}/>
