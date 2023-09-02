<script> // @ts-nocheck
import {OperatingSystem} from "$lib/gen/example_pb"
export let message;
if (message == null ) {
      message = new OperatingSystem ()
  }
</script>
<p class="message-windowsVersion"> message.windowsVersion : {message.windowsVersion} </p>

<p class="message-macVersion"> message.macVersion : {message.macVersion} </p>

<p class="message-linuxDistro"> message.linuxDistro : {message.linuxDistro} </p>

