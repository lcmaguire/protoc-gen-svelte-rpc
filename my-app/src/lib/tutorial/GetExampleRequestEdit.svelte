<script> // @ts-nocheck
import {GetExampleRequest} from "$lib/gen/example_pb"
export let message;
if (message == null ) {
    message = new GetExampleRequest ()
}
</script>
<input class="message.name" bind:value={message.name} >
<input class="message-name" bind:value={message.name} >

