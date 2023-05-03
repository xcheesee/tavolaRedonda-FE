<script lang="ts">
  import { createMutation, createQuery, useQueryClient } from "@tanstack/svelte-query";
  import { delPedido } from "../../utils/funcs.js";
  import type { PedidoQuery } from "../../utils/types.js";
  import { toastStore, type ToastSettings } from "@skeletonlabs/skeleton";
	import ClientePedidoCard from "../../components/clientePedidoCard.svelte";

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
          pedidos: [...prevPeds.pedidos.filter(ele => +ele.id !== +id)]
        })
      }
      return {...prevPeds}
    },
    onSettled: () => queryClient.invalidateQueries(['pedidos']),
    onError: (context: any) => {
      toastStore.trigger(failDelToast)
      if (context?.prevPeds) {
        queryClient.setQueryData(['pedidos'], context.prevPeds)
      }
    },
    onSuccess: () => toastStore.trigger(delToast)
  })

</script>
{#if $pedidosQuery.isLoading}
  <div>Carregando...</div>
{:else}
  <div class="grid xl:grid-cols-3 lg:grid-cols-2 px-8 py-8 gap-8">
    {#each $pedidosQuery.data.pedidos as pedido}
      <ClientePedidoCard pedido={pedido} delPedido={ () => $delPedidoMutation.mutate(pedido.id) }/>
    {/each}
  </div>
{/if}
