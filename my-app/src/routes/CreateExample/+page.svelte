<script>
import Example from '$lib/tutorial/Example.svelte'
import {ExampleServiceClient} from '$lib/client/ExampleService'
let request = {}
let response = {}

async function makeRequest() {
    response = await ExampleServiceClient.getExample(request)
}
</script>
Request
<Example />

<button on:click={makeRequest}> Send Request</button>

Response
<Example />
