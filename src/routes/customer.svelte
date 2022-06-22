<script>
	import Modal from '$lib/Modal.svelte';
	import { customer, fetchcustomer } from '../store/customer';
	import { onMount } from 'svelte';

	let loading = false;
	let data = [];
    let cari = "";

	onMount(async () => await onLoad());
	const onLoad = async () => {
		loading = true;

		await fetchcustomer();
		data = $customer;

		loading = false;
	};
	$: {
        if (cari) {
            data = data.filter((item) => item.nama.toLowerCase().includes(cari.toLowerCase()));
        }else{
            data = [...$customer]
        }
    };
</script>

<div class="flex justify-between mb-5">
	<Modal >
        jiashd
    </Modal> 
	<div>
		Cari
		<input type="text" class="border" bind:value={cari} />
	</div>
</div>
<table class="table-auto w-full">
	<thead class="bg-slate-200">
		<tr>
			<th width="10%">No</th>
			<th width="24%">Kode</th>
			<th width="40%">Nama</th>
			<th width="25%">Telp</th>
		</tr>
	</thead>
	<tbody>
		{#if loading}
			<tr>
				<td colspan="4" class="text-center">loading...</td>
			</tr>
		{:else if data}
			{#each data as customer, index}
				<tr>
					<td>{index +1}</td>
					<td>{customer.kode}</td>
					<td>{customer.nama}</td>
					<td>{customer.telp}</td>
				</tr>
			{/each}
		{:else if !loading && !data}
			<tr>
				<td colspan="4" class="text-center">emmpty data</td>
			</tr>
		{/if}
	</tbody>
</table>
