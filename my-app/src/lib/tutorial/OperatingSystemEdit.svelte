<script> // @ts-nocheck
import {OperatingSystem} from "$lib/gen/example_pb"
export let message;
if (message == null ) {
    message = new OperatingSystem ()
}

    function handleOperatingSystemOneof(input) {
        message.operating_system.case = input
        switch (input) {
case "windowsVersion":
        message.operating_system.value = message.windowsVersion;
        break;
        case "macVersion":
        message.operating_system.value = message.macVersion;
        break;
        case "linuxDistro":
        message.operating_system.value = message.linuxDistro;
        break;
            }
    }
</script>
<input class="message-windowsVersion" bind:value={message.windowsVersion}  on:input={() => handleOperatingSystemOneof("windowsVersion")} >

<input class="message-macVersion" bind:value={message.macVersion}  on:input={() => handleOperatingSystemOneof("macVersion")} >

<input class="message-linuxDistro" bind:value={message.linuxDistro}  on:input={() => handleOperatingSystemOneof("linuxDistro")} >

