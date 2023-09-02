<script> // @ts-nocheck
import {OperatingSystem_LinuxInfo} from "$lib/gen/example_pb"
export let message;
if (message == null ) {
    message = new OperatingSystem_LinuxInfo ()
}
</script>

<label for="message-distro"> message.distro </label> <br>
<input class="message-distro" bind:value={message.distro} >
<br>


<label for="message-arch"> message.arch </label> <br>
<input class="message-arch" type=checkbox  bind:checked={message.arch} >
<br>

