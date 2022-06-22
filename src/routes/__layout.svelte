<script>
	import Navbar from '$lib/Navbar.svelte';
</script>

<div class="mx-auto max-w-5xl px-7">
	<Navbar />
	<slot />
</div>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
