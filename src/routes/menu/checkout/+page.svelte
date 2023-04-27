<script lang="ts">
	import { redirect } from "@sveltejs/kit";
	import CheckoutItemCard from "../../../components/CheckoutItemCard.svelte";
	import { carrinhoStore } from "../../../utils/stores";
	import { goto } from "$app/navigation";

  function getTotal(val: string, multiplier: number): number {
		const formattedVal = +val.replace(",", ".")
		const total = formattedVal * multiplier
		return total
	}

	function calculaTotal() {
		//tot = Object.values(carrinho).reduce((acc, curr) => acc + getTotal(curr.valor, curr.qtd), 0).toFixed(2)
	}
	$: current = Object.values($carrinhoStore).reduce((acc, curr) => acc + getTotal(curr.valor, curr.qtd), 0).toFixed(2)

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
				<CheckoutItemCard item={item} calculaTotal={calculaTotal} />
			{/each}
			<div class="flex justify-between">
			  <div> Total: R${current} </div>
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
						alert("Houve um erro no envio :(")
					}

					if(confirm("Pedido enviado com sucesso!")) {
						$carrinhoStore = {}
						goto("/menu")
					}
				}}>Finalizar Compra</button>
			</div>
		{/if}
	</div>
</div>
