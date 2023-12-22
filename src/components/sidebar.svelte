<script>
	import { image, memory, user } from '../lib/store';
	import Memory from './memory.svelte';

	memory.images.push(...[image, image]);

	$user.memories.push(...[memory]);
</script>

<div
	class="w-1/5 h-2/3 top-[4.25rem] left-1 bg-white text-black z-[10000] fixed rounded-lg p-5 flex flex-col gap-2"
>
	<h5 class="font-bold text-lg">Memories</h5>
	<div class="memories overflow-x-auto flex flex-col gap-2">
		{#each $user.memories as memory}
			<Memory {memory} />
		{/each}
	</div>
</div>
