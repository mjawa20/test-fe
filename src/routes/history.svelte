<script>
	import { onMount } from 'svelte';
	import { fetchtransaksi, transaksi } from '../store/transaksi';

	let loading = false;
	let data = [];
	let cari = '';

    const getOnlyDate = (date)=>{
        return date.split(' ')[0];
    }
	onMount(async () => await onLoad());
	const onLoad = async () => {
        loading = true;
        
		await fetchtransaksi();
		data = $transaksi;

		loading = false;
	};
	$: {
		if (cari) {
			data = data.filter((item) => item.kode.toLowerCase().includes(cari.toLowerCase()));
		} else {
			data = [...$transaksi];
		}
	}
</script>

<div class="flex justify-end mb-5">
	<div>
		Cari
		<input type="text" class="border" bind:value={cari} />
	</div>
</div>
<table class="table-auto w-full">
	<thead class="bg-slate-200">
		<tr>
			<th width="5%">No</th>
			<th width="10%">Kode</th>
			<th width="15%">tanggal</th>
			<th width="20%">Nama Customer</th>
			<th width="13%">SubTotal</th>
			<th width="11%">Diskon</th>
			<th width="11%">ongkir</th>
			<th width="15%">total</th>
		</tr>
	</thead>
	<tbody>
		{#if loading}
			<tr>
				<td colspan="4" class="text-center">loading...</td>
			</tr>
		{:else if data}
			{#each data as transaksi, index}
				<tr>
					<td>{index + 1}</td>
					<td>{transaksi.kode}</td>
					<td>{getOnlyDate(transaksi.tgl)}</td>
					<td>{transaksi.cust_id}</td>
					<td>{transaksi.subtotal}</td>
					<td>{transaksi.diskon}</td>
					<td>{transaksi.ongkir}</td>
					<td>{transaksi.total_bayar}</td>
				</tr>
			{/each}
		{:else if !loading && !data}
			<tr>
				<td colspan="4" class="text-center">emmpty data</td>
			</tr>
		{/if}
	</tbody>
</table>
