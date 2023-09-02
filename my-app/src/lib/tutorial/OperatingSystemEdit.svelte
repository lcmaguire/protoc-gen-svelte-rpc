<script> // @ts-nocheck
import LinuxInfoEdit from '$lib/tutorial/OperatingSystem.LinuxInfoEdit.svelte'
import {OperatingSystem} from "$lib/gen/example_pb"
export let message;
if (message == null ) {
    message = new OperatingSystem ()
}
import {OperatingSystem_LinuxInfo} from "$lib/gen/example_pb"


    // any messages within oneof need to be initialized.
    function setupOneof() {
        console.log(message)         
    message = new OperatingSystem(); // todo double check template
    message.operatingSystem.case = view
    switch (message.operatingSystem.case) {
        case "linuxInfo":
            message.operatingSystem.value = new OperatingSystem_LinuxInfo(); // todo get this to include ParentName.
            break;
        default:}            
    }
    let view;
    $: view, setupOneof();
    
</script>
<label>

    <input type="radio" bind:group={view} value={"windowsVersion"} />
    
    windowsVersion
    
    </label><label>

    <input type="radio" bind:group={view} value={"macVersion"} />
    
    macVersion
    
    </label><label>

    <input type="radio" bind:group={view} value={"linuxInfo"} />
    
    linuxInfo
    
    </label>
<!-- operating_system -->
<!-- operatingSystem -->
<!-- message.windowsVersion -->
<!-- OperatingSystem -->
<!-- int32 windows_version = 1 -->
{#if view == "windowsVersion"}
<input class="message-operatingSystem.value" type=number bind:value={message.operatingSystem.value} min=0 step="1"   >
 
{/if}
<!-- operating_system -->
<!-- operatingSystem -->
<!-- message.macVersion -->
<!-- OperatingSystem -->
<!-- string mac_version = 2 -->
{#if view == "macVersion"}
<input class="message-operatingSystem.value" bind:value={message.operatingSystem.value} >

{/if}
<!-- operating_system -->
<!-- operatingSystem -->
<!-- message.linuxInfo -->
<!-- OperatingSystem -->
<!-- tutorial.OperatingSystem.LinuxInfo linux_info = 3 -->
{#if view == "linuxInfo"}
<LinuxInfoEdit bind:message={message.operatingSystem.value}  />

{/if}
