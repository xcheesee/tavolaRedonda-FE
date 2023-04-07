<script lang="ts">
  import { modalStore, type ModalSettings, type ModalComponent } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";
  import ProdutoForm from "./produtoForm.svelte";
  import { invalidate } from "$app/navigation";
	import { createMutation, useQueryClient } from "@tanstack/svelte-query";
	import type { Produto } from "../utils/types";
	import { delProduto } from "../utils/funcs";
  export let produto: {id: string, nome: string, valor: string}

  const queryClient = useQueryClient()

  const del: ModalSettings = {
    type: 'confirm',
    title: `Deletar ${produto.nome}`,
    body: `Deseja remover ${produto.nome} dos registros?`,
    response: async (r: boolean) => {
      $delProdMutation.mutate({id: produto.id})
    }
  }

  const editComponent: ModalComponent = {
    ref: ProdutoForm,
    props: {produto: produto, type: 'edit'},

  }

  const edit: ModalSettings = {
    type: 'component',
    component: editComponent,
    response: async (r: {nome: string, valor: string}) => {
      await fetch(`http://127.0.0.1:8000/api/produtos/${produto.id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: r.nome,
          valor: r.valor,
        })
      })
      await invalidate('prods:get')
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
    onSettled: () => {
      queryClient.invalidateQueries(['produtos'])
    }
  })

</script>

<td>{produto.id}</td>
<td class="w-3/4">{produto.nome}</td>
<td>R$ {produto.valor}</td>
<td>
  <button 
    type="button"
    on:click={() => {modalStore.trigger(edit)}}
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
