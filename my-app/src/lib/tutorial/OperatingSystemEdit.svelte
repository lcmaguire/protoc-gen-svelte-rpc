<script>
    // @ts-nocheck
    import LinuxInfoEdit from "$lib/tutorial/OperatingSystem.LinuxInfoEdit.svelte";
    import { OperatingSystem } from "$lib/gen/example_pb";
    export let message;
    if (message == null) {
        message = new OperatingSystem();
    }

    let view = "";
    $: view, handleOperatingSystemOneof(view) 

    function handleOperatingSystemOneof(input) {
        console.log(input);
        message.operatingSystem.case = input;
        switch (input) {
            case "windowsVersion":
                message.operatingSystem.value = message.windowsVersion;
                break;
            case "macVersion":
                message.operatingSystem.value = message.macVersion;
                break;
            case "linuxInfo":
                message.operatingSystem.value = message.linuxInfo;
                break;
        }
    }
</script>

<label>
	<input type="radio" bind:group={view} value={"windowsVersion"} />
	windowsVersion
</label>

<label>
	<input type="radio" bind:group={view} value={"macVersion"} />
	macVersion
</label>

<label>
	<input type="radio" bind:group={view} value={"linuxInfo"} />
	linuxInfo
</label>

{#if view == "windowsVersion"}
<input
    class="message-windowsVersion"
    type="number"
    bind:value={message.windowsVersion}
    min="0"
    step="1"
/>
{/if}

{#if view == "macVersion"}
<input class="message-macVersion" bind:value={message.macVersion} />
{/if}

{#if view == "linuxInfo"} 
<LinuxInfoEdit bind:message={message.linuxInfo} />
{/if}