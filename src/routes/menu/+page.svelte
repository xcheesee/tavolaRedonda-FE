<script lang="ts" >
	import MenuItemCard from "../../components/menuItemCard.svelte";
	import Icon from "@iconify/svelte";
	import { carrinhoStore, userStore } from "../../utils/stores";
	import { createQuery } from "@tanstack/svelte-query";
	import { getCategorias, getProdutos } from "../../utils/funcs";
	//import type { PageData } from "../$types";

	//export let data: PageData;

	const produtoQuery = createQuery({
		queryKey: ['produtos'],
		queryFn: async () => await getProdutos($userStore.token),
	})

	const categoriasQuery = createQuery({
		queryKey: ['categorias'],
		queryFn: async () => await getCategorias($userStore.token)
	})


	function getProdutoByCat(produtos: any, categoria_id: number) {
		return produtos.filter((ele: any) => ele.categoria_id === categoria_id)
	}
	$: produtoData = $produtoQuery.data
	$: carrinhoItens = Object.keys($carrinhoStore).length

</script>
<div class="grid grid-rows-[max-content_1fr]">
	<div class="flex justify-around px-4 py-2 bg-surface-600">
		<button 
			class="btn"
			on:click={() => produtoData = $produtoQuery.data}>Tudo</button>
		{#if $categoriasQuery.isLoading}
			<div>Carregando...</div>
		{:else}
			{#each $categoriasQuery.data.categorias as categoria}
			<button 
				class="btn"
				on:click={() => produtoData = { data: [...getProdutoByCat($produtoQuery.data.data, categoria.id)]}}>{categoria.nome}</button>
				
			{/each}
		{/if}
	</div>
	<div class="flex justify-center">
		<div class="flex flex-col gap-4 pt-8 lg:w-[1024px]">
			{#if $produtoQuery.isLoading}
			<div>Carregando...</div>
			{:else}
			{#each produtoData.data as produto}
				<MenuItemCard produto={produto}/>
			{/each}
			{/if}
		</div>
	</div>
	<div class="fixed bottom-0 right-0 m-8">
		<div class="relative inline_block">
			{#if carrinhoItens === 0}
			<div></div>
			{:else}
			<span class="badge-icon bg-primary-600 absolute -top-0 -right-0 z-10" >{carrinhoItens === 0 ? "" : carrinhoItens}</span>
			{/if}
			<a href="/menu/checkout">
				<button class="w-16 h-16 bg-surface-400 rounded-full flex items-center justify-center">
					<Icon icon="ic:outline-shopping-cart" height="32" width="32" color="white"></Icon>
				</button>
			</a>
		</div>
	</div>
</div>
