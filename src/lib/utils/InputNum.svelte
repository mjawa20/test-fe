<script>
    export let value;
</script>
<label for="" class="mr-10"
	>price

	<input
		min="0"
		type="number"
		bind:value
		on:focus={() => (err = true)}
		class="disabled:bg-slate-100 mt-1 px-3 py-2 bg-white border  {err && !newBarang.harga
			? 'border-red-600 text-red-600 placeholder:text-red-600'
			: 'border-slate-300'} block w-full rounded-md sm:text-sm "
		{disabled}
	/>
	{#if err && !newBarang.harga}
		<p class="text-xs text-red-600 mt-1">This field Must filled</p>
	{/if}
</label>
