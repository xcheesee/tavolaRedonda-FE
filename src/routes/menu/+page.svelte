<script lang="ts" >
	import MenuItemCard from "../../components/menuItemCard.svelte";
	import Icon from "@iconify/svelte";
	import { carrinhoStore } from "../../utils/stores";
	import { createQuery } from "@tanstack/svelte-query";

	export let data;

	const produtoQuery = createQuery({
		queryKey: ['produtos'],
		queryFn: async () => await (await fetch("https://localhost:8000/api/produtos")).json(),
		initialData: data,
	})

	let produtoData = $produtoQuery.data

	function getProdutoByCat(produtos: any, categoria_id: number) {
		return produtos.filter((ele: any) => ele.categoria_id === categoria_id)
	}

	$: carrinhoItens = Object.keys($carrinhoStore).length

</script>
<div class="grid grid-rows-[max-content_1fr]">
	<div class="flex justify-around px-4 py-2 bg-surface-600">
		<button 
			class="btn"
			on:click={() => produtoData = $produtoQuery.data}>Tudo</button>
		{#each data.categorias as categoria}
		<button 
			class="btn"
			on:click={() => produtoData = {mensagem: "", produto: [...getProdutoByCat($produtoQuery.data.produto, categoria.id)]}}>{categoria.nome}</button>
			
		{/each}
	</div>
	<div class="flex justify-center">
		<div class="flex flex-col gap-4 pt-8 lg:w-[1024px]">
			{#each produtoData.produto as produto}
				<MenuItemCard produto={produto}/>
			{/each}
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