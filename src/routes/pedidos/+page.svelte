<script lang="ts">
  import Icon from "@iconify/svelte";
  import { createMutation, createQuery, useQueryClient } from "@tanstack/svelte-query";
  import { delPedido } from "../../utils/funcs.js";
  import type { PedidoQuery } from "../../utils/types.js";
  import { toastStore, type ToastSettings } from "@skeletonlabs/skeleton";

  export let data;

  const queryClient = useQueryClient();
  const delToast: ToastSettings = {
    message: "Pedido excluido com sucesso!",
    background: "variant-ghost-success",
  }

  const failDelToast: ToastSettings = {
    message: "Nao foi possivel excluir o Pedido :(",
    background: "bg-red-500",
  }

  const pedidosQuery = createQuery({
    queryKey: ['pedidos'],
    queryFn: async () => await(await fetch("http://127.0.0.1:8000/api/pedidos")).json(),
    initialData: data
  })

  const delPedidoMutation = createMutation(delPedido, {
    onMutate: async (id:  string) => {
      await queryClient.cancelQueries(['pedidos'])
      const prevPeds: PedidoQuery | undefined = queryClient.getQueryData(['pedidos'])

      if (prevPeds) {
        queryClient.setQueryData(['pedidos'], {
          mensagem: prevPeds.mensagem,
          pedidos: prevPeds.pedidos.filter(ele => ele.id !== id)
        })
      }
      return [prevPeds]
    },
    onSettled: () => queryClient.invalidateQueries(['pedidos']),
    onError: () => toastStore.trigger(failDelToast),
    onSuccess: () => toastStore.trigger(delToast)
  })

</script>
{#if $pedidosQuery.isLoading}
  <div>Carregando...</div>
{:else}
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
        {#if pedido.Status !== 1}
          <div class="flex items-center justify-end">
            <button class="icon-btn  bg-red-600 flex rounded-lg justify-center items-center px-2 py-1 gap-2" on:click={() => {
              $delPedidoMutation.mutate(pedido.id)
              }}>
              Cancelar pedido 
              <Icon icon="material-symbols:cancel-outline" heigth="36" width="36" />
            </button>
          </div>
        {/if}
      </div>
    {/each}
  </div>
{/if}
