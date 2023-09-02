<script> // @ts-nocheck
import {OperatingSystem} from "$lib/gen/example_pb"
export let message;
if (message == null ) {
    message = new OperatingSystem ()
}
</script>
oneof
<input class="message-windowsVersion" bind:value={message.windowsVersion} >

oneof
<input class="message-macVersion" bind:value={message.macVersion} >

oneof
<input class="message-linuxDistro" bind:value={message.linuxDistro} >

