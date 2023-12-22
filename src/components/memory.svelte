<script>
	export let memory;
</script>

<div class="memory">
	<div
		class="frame"
		style="background: url('{memory.images[0]?.url ?? '/london-pic.jpg'}') center/cover;;"
	>
		<!-- <img class="h-full" src={memory.images[0].url} alt="Memory Image" /> -->
	</div>
	<div class="data">
		<div class="title font-bold">{memory.title}</div>
		<div class="description text-black/80">{memory.description}</div>
		<!-- <br /> -->
		<!-- <div class="date text-right text-sm text-black/80">{memory.time}</div> -->
	</div>
	<div class="ellipse"></div>
</div>

<style>
	.memory {
		@apply w-full flex flex-col gap-1 p-2 rounded-lg bg-slate-300;
	}

	.frame {
		@apply w-full aspect-[3/1] flex justify-center items-center;
		/* background: url('/london-pic.jpg') center/cover; */
	}
</style>
