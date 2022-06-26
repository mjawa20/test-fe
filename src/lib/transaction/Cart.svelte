<script>
	import { browser } from '$app/env';

	import { createEventDispatcher } from 'svelte';

	import { getBarang } from '../../utils';
	import CartItem from './CartItem.svelte';

	export let cart;
	export let barangs;
	export let sales;
	export let diskon;
	export let ongkir;
	export let show;

	const dispatch = createEventDispatcher();
</script>

{#if cart.length}
	<div class="py-4 grid gap-4 md:grid-cols-2 grid-cols-1 my-5">
		{#each cart as cart}
			<CartItem on:delete on:update {cart} barang={getBarang(barangs, cart.barang_id)[0]} />
		{/each}
	</div>
	<hr />
	<div class="md:flex md:justify-end mx-1 mt-8">
		<div class="md:w-1/3 space-y-1 font-medium">
			<div class="flex justify-between ">
				<p>SubTotal</p>
				<p>Rp{sales.subtotal}</p>
			</div>
			<div class="flex justify-between">
				<p>Diskon</p>
				<p>
					Rp <input
						class="w-28 text-right border border-slate-300 ml-2"
						type="number"
						bind:value={diskon}
					/>
				</p>
			</div>
			<div class="flex justify-between">
				<p>Ongkir</p>
				<p>
					Rp <input
						class="w-28 text-right border border-slate-300 ml-2"
						type="number"
						bind:value={ongkir}
					/>
				</p>
			</div>
			<div class="flex justify-between ">
				<p>Total Bayar</p>
				<p>Rp{sales.total_bayar}</p>
			</div>
		</div>
	</div>
	<div class="flex justify-end space-x-5 w-full my-10">
		<button class="bg-slate-300 p-2 rounded" on:click={() => dispatch('save')}>Simpan</button>
		<button
			on:click={() => {
				browser && localStorage.removeItem('cart');
				location.reload();
			}}>clear</button
		>
	</div>
{:else}
	<div class="text-center my-10">
		<p>Keranjang Kosong harap tambahkan Keranjang</p>
		<button on:click={() => (show = true)} class="bg-slate-200 p-2 rounded mt-2"
			>Tambah Keranjang
		</button>
	</div>
{/if}
