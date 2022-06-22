<script>
	import Modal from '$lib/Modal.svelte';
	import { barang, fetchbarang } from '../store/barang';
	import { onMount } from 'svelte';
	import Input from '$lib/Input.svelte';

	let loading = false;
	let data = [];
	let cari = '';
	let isUpload = false;
	let show = false;

	onMount(async () => await onLoad());
	const onLoad = async () => {
		loading = true;

		await fetchbarang();
		data = $barang;

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
			data = [...$barang];
		}
	}
</script>

<div class="flex justify-between mb-5">
	<Modal>
		<div class="px-5 mt-3">
			<Input name="Nama" placeholder="Nama" />
			<Input name="Price" placeholder="Price" />
		</div>
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
			<th width="25%">Harga</th>
		</tr>
	</thead>
	<tbody>
		{#if loading}
			<tr>
				<td colspan="4" class="text-center">loading...</td>
			</tr>
		{:else if data.length}
			{#each data as barang, index}
				<tr>
					<td>{index}</td>
					<td>{barang.kode}</td>
					<td>Malcolm Lockyer</td>
					<td>Malcolm Lockyer</td>
				</tr>
			{/each}
		{:else if !data.length}
			<tr>
				<td colspan="4" class="text-center">empty data</td>
			</tr>
		{/if}
	</tbody>
</table>
