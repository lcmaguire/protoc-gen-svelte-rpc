<script> // @ts-nocheck
import {Extra} from "$lib/gen/example_pb"
export let message;
if (message == null ) {
    message = new Extra ()
}
</script>
<input class="message.more" bind:value={message.more} >
<input class="message-more" bind:value={message.more} >

