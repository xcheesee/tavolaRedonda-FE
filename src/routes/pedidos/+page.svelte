<script lang="ts">
    export let data;
    console.log(data)
</script>
<div class="grid grid-flow-col auto-cols-[400px] px-8 py-8 gap-8">
  {#each data.pedidos as pedido}
    <div class="card p-4 grid grid-cols-3 gap-4 self-start">
      <p class="text-xl text-neutral-300">Pedido N#{pedido.id}</p>
      {#if pedido.Status === 0}
      <p class="text-red-500 col-start-3">Em andamento</p>
      {:else if pedido.Status === 1}
      <p class="text-green-500 col-start-3">Finalizado</p>
      {/if}
      <p>Itens:</p>
      <div class="grid col-span-3 divide-y rounded border border-primary-900 py-2 bg-primary-700">
      {#each pedido.pedido_itens as item}
        <div class="grid grid-cols-[1fr_max-content] px-6 py-2">
          <div class="text-neutral-200">{item.produto.nome}</div>
          <div class="text-primary-400 col-start-1">{item.produto.descricao}</div>
          <div class="ol-start-2 self-center justify-self-center">R$ {item.produto.valor} * {item.quantidade} un</div>
        </div>
      {/each}
      </div>
      <div class="pt-8 col-span-3 text-center">Pagamento: {pedido.forma_pagamento}</div>
    </div>
  {/each}
</div>
