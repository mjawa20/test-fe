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
				<h5>{barang.kode}</h5>
				<h5>{barang.nama}</h5>
				<p class="">{cart.qty} x Rp {cart.harga_diskon}</p>
				{#if cart.diskon_pct}
					<div class="flex">
						<span class="bg-red-200">{cart.diskon_pct}%</span>
						<p class="line-through">Rp {cart.harga_bandrol}</p>
					</div>
				{/if}
			</div>
			<div>
				<button on:click={() => dispatch('delete', cart.id)}>hapus</button>
				<button>ubah</button>
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
	Loading...
{/if}
