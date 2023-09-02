<script> // @ts-nocheck
import {OperatingSystem} from "$lib/gen/example_pb"
export let message;
if (message == null ) {
    message = new OperatingSystem ()
    // message.operatingSystem.case = ""
    // message.operatingSystem.value = ""
   // message.
   console.log(message)
}

// option one get func like below for all fields.
function handleInput(){
    console.log(message)
    message.operatingSystem.value = message.macVersion
    message.operatingSystem.case = "macVersion"
    console.log(message)
}

// option some form of subscribable and update value based upon that.

</script>
oneof
<input class="message-windowsVersion" bind:value={message.windowsVersion} >

oneof
<input class="message-macVersion" bind:value={message.macVersion}  on:input={() => handleInput() }>

oneof
<input class="message-linuxDistro" bind:value={message.linuxDistro} >

