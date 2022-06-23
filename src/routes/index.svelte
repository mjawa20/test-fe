<script>
	import Cart from '$lib/transaction/Cart.svelte';
	import Modal from '$lib/utils/Modal.svelte';
	import { customer, fetchcustomer } from '../store/customer';
	import { onMount } from 'svelte';
	import { cart } from '../store/cart';
	import Input from '$lib/utils/Input.svelte';
	import InputNum from '$lib/utils/InputNum.svelte';
	import { barang, fetchbarang } from '../store/barang';
	import { getBarang, validate } from '../utils';
	import { browser } from '$app/env';
	import { uid } from 'uid';

	let customers = [];
	let barangs = [];
	let loading = false;

	let sales = {
		tgl: '',
		cust_id: 0,
		subtotal: 0,
		diskon: 0,
		ongkir: 0,
		total_bayar: 0
	};

	let salesDets = {
		id: null,
		sales_id: null,
		barang_id: null,
		harga_bandrol: 0,
		qty: null,
		diskon_pct: null,
		diskon_nilai: 0,
		harga_diskon: 0,
		total: 0
	};

	onMount(async () => {
		await load();
	});

	const load = async () => {
		loading = true;
		await fetchcustomer();
		await fetchbarang();
		customers = $customer;
		barangs = $barang;
		loading = false;
	};

	const setNewCart = (newData) => {
		browser && localStorage.setItem('cart', newData);
		cart.set(JSON.parse(newData));
	};

	const handleAddCart = () => {
		const selectedBarang = getBarang(barangs, salesDets.barang_id)[0];

		salesDets.id = uid(8);
		salesDets.harga_bandrol = selectedBarang.harga;
		salesDets.diskon_nilai = Math.round(selectedBarang.harga * (salesDets.diskon_pct / 100));
		salesDets.harga_diskon = salesDets.harga_bandrol - salesDets.diskon_nilai;
		salesDets.total = salesDets.harga_diskon * salesDets.qty;

		let newData = $cart ? JSON.stringify([salesDets, ...$cart]) : JSON.stringify([salesDets]);
		setNewCart(newData);
	};

	const handleDelete = (event) => {
		const filteredCart = $cart.filter((item) => {
			console.log(item.id, 'blblblblb',event.detail);
			return item.id !== event.detail;
		});
		console.log('-----------=---------------', filteredCart, '-----', event.detail);
		setNewCart(JSON.stringify(filteredCart));
	};

	$: console.log($cart);
</script>

<div class="w-full md:w-1/2 space-y-3">
	<div class="bg-slate-200 ">Transaksi</div>
	<div class="flex items-center">
		<p style="min-width: 100px;">tanggal</p>
		<input
			type="date"
			class="
		disabled:bg-slate-100
		border border-gray-300 text-xs font-bold px-2 py-2 w-full rounded-md"
		/>
	</div>
	<div class="flex ">
		<p style="min-width: 100px;">Customer</p>
		<select
			class="
		disabled:bg-slate-100
		border border-gray-300 text-xs font-bold px-2 py-2 w-full rounded-md"
		>
			<option selected value={null}>Customer</option>
			{#each customers as customer}
				<option value={customer.id}>{customer.nama}</option>
			{/each}
		</select>
	</div>
</div>

<div class="flex items-center justify-between my-3">
	<h1>Keranjang</h1>
	<Modal
		on:submit={handleAddCart}
		title="cart"
		isValid={validate(salesDets, [
			'sales_id',
			'harga_bandrol',
			'diskon_nilai',
			'harga_diskon',
			'diskon_pct',
			'total'
		])}
	>
		<div class="px-5 mt-3">
			<select
				bind:value={salesDets.barang_id}
				class="mb-5
		disabled:bg-slate-100
		border border-gray-300 text-xs font-bold px-2 py-2 w-full rounded-md"
			>
				<option selected value={null}>Barang</option>
				{#each barangs as barang}
					<option value={barang.id}>{barang.nama}</option>
				{/each}
			</select>
			<div class="flex space-x-5">
				<InputNum placeholder="qty" bind:value={salesDets.qty} />
				<InputNum
					placeholder="diskon (optional)"
					bind:value={salesDets.diskon_pct}
					opsional={true}
				/>
			</div>
		</div>
	</Modal>
</div>
<hr />
{#if $cart.length}
	<div class="py-4 grid gap-4 md:grid-cols-2 grid-cols-1 my-5">
		{#each $cart as cart}
			<Cart on:delete={handleDelete} {cart} barang={getBarang(barangs, cart.barang_id)[0]} />
		{/each}
	</div>
	<hr />
	<div class="flex justify-end mt-8">
		<div class="w-1/4">
			<div class="flex justify-between ">
				<p>SubTotal</p>
				<p>Rp10000</p>
			</div>
			<div class="flex justify-between">
				<p>Diskon</p>
				<p>Rp10000</p>
			</div>
			<div class="flex justify-between">
				<p>Ongkir</p>
				<p>Rp10000</p>
			</div>
		</div>
	</div>
	<div class="flex justify-evenly w-full">
		<button>Simpan</button>
		<button>Batal</button>
	</div>
{:else}
	<div class="text-center my-10">
		<p>Keranjang Kosong harap tambahkan Keranjang</p>
		<button class="bg-slate-200 p-2 rounded mt-2">Tambah Keranjang </button>
	</div>
{/if}
