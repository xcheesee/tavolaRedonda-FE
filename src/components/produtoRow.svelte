<script lang="ts">
  import { modalStore, type ModalSettings } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";
  import { createMutation, useQueryClient } from "@tanstack/svelte-query";
  import type { Produto, ProdutoItem } from "../utils/types";
  import { delProduto, editProduto } from "../utils/funcs";
  import { produtoStore } from "../utils/stores";
  export let produto: {id: string, nome: string, valor: string}

  const queryClient = useQueryClient()

  const del: ModalSettings = {
    type: 'confirm',
    title: `Deletar ${produto.nome}`,
    body: `Deseja remover ${produto.nome} dos registros?`,
    response: async (r: boolean) => { if(r) $delProdMutation.mutate({id: produto.id}) }
  }

  const edit: ModalSettings = {
    type: 'component',
    component: 'formModal',
    response: async (r: {nome: string, valor: string, send: boolean}) => {
      if(r.send) $editProdMutation.mutate({id: produto.id, nome: r.nome, valor: r.valor})
    }
  }

  const delProdMutation = createMutation(delProduto, {
    onMutate: async ({id}: {id: string}) => {
      await queryClient.cancelQueries(['produtos'])
      const prevProds: Produto | undefined = queryClient.getQueryData(['produtos'])

      if (prevProds) {
        queryClient.setQueryData(['produtos'], {
          mensagem: prevProds.mensagem,
          produto: prevProds.produto.filter(ele => ele.id !== id)
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
          mensagem: prevProds.mensagem,
          produto: prevProds.produto.map(ele => {
            if(ele.id !== produto.id) return ele
            return {id: produto.id, nome: produto.nome, valor: produto.valor}
          })
        })
      }
      return [prevProds]
    },
    onSettled: () => queryClient.invalidateQueries(['produtos'])
  })

</script>

<td>{produto.id}</td>
<td class="w-3/4">{produto.nome}</td>
<td>R$ {produto.valor}</td>
<td>
  <button 
    type="button"
    on:click={() => {
    produtoStore.set({id: produto.id, nome: produto.nome, valor: produto.valor}) 
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
