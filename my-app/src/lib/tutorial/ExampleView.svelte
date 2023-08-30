<script> // @ts-nocheck
import {Example} from "$lib/gen/example_pb"
export let message;
if (message == null ) {
    message = new Example ()
}
import ExtraView from '$lib/tutorial/ExtraView.svelte'
</script>
<p class="message-name"> message.name : {message.name} </p>

<p class="message-displayName"> message.displayName : {message.displayName} </p>

<p class="message-active"> message.active : {message.active}  </p>

<p class="message-count"> message.count : {message.count} </p>

<!-- ./example_pb.js import("./example_pb.js").Extra Extra -->
<ExtraView message={message.extra} />

