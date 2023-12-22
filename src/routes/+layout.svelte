<script>
	import '../app.css';
	import Navbar from '../components/navbar.svelte';
</script>

<div id="root">
	<Navbar />
	<slot />
</div>

<style>
	#root {
		display: flex;
		flex-direction: column;
		height: 100vh;
		width: 100vw;
	}
</style>
