<script lang="ts">
  import type { Pedido, PedidoStatus, PedidoQuery } from '../../utils/types';
  import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
  import CozinhaPedidoCard from '../../components/cozinhaPedidoCard.svelte';
  import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';
  import { editStatus } from '../../utils/funcs';
  import { io } from "socket.io-client"

  const socket = io("http://127.0.0.1:3000");

  export let data;
  const queryClient = useQueryClient();

  let byStatus: PedidoStatus = {
    finalizado: [],
    em_andamento: [],
    recebido: []
  }
  const editStatusToast: ToastSettings = {
    message: "Pedido atualizado com sucesso!",
    background: "variant-ghost-success",
  }

  const failEditStatusToast: ToastSettings = {
    message: "Nao foi possivel atualizar o Pedido :(",
    background: "bg-red-500",
  }

  const pedidosQuery = createQuery({
    queryFn: async () => await( await fetch("http://127.0.0.1:8000/api/pedidos")).json(),
    queryKey: ["pedidos"],
    initialData: data,
    //enabled: false,
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

  const editStatusMutation = createMutation(editStatus, {
    onMutate: async ({ pedido, status}) => {
      await queryClient.cancelQueries(["pedidos"])
      const prevPeds: PedidoQuery | undefined = queryClient.getQueryData(['pedidos'])
      
      if (prevPeds) {
        queryClient.setQueryData(['pedidos'], {
          data: [...prevPeds.data.map(ele => {
            if(+ele.id === +pedido.id) {
              byStatus[ele.status_pedido] = byStatus[ele.status_pedido].filter( statusEle => +statusEle.id !== +ele.id)
              byStatus[status] = [...byStatus[status], {...ele, status_pedido: status}]
              return {...ele, status_pedido: status}
            }
            return ele
          })]
        })
      }
      return {...prevPeds}
      
    },
    onSuccess: () => {
      toastStore.trigger(editStatusToast)
      socket.emit("cozinhaStatus")
    },
    onError: (context: any) => {
      toastStore.trigger(failEditStatusToast)
      if (context?.prevPeds) {
        queryClient.setQueryData(['pedidos'], context.prevPeds)
      }
    },
  })

  socket.on("cozinhaPedido", () => {
    queryClient.cancelQueries(["pedidos"])
    $pedidosQuery.refetch()
  })

  socket.on("cozinhaCancelado", () => {
    queryClient.cancelQueries(["pedidos"])
    $pedidosQuery.refetch()
  })
</script>
<div class="flex flex-col px-4 pt-4 divide-y-2 divide-primary-500">
  <div>
    <div class="text-red-500 text-5xl">Recebidos</div>
    <div class="grid xl:grid-cols-3 lg:grid-cols-2 px-8 py-8 gap-8">
      {#each byStatus.recebido as pedido}
      <CozinhaPedidoCard pedido={pedido} atualizarPedido={ () => {
        $editStatusMutation.mutate({pedido, status: "em_andamento"})
      }}/>
      {/each}
    </div>
  </div>
  <div>
    <div class="text-yellow-500 text-5xl">Em Andamento</div>
    <div class="grid xl:grid-cols-3 lg:grid-cols-2 px-8 py-8 gap-8">
      {#each byStatus.em_andamento as pedido}
      <CozinhaPedidoCard pedido={pedido} atualizarPedido={ () => $editStatusMutation.mutate({pedido, status: "finalizado"}) }/>
      {/each}
    </div>
  </div>
  <div>
   <div class="text-green-500 text-5xl">Finalizados</div>
   <div class="grid xl:grid-cols-3 lg:grid-cols-2 px-8 py-8 gap-8">
     {#each byStatus.finalizado as pedido}
     <CozinhaPedidoCard pedido={pedido} atualizarPedido={ () => {} } />
     {/each}
   </div>
  </div>
</div>
