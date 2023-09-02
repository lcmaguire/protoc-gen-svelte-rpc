<script> // @ts-nocheck
import {Example} from "$lib/gen/example_pb"
import ExtraView from '$lib/tutorial/ExtraView.svelte'
import NestView from '$lib/tutorial/Example.NestView.svelte'
import OperatingSystemView from '$lib/tutorial/OperatingSystemView.svelte'
export let message;
if (message == null ) {
      message = new Example ()
  }
</script>

<p class="message-name"> message.name : {message.name} </p>



<p class="message-displayName"> message.displayName : {message.displayName} </p>



<p class="message-active"> message.active : {message.active}  </p>



<p class="message-count"> message.count : {message.count} </p>



{#each message.extra as item}
         <ExtraView message={item} />
         {/each}



        {#each message.tags as item }
            <p class="message-tags"> message.tags : {item} </p>

        {/each}
        


<NestView message={message.nest} />



<p class="message-clean"> message.clean : {message.clean} </p>



<p class="message-birdNest"> message.birdNest : {message.birdNest} </p>



<OperatingSystemView message={message.os} />


{#if message.tree.case == "treeType"}
<p class="message-tree.value"> message.tree.value : {message.tree.value} </p>

{/if}
{#if message.tree.case == "bush"}
<p class="message-tree.value"> message.tree.value : {message.tree.value}  </p>

{/if}
