<script>
    // @ts-nocheck
    import ExtraEdit from "$lib/tutorial/ExtraEdit.svelte";
    import { Example } from "$lib/gen/example_pb";
    export let message;
    if (message == null) {
        message = new Example();
    }

    function pushtagsArray() {
        if (message.tags == undefined) {
            message.tags = [];
        }
        message.tags = message.tags.concat("");
    }
</script>

<input class="message.name" bind:value={message.name} />
<input class="message.displayName" bind:value={message.displayName} />
<input class="message.active" bind:value={message.active} />
<input class="message.count" bind:value={message.count} />
<input class="message.extra" bind:value={message.extra} />
<input class="message.tags" bind:value={message.tags} />
<input class="message-name" bind:value={message.name} />

<input class="message-displayName" bind:value={message.displayName} />

<input class="message-active" type="checkbox" bind:checked={message.active} />

<input
    class="message-count"
    type="number"
    bind:value={message.count}
    min="0"
    step="1"
/>

<ExtraEdit bind:Extra={message.extra} />

<label for="message-tags"> message.tags </label>

{#each message.tags as item, key}
    <input class="message-tags" bind:value={item} />
{/each}
<button on:click={pushtagsArray}> Add to message.tags</button>
