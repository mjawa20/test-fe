<script>
	import Modal from '$lib/utils/Modal.svelte';
	import { barang, fetchbarang, postBarang } from '../store/barang';
	import { onMount } from 'svelte';
	import Input from '$lib/utils/Input.svelte';
	import { validate } from '../utils';

	let loading = false;
	let data = [];
	let cari = '';
	let isUpload = false;
	let show = false;
	let err = false;

	onMount(async () => await onLoad());
	const onLoad = async () => {
		loading = true;

		await fetchbarang();
		data = $barang;

		loading = false;
	};

	let newBarang = {
		nama: '',
		harga: null
	};

	const handlePost = async () => {
		isUpload = true;

		await postBarang(newBarang);
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
	<Modal
		on:submit={handlePost}
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
					<td>{barang.nama}</td>
					<td>Rp{barang.harga}</td>
				</tr>
			{/each}
		{:else if !data.length}
			<tr>
				<td colspan="4" class="text-center">empty data</td>
			</tr>
		{/if}
	</tbody>
</table>
