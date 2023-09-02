<script> // @ts-nocheck
import {Extra} from "$lib/gen/example_pb"
export let message;
if (message == null ) {
    message = new Extra ()
}
</script>

<label for="message-more"> message.more </label> <br>
<input class="message-more" bind:value={message.more} >
<br>

