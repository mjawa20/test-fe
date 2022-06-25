<script>
	import { onMount } from 'svelte';
	import { fetchtransaksi, transaksi } from '../store/transaksi';
	import { customer, fetchcustomer } from '../store/customer';

	let loading = false;
	let transaksis = [];
	let customers = [];
	let cari = '';

	const getOnlyDate = (date) => {
		return date.split(' ')[0];
	};
	onMount(async () => await onLoad());
	const onLoad = async () => {
		loading = true;

		await fetchtransaksi();
		await fetchcustomer();
		customers = $customer;
		transaksis = $transaksi;

		loading = false;
	};

	const makeCode = (date, code) => {
		date = date.split('-');
		return date[0] + date[1]+ '-' + code;
	};

	const getCustomer = (id) => {
		let data = customers.filter((item) => item.id == id);
		return data[0];
	};
	$: {
		if (cari) {
			transaksis = data.filter((item) => item.kode.toLowerCase().includes(cari.toLowerCase()));
		} else {
			transaksis = [...transaksis];
		}
	}
</script>

<div class="md:flex md:justify-end mb-5">
	<div class="flex items-center mt-2 md:mt-0">
		<p class="md:block hidden md:mr-3">Cari</p>
		<input placeholder="Cari" type="text" class="border p-1 rounded w-full" bind:value={cari} />
	</div>
</div>
<div class="overflow-x-auto">
	<table style="min-width: 950px;" class="table-auto w-full">
		<thead class="bg-slate-200">
			<tr>
				<th width="5%">No</th>
				<th width="13%">Kode</th>
				<th width="15%">tanggal</th>
				<th width="17%">Nama Customer</th>
				<th width="13%">SubTotal</th>
				<th width="11%">Diskon</th>
				<th width="11%">ongkir</th>
				<th width="15%">total</th>
			</tr>
		</thead>
		<tbody>
			{#if loading}
				<tr>
					<td colspan="8" class="text-center">loading...</td>
				</tr>
			{:else if transaksis.length && customers.length}
				{#each transaksis as transaksi, index}
					<tr>
						<td>{index + 1}</td>
						<td>{makeCode(transaksi.tgl, transaksi.kode)}</td>
						<td>{getOnlyDate(transaksi.tgl)}</td>
						<td>{getCustomer(1).nama}</td>
						<td>{transaksi.subtotal}</td>
						<td>{transaksi.diskon}</td>
						<td>{transaksi.ongkir}</td>
						<td>{transaksi.total_bayar}</td>
					</tr>
				{/each}
			{:else}
				<tr>
					<td colspan="8" class="text-center">emmpty data</td>
				</tr>
			{/if}
		</tbody>
	</table>
</div>
