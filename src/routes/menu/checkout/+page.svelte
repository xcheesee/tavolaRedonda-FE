<script lang="ts">
	import type { ModalSettings, ToastSettings } from "@skeletonlabs/skeleton";
	import { toastStore } from "@skeletonlabs/skeleton";
	import CheckoutItemCard from "../../../components/CheckoutItemCard.svelte";
	import { carrinhoStore, userStore } from "../../../utils/stores";
	import { goto } from "$app/navigation";
	import { finalizarPedido } from "../../../utils/funcs";
	import { io } from  "socket.io-client"

	const socket = io("http://127.0.0.1:3000");
	let forma_pagamento: string;
	
	function getTotal(val: string, multiplier: number): number {
		const formattedVal = +val.replace(",", ".")
		const total = formattedVal * multiplier
		return total
	}

	$: current = Object.values($carrinhoStore).reduce((acc, curr) => acc + getTotal(curr.valor, curr.qtd), 0).toFixed(2)

	const pagamentoModal: ModalSettings = {
		type: 'component',
		component: 'pagamentoModal'
	}
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
			<div class="grid grid-cols-2 justify-between">
				<div> Total: R${current} </div>
				<label class="label">
					<p>Forma de Pagamento</p>
				  <select bind:value={forma_pagamento} class="select">
					  <option value="credito">Cartao de Credito</option>
					  <option value="debito">Cartao de Debito</option>
					  <option value="dinheiro">Dinheiro</option>
					</select>
				</label>
				<div class="col-span-2 items-center justify-center">
					<button class="btn variant-ghost-warning" on:click={() => $carrinhoStore = {}}> Limpar Carrinho </button>
					<button class="btn variant-ghost-success" on:click={async () => {

						const res = await finalizarPedido($userStore.token, $carrinhoStore, forma_pagamento)
						if(!res.ok) {
							return toastStore.trigger(errorToast)
						}
						socket.emit("pedidoRealizado", res.data)
						$carrinhoStore = {}
						toastStore.trigger(confToast)

						return goto("/menu")
					}}>Finalizar Compra</button>
				</div>
			</div>
		{/if}
	</div>
</div>
