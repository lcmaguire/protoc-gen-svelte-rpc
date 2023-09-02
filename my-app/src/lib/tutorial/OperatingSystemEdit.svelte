<script>
    // @ts-nocheck
    import { OperatingSystem } from "$lib/gen/example_pb";
    export let message;
    if (message == null) {
        message = new OperatingSystem();
        // message.operatingSystem.case = ""
        // message.operatingSystem.value = ""
        // message.
        console.log(message);
    }

    // option one get func like below for all fields.
    function handleOperatingSystemOneof(input) {
        message.operatingSystem.case = input
        switch (input) {
            case "windowsVersion":
                message.operatingSystem.value = message.windowsVersion;
                break;
                case "macVersion":
                message.operatingSystem.value = message.macVersion;
                break;
                case "linuxDistro":
                message.operatingSystem.value = message.linuxDistro;
                break;
        }
    }
</script>

oneof
<input
    class="message-windowsVersion"
    bind:value={message.windowsVersion}
    on:input={() => handleOperatingSystemOneof("windowsVersion")}
/>

oneof
<input
    class="message-macVersion"
    bind:value={message.macVersion}
    on:input={() => handleOperatingSystemOneof("macVersion")}
/>

oneof
<input
    class="message-linuxDistro"
    bind:value={message.linuxDistro}
    on:input={() => handleOperatingSystemOneof("linuxDistro")}
/>
