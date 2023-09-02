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
        message.operatingSystem.case = view;
            
    message = new OperatingSystem(); // todo double check template
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
{#if view == "windowsVersion"}
<input class="message-operatingSystem.value" type=number bind:value={message.operatingSystem.value} min=0 step="1"   >
 
{/if}
{#if view == "macVersion"}
<input class="message-operatingSystem.value" bind:value={message.operatingSystem.value} >

{/if}
{#if view == "linuxInfo"}
<LinuxInfoEdit bind:message={message.operatingSystem.value}  />

{/if}
