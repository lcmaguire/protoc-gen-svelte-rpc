<script> // @ts-nocheck
import {GetExampleRequest} from "$lib/gen/example_pb"
export let message;
if (message == null ) {
    message = new GetExampleRequest ()
}
</script>

<label for="message-name"> message.name </label> <br>
<input class="message-name" bind:value={message.name} >
<br>

