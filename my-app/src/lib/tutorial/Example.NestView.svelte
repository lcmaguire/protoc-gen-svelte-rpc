<script> // @ts-nocheck
import {Example_Nest} from "$lib/gen/example_pb"
export let message;
if (message == null ) {
      message = new Example_Nest ()
  }
</script>

{#if message != undefined}
<p class="message-info"> message.info : {message.info} </p>
{/if}

