<script lang="ts">
  import { modalStore, type ModalSettings } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";
  import { createMutation, useQueryClient } from "@tanstack/svelte-query";
  import type { Pedido, Produto, ProdutoItem, prodModal } from "../utils/types";
  import { delProduto, editProduto } from "../utils/funcs";
  import { produtoStore } from "../utils/stores";
  export let pedido: Pedido
  

  const queryClient = useQueryClient()

  //const del: ModalSettings = {
  //  type: 'confirm',
  //  title: `Deletar ${produto.nome}`,
  //  body: `Deseja remover ${produto.nome} dos registros?`,
  //  response: async (r: boolean) => { if(r) $delProdMutation.mutate({id: produto.id}) }
  //}

  //const edit: ModalSettings = {
  //  type: 'component',
  //  component: 'prodFormModal',
  //  response: async (r: prodModal) => {
  //    if(r.send) $editProdMutation.mutate({...r, id: produto.id})
  //  }
  //}

  const delProdMutation = createMutation(delProduto, {
    onMutate: async ({id}: {id: string}) => {
      await queryClient.cancelQueries(['produtos'])
      const prevProds: Produto | undefined = queryClient.getQueryData(['produtos'])

      if (prevProds) {
        queryClient.setQueryData(['produtos'], {
          ...prevProds,
          data: prevProds.data.filter(ele => ele.id !== id)
        })
      }
      return [prevProds]
    },
    onSettled: () => queryClient.invalidateQueries(['produtos'])
  })

  const editProdMutation = createMutation(editProduto, {
    onMutate: async (produto: ProdutoItem) => {
      await queryClient.cancelQueries(['produtos'])
      const prevProds: Produto | undefined = queryClient.getQueryData(['produtos'])

      if (prevProds) {
        queryClient.setQueryData(['produtos'], {
          ...prevProds,
          data: prevProds.data.map(ele => {
            if(ele.id !== produto.id) return ele
            return {...produto}
          })
        })
      }
      return [prevProds]
    },
    onSettled: () => queryClient.invalidateQueries(['produtos'])
  })

</script>

<td>{pedido.id}</td>
<td>{pedido?.cliente}</td>
<td>R$ {pedido.total}</td>
<td>{pedido.forma_pagamento}</td>
<td class="capitalize">{pedido.status_pedido}</td>
<!--<td>
  <button 
    type="button"
    on:click={() => {
    }}
  >
    <Icon icon="mdi:pencil-circle" width="32" height="32"/>
  </button>
  <button 
    type="button"
    on:click={() => {}}
  >
    <Icon icon="mdi:trash-circle" width="32" height="32"/>
  </button>
</td>-->
