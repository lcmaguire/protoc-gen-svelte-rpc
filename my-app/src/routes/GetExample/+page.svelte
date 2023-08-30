<script> // @ts-nocheck
import GetExampleRequestEdit from '$lib/tutorial/GetExampleRequestEdit.svelte'
import Example from '$lib/tutorial/Example.svelte'
import {ExampleServiceClient} from '$lib/client/ExampleService'
let request = {}
let response = {}

  async function makeRequest() {
    response = await ExampleServiceClient.GetExample(request)
}
  
</script>
Request
<GetExampleRequestEdit GetExampleRequest={request}/>
<button on:click={makeRequest}> Send Request</button>
Response
<Example Example={response}/>
