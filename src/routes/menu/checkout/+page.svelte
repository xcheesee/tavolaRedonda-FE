<script lang="ts">
	import CheckoutItemCard from "../../../components/CheckoutItemCard.svelte";
	import { carrinhoStore } from "../../../utils/stores";

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
			<div> Carrinho Vazio! </div>
		{:else}
			{#each Object.values($carrinhoStore) as item}
				<CheckoutItemCard item={item} calculaTotal={calculaTotal} />
			{/each}
			<div class="flex justify-between">
			  <div> Total: R${current} </div>
				<button class="btn variant-ghost-success">Finalizar Compra</button>
			</div>
		{/if}
	</div>
</div>
