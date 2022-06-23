<script>
import { page } from "$app/stores";


	let links = [
		{ name: 'Transaksi', link: '/' },
		{ name: 'History', link: '/history' },
		{ name: 'Barang', link: '/barang' },
		{ name: 'Customer', link: '/customer' }
	];
</script>

<div class=" text-center mt-20 border-b mb-10">
	<h1 class="text-3xl font-normal mb-4">Department Produksi</h1>
	<div class="overflow-x-auto">
		<div class="min-w-max space-x-10 text-lg font-normal my-5 overflow-clip">
			{#each links as link}
				<a class={$page.url.pathname === link.link ? 'border-b border-black ' :''} href={link.link}>{link.name}</a>
			{/each}
		</div>
	</div>
</div>
