<script>
	export let onAccept, onCancel;
</script>

<div class="flex flex-col gap-2">
	<div>Do you want to add a memory here</div>
	<div class="flex justify-end gap-1">
		<button class="btn btn-sm" on:click={onAccept}>Yes</button>
		<button class="btn btn-sm" on:click={onCancel}>No</button>
	</div>
</div>
