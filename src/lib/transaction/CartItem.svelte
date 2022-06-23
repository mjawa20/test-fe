<script>
	import { createEventDispatcher } from 'svelte';

	export let barang;
	export let cart;

	const dispatch = createEventDispatcher();
	$: console.log(cart, 'asd');
	$: console.log(barang, '------------');
</script>

{#if cart && barang}
	<div class="w-full bg-slate-200 p-5">
		<div class="flex justify-between items-center">
			<div>
				<h5 class="font-">{barang.kode}</h5>
				<h5 class="font-normal">{barang.nama}</h5>
				<p class="font-semibold text-lg">{cart.qty} x Rp {cart.harga_diskon}</p>
				{#if cart.diskon_pct}
					<div class="flex mb-3">
						<span class="bg-red-200 text-red-700 text-xs font-bold p-1 rounded rounded mr-2"
							>{cart.diskon_pct}%</span
						>
						<p class="line-through text-xs leading-6">Rp {cart.harga_bandrol}</p>
					</div>
				{/if}
			</div>
			<div>
				<button on:click={() => dispatch('delete', cart.id)}>hapus</button>
				<button on:click={() => dispatch('update', cart.id)}>ubah</button>
			</div>
		</div>
		<div style="height: 1px;" class="w-full bg-black" />
		<div class="flex justify-between items-center">
			total
			<div>
				<h4>Rp{cart.total}</h4>
			</div>
		</div>
	</div>
{:else}
	<div class="animate-pulse w-full h-full bg-slate-300" />
{/if}
