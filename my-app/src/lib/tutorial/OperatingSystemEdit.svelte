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
    message = new OperatingSystem(); // todo double check template
    switch (view) {
        case "linuxInfo":
            message.operatingSystem.value = new OperatingSystem_LinuxInfo(); // todo get this to include ParentName.
            break;
        default:}
    message.operatingSystem.case = view;          
    }
    let view;
    $: view, setupOneof();
    
</script>
<label>

    use windowsVersion for OperatingSystem oneof ?
    <input type="radio" bind:group={view} value={"windowsVersion"} /> <br> <br>
    
    </label> 
{#if view == "windowsVersion"}
<label for="message-operatingSystem.value"> message.operatingSystem.value </label> <br>
<input class="message-operatingSystem.value" type=number bind:value={message.operatingSystem.value} min=0 step="1" >
<br>
{/if}
<label>

    use macVersion for OperatingSystem oneof ?
    <input type="radio" bind:group={view} value={"macVersion"} /> <br> <br>
    
    </label> 
{#if view == "macVersion"}
<label for="message-operatingSystem.value"> message.operatingSystem.value </label> <br>
<input class="message-operatingSystem.value" bind:value={message.operatingSystem.value} >
<br>
{/if}
<label>

    use linuxInfo for OperatingSystem oneof ?
    <input type="radio" bind:group={view} value={"linuxInfo"} /> <br> <br>
    
    </label> 
{#if view == "linuxInfo"}
<LinuxInfoEdit bind:message={message.operatingSystem.value}  />

{/if}
