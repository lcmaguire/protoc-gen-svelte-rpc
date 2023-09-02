<script> // @ts-nocheck
import {Example_Nest} from "$lib/gen/example_pb"
export let message;
if (message == null ) {
    message = new Example_Nest ()
}
</script>

<label for="message-info"> message.info </label> <br>
<input class="message-info" bind:value={message.info} >
<br>

