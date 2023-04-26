<script lang="ts">
  import type { PageData } from './$types';
  import { Accordion, AccordionItem, modalStore, type ModalSettings } from '@skeletonlabs/skeleton';
  import ProdutoTable from '../../components/produtoTable.svelte';
  import { Paginator } from '@skeletonlabs/skeleton';
  import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';
  import { addProduto } from '../../utils/funcs';
  import type { Produto, ProdutoItem, prodModal } from '../../utils/types';
  import { produtoStore } from '../../utils/stores';
	import ProdutoForm from '../../components/produtoForm.svelte';

  const queryClient = useQueryClient()

  export let data: PageData

  const produtoQuery = createQuery({
    queryKey: ['produtos'],
    queryFn: async () => await ( await fetch('http://127.0.0.1:8000/api/produtos') ).json(),
    initialData: data,
  })
  
  const addProdMutation = createMutation(addProduto, {
    onMutate: async ({nome, valor, descricao, categoria_id}: ProdutoItem) => {
      await queryClient.cancelQueries(['produtos'])
      const prevProds: Produto | undefined = queryClient.getQueryData(['produtos'])

      if (prevProds) {
        queryClient.setQueryData(['produtos'], {
          mensagem: prevProds.mensagem,
          produto: [
            ...prevProds.produto,
            {
              id: "definindo...",
              nome: nome,
              valor: valor,
              descricao: descricao,
              categoria_id: categoria_id,
            }
          ]
        })
      }
      return [prevProds]
    },
    onSettled: () => {
      queryClient.invalidateQueries(['produtos'])
    }
  })

  const prodForm: ModalSettings = {
    type: 'component',
    component: 'prodFormModal',
    response: async (r: prodModal) => {
      if(r.send) $addProdMutation.mutate({...r})
    },
  };

  let page = {
    offset: 0,
    limit: 5,
    size: 5,
    amounts: [1,2,5,10],
  }
</script>

<div class="flex flex-col gap-4 px-8">
  <Accordion class="card">
    <AccordionItem>
      <svelte:fragment slot="summary">Filtros</svelte:fragment>
      <svelte:fragment slot="content">
        <label class="label">
          <span>value</span>
          <input class="input" type="text" placeholder="input"/>
        </label>
      </svelte:fragment>
    </AccordionItem>
  </Accordion>
  <Accordion class="card">
    <AccordionItem >
      <svelte:fragment slot="summary">Graficos</svelte:fragment>
      <svelte:fragment slot="content">
      </svelte:fragment>
    </AccordionItem>
  </Accordion>
  <Accordion class="card ">
    <AccordionItem open>
      <svelte:fragment slot="summary">Produtos</svelte:fragment>
      <svelte:fragment slot="content">
        {#if $produtoQuery.isLoading}
        <div>Carregando...</div>
        {:else }
        <ProdutoTable produtos={$produtoQuery.data} />
        {/if}
        <Paginator bind:settings={page} />
        <div class="flex justify-end">
          <button 
            type="button" 
            class="btn variant-ghost-primary rounded-xl"
            on:click={() => {
            produtoStore.set({id: "", nome: "", valor: "", categoria_id: "", descricao: ""})
            modalStore.trigger(prodForm);
            }}
            on:keypress={() => {}}
          >
            Add
          </button>
        </div>
      </svelte:fragment>
    </AccordionItem>
  </Accordion>
</div>
