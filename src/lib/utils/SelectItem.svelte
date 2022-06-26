<script>
	export let title;
	export let data;
	export let value;
</script>

<select bind:value class="border p-1 w-full md:w-56" placeholder="asd">
	<option value={null} selected>{title}</option>
	{#each data as item}
		<option value={item.id}>{item.nama}</option>
	{/each}
</select>
