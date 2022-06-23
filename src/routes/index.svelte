<script>
	import Cart from '$lib/transaction/Cart.svelte';
	import Modal from '$lib/utils/Modal.svelte';
	import { customer, fetchcustomer } from '../store/customer';
	import { onMount } from 'svelte';
	import { cart } from '../store/cart';
	import Input from '$lib/utils/Input.svelte';
	import InputNum from '$lib/utils/InputNum.svelte';
	import { barang, fetchbarang } from '../store/barang';
	import {
		clearData,
		countSubTotal,
		countTotalBayar,
		getBarang,
		inputNumberLimit,
		validate
	} from '../utils';
	import { browser } from '$app/env';
	import { uid } from 'uid';
	import { postTransaksi } from '../store/transaksi';
	import { postSales } from '../store/sales';

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

		clearData(salesDets, ['sales_id', 'harga_bandrol', 'diskon_nilai', 'harga_diskon', 'total']);
	};

	const handleSave = async () => {
		loading = true;
		if (sales.cust_id || sales.tgl) {
			const res = await postTransaksi(sales);
			const kode = await res.data.kode;
			await postSales($cart, kode);
			alert('Sukses menyimpan barang');
			browser && localStorage.removeItem('cart');
			location.reload()
		} else {
			alert('gagal, kolom tanggal dan cutomer harus diisi');
		}
		loading = false;
	};

	const handleDelete = (event) => {
		const filteredCart = $cart.filter((item) => {
			return item.id !== event.detail;
		});
		setNewCart(JSON.stringify(filteredCart));
	};

	$: {
		if ($cart) {
			sales.subtotal = countSubTotal($cart);
		}
		salesDets.diskon_pct = inputNumberLimit(salesDets.diskon_pct, 99, 0);
		salesDets.qty = inputNumberLimit(salesDets.qty, 999, 0);
		sales.diskon = inputNumberLimit(sales.diskon, sales.subtotal, 0);
		sales.ongkir = inputNumberLimit(sales.ongkir, 9999999999, 0);
		sales.total_bayar = countTotalBayar(sales);
	}
</script>

<div class="w-full md:w-1/2 space-y-3">
	<div class="bg-slate-200 ">Transaksi</div>
	<div class="flex items-center">
		<p style="min-width: 100px;">tanggal</p>
		<input
			bind:value={sales.tgl}
			type="date"
			class="
		disabled:bg-slate-100
		border border-gray-300 text-xs font-bold px-2 py-2 w-full rounded-md"
		/>
	</div>
	<div class="flex ">
		<p style="min-width: 100px;">Customer</p>
		<select
			bind:value={sales.cust_id}
			class="
		disabled:bg-slate-100
		border border-gray-300 text-xs font-bold px-2 py-2 w-full rounded-md"
		>
			<option selected value={0}>Customer</option>
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
					placeholder="diskon % (optional) "
					bind:value={salesDets.diskon_pct}
					opsional={true}
				/>
			</div>
		</div>
	</Modal>
</div>
<hr />

<Cart
	cart={$cart}
	{barangs}
	on:delete={handleDelete}
	on:save={handleSave}
	{sales}
	bind:diskon={sales.diskon}
	bind:ongkir={sales.ongkir}
/>
