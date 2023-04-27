<script lang="ts">
	import type { ToastSettings } from "@skeletonlabs/skeleton";
	import { toastStore } from "@skeletonlabs/skeleton";
	import CheckoutItemCard from "../../../components/CheckoutItemCard.svelte";
	import { carrinhoStore } from "../../../utils/stores";
	import { goto } from "$app/navigation";
	import { error } from "@sveltejs/kit";

	function getTotal(val: string, multiplier: number): number {
		const formattedVal = +val.replace(",", ".")
		const total = formattedVal * multiplier
		return total
	}

	$: current = Object.values($carrinhoStore).reduce((acc, curr) => acc + getTotal(curr.valor, curr.qtd), 0).toFixed(2)

	const confToast: ToastSettings = {
		message: "Pedido enviado com sucesso!",
		background: "variant-ghost-success",
		timeout: 5000,
	}

	const errorToast: ToastSettings = {
		message: "Houve um erro no envio :(",
		background: "variant-ghost-error",
		timeout: 5000,
	}

</script>
<div class="flex justify-center">
	<div class="flex flex-col gap-4 pt-8 lg:w-[1024px]">
		{#if Object.keys($carrinhoStore).length === 0}
			<div class="text-center"> Carrinho Vazio! </div>
			<div class="flex justify-center mt-8">
				<button class="btn variant-filled-primary" on:click={() => goto("/menu")}> Voltar ao Menu</button>
			</div>
		{:else}
			{#each Object.values($carrinhoStore) as item}
				<CheckoutItemCard item={item} />
			{/each}
			<div class="flex justify-between">
				<div> Total: R${current} </div>
				<div>
				<button class="btn variant-ghost-warning" on:click={() => $carrinhoStore = {}}> Limpar Carrinho </button>
				<button class="btn variant-ghost-success" on:click={async () => {
					const res = await fetch("http://127.0.0.1:8000/api/pedidos", {
					method: "POST",
					headers: {
					"Content-Type": "application/json"
					},
					body: JSON.stringify({
					cliente_id: 1,
					Status: 0,
					forma_pagamento: "Dinheiro",
					itens: Object.values($carrinhoStore).map(val => ({
					produto_id: val.id, 
					quantidade: val.qtd,
					}))
					})
					})

					if(!res.ok) {
					return toastStore.trigger(errorToast)
					}

					$carrinhoStore = {}
					toastStore.trigger(confToast)

					return goto("/menu")
				}}>Finalizar Compra</button>
																																																																																																																																																																																										    </div>
			</div>
		{/if}
	</div>
</div>
