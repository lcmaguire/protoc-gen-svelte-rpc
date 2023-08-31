<script> // @ts-nocheck
import {Example} from "$lib/gen/example_pb"
import ExtraView from '$lib/tutorial/ExtraView.svelte'
export let message;
if (message == null ) {
    message = new Example ()
}
</script>
<p class="message-name"> message.name : {message.name} </p>

<p class="message-displayName"> message.displayName : {message.displayName} </p>

<p class="message-active"> message.active : {message.active}  </p>

<p class="message-count"> message.count : {message.count} </p>

<ExtraView message={message.extra} />

