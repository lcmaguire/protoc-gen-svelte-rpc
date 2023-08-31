<script> // @ts-nocheck
import ExtraEdit from '$lib/tutorial/ExtraEdit.svelte'
import {Example} from "$lib/gen/example_pb"
export let message;
if (message == null ) {
    message = new Example ()
}
</script>
<input class="message.name" bind:value={message.name} >
<input class="message.displayName" bind:value={message.displayName} >
<input class="message.active" bind:value={message.active} >
<input class="message.count" bind:value={message.count} >
<input class="message.extra" bind:value={message.extra} >
<input class="message-name" bind:value={message.name} >

<input class="message-displayName" bind:value={message.displayName} >

<input class="message-active" type=checkbox  bind:checked={message.active}>

<input class="message-count" type=number bind:value={message.count} min=0 step="1" >

<ExtraEdit bind:Extra={message.extra} />

