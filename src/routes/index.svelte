<script>
	import Cart from '$lib/transaction/Cart.svelte';
	import Modal from '$lib/utils/Modal.svelte';
	import { customer, fetchcustomer } from '../store/customer';
	import { onMount } from 'svelte';
	import { cart } from '../store/cart';
import Input from '$lib/utils/Input.svelte';

	let customers = [];
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
		sales_id: 0,
		barang_id: 0,
		harga_bandrol: 0,
		qty: 0,
		diskon_pct: 0,
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
		customers = $customer;
		loading = false;
	};

	const handleAddCart = () => {
		cart.set([salesDets, ...$cart]);
	};
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
	<Modal title="cart" >
		<div class="px-5 mt-3">
			<Input name="Nama" placeholder="Nama"  />
			
		</div>	
	</Modal>
</div>
<hr />
{#if $cart.length}
	<div class="py-4 grid gap-4 md:grid-cols-2 grid-cols-1 my-5">
		<Cart />
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

<!-- <table class="table-auto w-full">
	<thead class="bg-slate-200">
		<tr>
			<th width="10%"><Modal /></th>
			<th width="5%">No</th>
			<th width="15%">Kode</th>
			<th width="20%">Nama</th>
			<th width="10%">qty</th>
			<th>Diskon(%)</th>
			<th>Diskon(Rp)</th>
			<th>Harga diskon</th>
			<th>Total</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>
				<a href="">Hapus</a>
			</td>
			<td>1</td>
			<td>12eqwt66</td>
			<td>Malcolm Lockyer</td>
		</tr>
	</tbody>
</table> -->
