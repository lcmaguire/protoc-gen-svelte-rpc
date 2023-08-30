<script>
import GetExampleRequest from '$lib/tutorial/GetExampleRequest.svelte'
import Example from '$lib/tutorial/Example.svelte'
import ExampleServiceClient from '$lib/client/ExampleService'
let request = {}
let response = {}
</script>
Request
<GetExampleRequest />
Response
<Example />
