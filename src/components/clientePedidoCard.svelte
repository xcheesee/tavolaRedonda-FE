<script lang="ts">
    import Icon from "@iconify/svelte";
	import type { Pedido } from "../utils/types";

    export let pedido: Pedido;
    export let delPedido: () => void
</script>

<div class="card p-4 grid grid-cols-3 gap-4 self-start ">
  <p class="text-xl text-neutral-300">Pedido N#{pedido.id}</p>
  {#if pedido.status_pedido === "recebido"}
  <p class="text-red-500 col-start-3">Recebido</p>
  {:else if pedido.status_pedido === "em_andamento"}
  <p class="text-yellow-500 col-start-3">Em Andamento</p>
  {:else}
  <p class="text-green-500 col-start-3">Finalizado</p>
  {/if}
  <p>Itens:</p>
  <div class="grid col-span-3 divide-y divide-inherit rounded border border-primary-900 bg-primary-700">
    {#each pedido.pedido_itens as item}
    <div class="grid grid-cols-[1fr_max-content] px-6 py-4">
      <div class="text-neutral-200">{item.produto.nome}</div>
      <div class="text-primary-400 col-start-1">{item.produto.descricao}</div>
      <div class="ol-start-2 self-center justify-self-center">R$ {item.produto.valor} * {item.quantidade} un</div>
    </div>
    {/each}
  </div>
  <div class="text-center col-span-2 flex items-center justify-center"><p>Pagamento: {pedido.forma_pagamento}</p></div>
  {#if pedido.status_pedido !== "finalizado"}
  <div class="flex items-center justify-end">
    <button class="icon-btn  bg-red-600 flex rounded-lg justify-center items-center px-2 py-1 gap-2" on:click={() => {
       delPedido()
      }}>
      Cancelar pedido 
      <Icon icon="material-symbols:cancel-outline" heigth="36" width="36" />
    </button>
  </div>
  {/if}
</div>