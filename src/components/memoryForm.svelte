<script>
	export let hidden, onPostSubmit;

	import { user } from '../lib/store';

	let title, description;
	function onSubmit() {
		const memory = {
			id: 0,
			location: 'London',
			time: Date.now(),
			description,
			title,
			created_at: Date.now(),
			updated_at: null,
			images: [],
			videos: [],
			user: user
		};

		$user.memories = [...$user.memories, memory];

		console.log(memory);

		onPostSubmit();
	}
</script>

<form
	class="fixed z-[1000] rounded-sm w-1/3 flex flex-col bottom-5 right-5 bg-white p-5 gap-1 text- {hidden &&
		'hidden'}"
	on:submit={onSubmit}
>
	<h5>Enter details for your memory</h5>
	<input type="text" bind:value={title} placeholder="Title" />
	<input type="text" bind:value={description} placeholder="Description" />
	<div class="flex gap-1 items-center">
		<div>Images:</div>
		<input type="file" />
	</div>
	<div class="flex gap-1 items-center">
		<div>Videos:</div>
		<input type="file" />
	</div>
	<button class="btn">Submit</button>
</form>
