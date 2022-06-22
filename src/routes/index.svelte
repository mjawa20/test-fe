<script>
	import Modal from '$lib/Modal.svelte';
</script>

<div class="w-full md:w-1/2 space-y-3">
	<div class="bg-slate-200 ">Transaksi</div>
	<div class="flex ">
		<p style="min-width: 100px;" for="no">No</p>
		<p>172637gas</p>
	</div>
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
			<option selected value={null}>jaw </option>
		</select>
	</div>
</div>

<h1>Keranjang</h1>
<hr>
<div class="">
    <div class="w-80 bg-slate-200 text-center">
        <div>
            <h5>product name</h5>
            <p class="">3 x Rp 20000</p>
            <div class="flex justify-center">
                <span class="bg-red-200">80%</span>
                <p class="line-through">Rp 20000</p>
            </div>
        </div>
    </div>
</div>
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
