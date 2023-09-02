<script> // @ts-nocheck
import {OperatingSystem_LinuxInfo} from "$lib/gen/example_pb"
export let message;
if (message == null ) {
    message = new OperatingSystem_LinuxInfo ()
}
</script>

<input class="message-distro" bind:value={message.distro} >



<input class="message-arch" type=checkbox  bind:checked={message.arch} >


