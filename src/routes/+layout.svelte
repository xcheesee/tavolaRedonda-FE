<script lang='ts'>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-vintage.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { browser } from '$app/environment';
	import { AppShell, Modal, type ModalComponent, Toast } from '@skeletonlabs/skeleton';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import ProdutoForm from '../components/produtoForm.svelte';
	import { userStore } from '../utils/stores';

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

	//let user: User;

	//onMount(() => {
	//	user = JSON.parse(localStorage.getItem('user') || "");
	//})

</script>
<QueryClientProvider client={queryClient}>
	<Modal components={modalComponentRegistry}/>
	<Toast />
	<AppShell>
		<div slot="header" class="flex justify-between px-4 py-2 items-center bg-surface-700">
		<div class="text-3xl"> Tavola Redonda</div>
			<div class="flex gap-8 items-center">
				{#if $userStore.nome !== ""}
				<div class="text-xl">Ola, {$userStore.nome}</div>
				<div>Logout</div>
				{:else}
				<div>Login</div>
				{/if}
			</div>
		</div>
		<slot />
	</AppShell>
</QueryClientProvider>
