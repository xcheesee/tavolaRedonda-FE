<script lang="ts">
  import { modalStore, type ModalSettings } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";
  import { createMutation, useQueryClient } from "@tanstack/svelte-query";
  import type { Produto, ProdutoItem, prodModal } from "../utils/types";
  import { delProduto, editProduto } from "../utils/funcs";
  import { produtoStore, userStore } from "../utils/stores";
  export let produto: ProdutoItem
  

  const queryClient = useQueryClient()

  const del: ModalSettings = {
    type: 'confirm',
    title: `Deletar ${produto.nome}`,
    body: `Deseja remover ${produto.nome} dos registros?`,
    response: async (r: boolean) => { if(r) $delProdMutation.mutate({id: produto.id, token: $userStore.token}) }
  }

  const edit: ModalSettings = {
    type: 'component',
    component: 'prodFormModal',
    response: async (r: prodModal) => {
      if(r.send) $editProdMutation.mutate({produto: {...r, id: produto.id},  token: $userStore.token})
    }
  }

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
    onMutate: async ({produto, token}: {produto: ProdutoItem, token: string}) => {
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

<td>{produto.id}</td>
<td>{produto.nome}</td>
<td>{produto.descricao}</td>
<td>R$ {produto.valor}</td>
<td>{produto.categoria}</td>
<td>
  <button 
    type="button"
    on:click={() => {
    produtoStore.set({...produto}) 
    modalStore.trigger(edit)
    }}
  >
    <Icon icon="mdi:pencil-circle" width="32" height="32"/>
  </button>
  <button 
    type="button"
    on:click={() => {modalStore.trigger(del)}}
  >
    <Icon icon="mdi:trash-circle" width="32" height="32"/>
  </button>
</td>
