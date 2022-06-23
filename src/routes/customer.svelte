<script>
	import Modal from '$lib/utils/Modal.svelte';
	import { customer, fetchcustomer, postCustomer } from '../store/customer';
	import { onMount } from 'svelte';
	import Input from '$lib/utils/Input.svelte';
	import { validate } from '../utils';

	let loading = false;
	let data = [];
	let cari = '';
	let isUpload = false;
	let show = false;
	let newCustomer = {
		nama: '',
		telp: ''
	};

	onMount(async () => await onLoad());
	const onLoad = async () => {
		loading = true;

		await fetchcustomer();
		data = $customer;

		loading = false;
	};

	const handlePost = async () => {
		isUpload = true;

		await postCustomer(newCustomer);
		show = false;
		await onLoad();

		isUpload = false;
	};

	$: {
		if (cari) {
			data = data.filter((item) => item.nama.toLowerCase().includes(cari.toLowerCase()));
		} else {
			data = [...$customer];
		}
	}
</script>

<div class="flex flex-col md:flex-row md:justify-between mb-5">
	<Modal
		on:submit={handlePost}
		bind:show
		title="Customer"
		{isUpload}
		isValid={validate(newCustomer)}
	>
		<div class="px-5 mt-3">
			<Input name="nama" bind:value={newCustomer.nama} />
			<Input name="telp" bind:value={newCustomer.telp} />
		</div>
	</Modal>
	<div class="flex items-center mt-2 md:mt-0">
		<p class="md:block hidden md:mr-3">Cari</p>
		<input placeholder="Cari" type="text" class="border p-1 rounded w-full" bind:value={cari} />
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
		{:else if data.length}
			{#each data as customer, index}
				<tr>
					<td>{index + 1}</td>
					<td>{customer.kode}</td>
					<td>{customer.nama}</td>
					<td>{customer.telp}</td>
				</tr>
			{/each}
		{:else}
			<tr>
				<td colspan="4" class="text-center">emmpty data</td>
			</tr>
		{/if}
	</tbody>
</table>
