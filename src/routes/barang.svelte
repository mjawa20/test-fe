<script>
	import Modal from '$lib/utils/Modal.svelte';
	import { barang, deletebarang, fetchbarang, postBarang, updateBarang } from '../store/barang';
	import { onMount } from 'svelte';
	import Input from '$lib/utils/Input.svelte';
	import { inputNumberLimit, validate } from '../utils';

	let loading = false;
	let data = [];
	let cari = '';
	let isUpload = false;
	let show = false;
	let err = false;
	let methodType = 'post';

	onMount(async () => await onLoad());
	const onLoad = async () => {
		loading = true;

		await fetchbarang();
		data = $barang;

		loading = false;
	};

	let newBarang = {
		id: null,
		nama: '',
		harga: null
	};

	const handlePost = async () => {
		isUpload = true;

		await postBarang(newBarang);
		show = false;
		await onLoad();

		isUpload = false;
		alert('data berhasil ditambahkan');
	};

	const handleDelete = async (id) => {
		await deletebarang(id);
		alert('delete success');
		await onLoad();
	};

	const handleUpdate = async () => {
		isUpload = true;
		await updateBarang(newBarang);
		show = false;

		isUpload = false;
		alert('data berhasil diupdate');
		await onLoad();
	};

	$: {
		if (cari) {
			data = data.filter((item) => item.nama.toLowerCase().includes(cari.toLowerCase()));
		} else {
			data = [...$barang];
		}
		newBarang.harga = inputNumberLimit(newBarang.harga, 9999999999, 0);
	}
	$: {
		if (methodType === 'post') {
			newBarang = {
				id: null,
				nama: '',
				harga: ''
			};
		}
	}
</script>

<div class="flex flex-col md:flex-row md:justify-between mb-5">
	<Modal
		bind:methodType
		on:submit={methodType == 'post' ? handlePost : handleUpdate}
		bind:show
		title="Barang"
		{isUpload}
		isValid={validate(newBarang, ['kode'])}
	>
		<div class="px-5 mt-3">
			<Input name="Nama" placeholder="Nama" bind:value={newBarang.nama} />
			<label for="" class="mr-10"
				>price

				<input
					min="0"
					type="number"
					bind:value={newBarang.harga}
					on:focus={() => (err = true)}
					class="disabled:bg-slate-100 mt-1 px-3 py-2 bg-white border  {err && !newBarang.harga
						? 'border-red-600 text-red-600 placeholder:text-red-600'
						: 'border-slate-300'} block w-full rounded-md sm:text-sm "
					{isUpload}
				/>
				{#if err && !newBarang.harga}
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
<div class="overflow-x-auto">
	<table style="min-width: 600px;" class="table-auto w-full border-collapse">
		<thead class="bg-slate-200">
			<tr>
				<th width="10%">No</th>
				<th width="20%">Kode</th>
				<th width="25%">Nama</th>
				<th width="25%">Harga</th>
				<th width="20%">action</th>
			</tr>
		</thead>
		<tbody>
			{#if loading}
				<tr>
					<td colspan="4" class="text-center">loading...</td>
				</tr>
			{:else if data.length}
				{#each data as barang, index}
					<tr class="my-5">
						<td>{index + 1}</td>
						<td>{barang.kode}</td>
						<td>{barang.nama}</td>
						<td>Rp{barang.harga}</td>
						<td
							><button
								on:click={() => handleDelete(barang.id)}
								class="bg-red-500 text-white rounded p-1 text-sm">Delete</button
							>
							<button
								on:click={() => {
									methodType = 'update';
									newBarang.id = barang.id;
									newBarang.nama = barang.nama;
									newBarang.harga = barang.harga;
									show = true;
								}}
								class="bg-green-500 text-white rounded p-1 text-sm">Update</button
							>
						</td>
					</tr>
				{/each}
			{:else if !data.length}
				<tr>
					<td colspan="4" class="text-center">empty data</td>
				</tr>
			{/if}
		</tbody>
	</table>
</div>
