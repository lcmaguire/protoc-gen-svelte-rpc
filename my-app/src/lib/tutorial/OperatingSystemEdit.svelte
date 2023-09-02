<script> // @ts-nocheck
import {OperatingSystem} from "$lib/gen/example_pb"
export let message;
if (message == null ) {
    message = new OperatingSystem ()
}

    function handleoperatingSystemOneof(input) {
        message.operatingSystem.case = input
        switch (input) {
case "windows_version":
        message.operatingSystem.value = message.windows_version;
        break;
        case "mac_version":
        message.operatingSystem.value = message.mac_version;
        break;
        case "linux_distro":
        message.operatingSystem.value = message.linux_distro;
        break;
            }
    }
</script>
oneof
<input class="message-windowsVersion" bind:value={message.windowsVersion}  on:input={() => handlewindows_versionOneof("message.windowsVersion")} >

oneof
<input class="message-macVersion" bind:value={message.macVersion}  on:input={() => handlemac_versionOneof("message.macVersion")} >

oneof
<input class="message-linuxDistro" bind:value={message.linuxDistro}  on:input={() => handlelinux_distroOneof("message.linuxDistro")} >

