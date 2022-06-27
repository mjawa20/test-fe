<script>
	import Modal from '$lib/utils/Modal.svelte';
	import {
		customer,
		deleteCustomer,
		fetchcustomer,
		postCustomer,
		updateCustomer
	} from '../store/customer';
	import { onMount } from 'svelte';
	import Input from '$lib/utils/Input.svelte';
	import { validate } from '../utils';

	let loading = false;
	let data = [];
	let cari = '';
	let err = false;
	let isUpload = false;
	let show = false;
	let methodType = 'post';
	let newCustomer = {
		id: null,
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
		newCustomer.telp = '62' + newCustomer.telp;
		await postCustomer(newCustomer);
		show = false;
		await onLoad();

		isUpload = false;
		alert('data berhasil ditambahkan');
	};
	const handleDelete = async (id) => {
		if (confirm('Apakah anda ingin menghapusnya') === true) {
			await deleteCustomer(id);
			alert('delete success');
			await onLoad();
		}
	};

	const handleUpdate = async () => {
		isUpload = true;
		newCustomer.telp = '62' + newCustomer.telp;

		await updateCustomer(newCustomer);
		show = false;

		isUpload = false;
		alert('data berhasil diupdate');
		await onLoad();
	};

	$: {
		if (cari) {
			data = data.filter((item) => item.nama.toLowerCase().includes(cari.toLowerCase()));
		} else {
			data = [...$customer];
		}
	}
	$: {
		if (methodType === 'post') {
			newCustomer = {
				id: null,
				nama: '',
				telp: ''
			};
		}
	}
</script>

<div class="flex flex-col md:flex-row md:justify-between mb-5">
	<Modal
		on:submit={methodType == 'post' ? handlePost : handleUpdate}
		bind:show
		title="Customer"
		{isUpload}
		bind:methodType
		isValid={validate(newCustomer)}
	>
		<div class="px-5 mt-3">
			<Input name="nama" bind:value={newCustomer.nama} />
			<label for="" class="mr-10"
				>Phone

				<div class="flex items-center rounded">
					+62
					<input
						type="number"
						bind:value={newCustomer.telp}
						class="ml-2 disabled:bg-slate-100 mt-1 px-3 py-2 bg-white border {err
							? 'border-red-600 text-red-600 placeholder:text-red-600'
							: 'border-slate-300'} block w-full rounded-md sm:text-sm "
						{isUpload}
					/>
				</div>
				{#if err}
					<p class="text-xs text-red-600 mt-1">This field Must filled</p>
				{/if}
			</label>
		</div>
	</Modal>
	<div class="flex items-center mt-2 md:mt-0">
		<p class="md:block hidden md:mr-3">Cari</p>
		<input placeholder="Cari" type="text" class="border p-1 rounded w-full" bind:value={cari} />
	</div>
</div>
<div class="overflow-y-auto">
	<table style="min-width: 600px;" class="table-auto w-full ">
		<thead class="bg-slate-200">
			<tr>
				<th width="10%">No</th>
				<th width="25%">Kode</th>
				<th width="25%">Nama</th>
				<th width="20%">Telp</th>
				<th width="20%">action</th>
			</tr>
		</thead>
		<tbody>
			{#if loading}
				<tr>
					<td colspan="5" class="text-center">loading...</td>
				</tr>
			{:else if data.length}
				{#each data as customer, index}
					<tr>
						<td>{index + 1}</td>
						<td>{customer.kode}</td>
						<td>{customer.nama}</td>
						<td>{customer.telp}</td>
						<td class="text-center">
							<button
								on:click={() => handleDelete(customer.id)}
								class="bg-red-500 text-white rounded p-1 text-sm">Delete</button
							>
							<button
								on:click={() => {
									methodType = 'update';
									newCustomer.id = customer.id;
									newCustomer.nama = customer.nama;
									newCustomer.telp = customer.telp;
									show = true;
								}}
								class="bg-green-500 text-white rounded p-1 text-sm">Update</button
							>
						</td>
					</tr>
				{/each}
			{:else}
				<tr>
					<td colspan="5" class="text-center">emmpty data</td>
				</tr>
			{/if}
		</tbody>
	</table>
</div>
