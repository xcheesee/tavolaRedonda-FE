<script lang="ts">
  import { createMutation, createQuery, useQueryClient } from "@tanstack/svelte-query";
  import { delPedido, getPedidos } from "../../utils/funcs.js";
  import type { Pedido, PedidoQuery, PedidoStatus } from "../../utils/types.js";
  import { toastStore, type ToastSettings } from "@skeletonlabs/skeleton";
  import ClientePedidoCard from "../../components/clientePedidoCard.svelte";
  import { io } from "socket.io-client"
  import { userStore } from "../../utils/stores.js";


  const socket = io("http://127.0.0.1:3000")

  const queryClient = useQueryClient();

  let byStatus: PedidoStatus = {
      finalizado: [],
      em_andamento: [],
      recebido: []
    }

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
    queryFn: async () => await getPedidos($userStore.token),
    onSuccess: (res) => {
      byStatus = {
        finalizado: [],
        em_andamento: [],
        recebido: []
      }
      res.data.forEach( (pedido: Pedido) => byStatus[pedido.status_pedido].push(pedido))
      byStatus = {...byStatus }
    }
  })

  const delPedidoMutation = createMutation(delPedido, {
    onMutate: async (data: {token:string, pedido_id: string}) => {
      await queryClient.cancelQueries(['pedidos'])
      const prevPeds: PedidoQuery | undefined = queryClient.getQueryData(['pedidos'])

      if (prevPeds) {
        queryClient.setQueryData(['pedidos'], {
          data: [...prevPeds.data.filter(ele => +ele.id !== +data.pedido_id)]
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
    onSuccess: () => {
      toastStore.trigger(delToast)
      socket.emit("pedidoCancelado")
    }
  })


  socket.on("alterarStatus", () => {
    queryClient.cancelQueries(["pedidos"])
    $pedidosQuery.refetch()
  })

</script>
{#if $pedidosQuery.isLoading}
  <div>Carregando...</div>
{:else}
  <div class="flex flex-col xl:grid-cols-3 lg:grid-cols-2 px-8 py-8 gap-8">
    <div class="grid xl:grid-cols-3 lg:grid-cols-2 px-8 py-8 gap-8">
    {#each byStatus.recebido as pedidoRecebido}
      <ClientePedidoCard pedido={pedidoRecebido} delPedido={ async() => $delPedidoMutation.mutate({token: $userStore.token, pedido_id: pedidoRecebido.id}) } />
    {/each}
    </div>
    <div class="grid xl:grid-cols-3 lg:grid-cols-2 px-8 py-8 gap-8">
    {#each byStatus.em_andamento as pedidoRecebido}
      <ClientePedidoCard pedido={pedidoRecebido} delPedido={ async() => $delPedidoMutation.mutate({token: $userStore.token, pedido_id: pedidoRecebido.id}) } />
    {/each}
    </div>
    <div class="grid xl:grid-cols-3 lg:grid-cols-2 px-8 py-8 gap-8">
    {#each byStatus.finalizado as pedidoRecebido}
      <ClientePedidoCard pedido={pedidoRecebido} delPedido={ async() => $delPedidoMutation.mutate({token: $userStore.token, pedido_id: pedidoRecebido.id}) } />
    {/each}
    </div>
  </div>
{/if}
