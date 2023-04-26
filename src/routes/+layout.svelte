<script lang='ts'>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-vintage.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { browser } from '$app/environment';
	import { AppShell, Modal, type ModalComponent } from '@skeletonlabs/skeleton';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import ProdutoForm from '../components/produtoForm.svelte';
	import { produtoStore } from '../utils/stores';

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser,
			},
		},
	})

	const modalComponentRegistry: Record<string, ModalComponent> = {
		prodFormModal: {
			ref: ProdutoForm,
			slot: '<p>Pog</p>'
		}
	}

</script>
<QueryClientProvider client={queryClient}>
	<Modal components={modalComponentRegistry}/>
	<AppShell>
		<div slot="header" class="flex justify-between px-4 py-2 items-center bg-surface-700">
		<div class="text-3xl"> Tavola Redonda</div>
			<div class="flex gap-8 items-center">
				<div class="text-xl">Ola, User</div>
				<div>Logout</div>
			</div>
		</div>
		<slot />
	</AppShell>
</QueryClientProvider>
