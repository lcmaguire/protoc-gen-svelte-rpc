<script> // @ts-nocheck
import ExtraEdit from '$lib/tutorial/ExtraEdit.svelte'
import NestEdit from '$lib/tutorial/Example.NestEdit.svelte'
import OperatingSystemEdit from '$lib/tutorial/OperatingSystemEdit.svelte'
import {Example} from "$lib/gen/example_pb"
export let message;
if (message == null ) {
    message = new Example ()
}
function pushtagsArray() {if (message.tags == undefined) {message.tags = []};message.tags = message.tags.concat("")}
function removetagsArray(index) {message.tags.splice(index, 1); message.tags = message.tags}

</script>
<input class="message-name" bind:value={message.name} >

<input class="message-displayName" bind:value={message.displayName} >

<input class="message-active" type=checkbox  bind:checked={message.active} >

<input class="message-count" type=number bind:value={message.count} min=0 step="1" >

<ExtraEdit bind:message={message.extra} />


        <label for="message-tags"> message.tags </label>

        {#each message.tags as item, key} 
            <input class="message-tags" bind:value={item} >

            <button on:click={() => removetagsArray(key)}> Remove from message.tags</button>
        {/each}
        <button on:click={pushtagsArray}> Add to message.tags</button>
        
<NestEdit bind:message={message.nest} />

<select bind:value={message.clean}>
<option value="CLEANLINESS_UNSPECIFIED">CLEANLINESS_UNSPECIFIED</option>
<option value="CLEANLINESS_DISGUSTING">CLEANLINESS_DISGUSTING</option>
<option value="CLEANLINESS_BAD">CLEANLINESS_BAD</option>
<option value="CLEANLINESS_GOOD">CLEANLINESS_GOOD</option>
<option value="CLEANLINESS_EXCELLENT">CLEANLINESS_EXCELLENT</option>
</select><br>

<select bind:value={message.birdNest}>
<option value="BIRD_NEST_UNDEFINED">BIRD_NEST_UNDEFINED</option>
<option value="BIRD_NEST_DESTROYED">BIRD_NEST_DESTROYED</option>
<option value="BIRD_NEST_BUILT">BIRD_NEST_BUILT</option>
</select><br>

<OperatingSystemEdit bind:message={message.os} />

