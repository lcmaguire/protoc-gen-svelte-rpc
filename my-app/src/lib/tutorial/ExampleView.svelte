<script> // @ts-nocheck
export let Example;
if (Example == null ) {
    Example = {}
}
import ExtraView from '$lib/tutorial/ExtraView.svelte'
</script>
<p class="Example-name"> Example.name : {Example.name} </p>

<p class="Example-displayName"> Example.displayName : {Example.displayName} </p>

<p class="Example-active"> Example.active : {Example.active}  </p>

<p class="Example-count"> Example.count : {Example.count} </p>

<!-- ./example_pb.js import("./example_pb.js").Extra Extra -->
<ExtraView Extra={Example.extra} />

