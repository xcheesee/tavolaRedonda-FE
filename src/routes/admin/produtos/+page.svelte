<script lang="ts">
  import type { PageServerData } from './$types';
  import { Accordion, AccordionItem, modalStore, type ModalSettings } from '@skeletonlabs/skeleton';
  import ProdutoTable from '../../../components/produtoTable.svelte'
  import { Paginator } from '@skeletonlabs/skeleton';
  import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';
  import { addProduto } from '../../../utils/funcs';
  import type { Produto, ProdutoItem, prodModal } from '../../../utils/types';
  import { produtoStore, categoriasStore } from '../../../utils/stores';

  const queryClient = useQueryClient()

  export let data: PageServerData
  $categoriasStore = data.categorias

  let filters = {
    categorias: "",
    nome: ""
  }
  let routeFilter = ""

  function setRouteFilter(filters: any) {
    routeFilter = Object.entries(filters).reduce( (prev, curr) => {
      return `${prev}filter[${curr[0]}]=${curr[1]}&`
    }, "?")
  }

  let page = {
    offset: 0,
    limit: 10,
    size: 10,
    amounts: [1,2,5,10],
  }

  $: produtoQuery = createQuery({
    queryKey: ['produtos', routeFilter],
    queryFn: async () => await ( await fetch(`http://127.0.0.1:8000/api/produtos${routeFilter}`) ).json(),
    //initialData: data.produtos,
    onSuccess: (res) => {
      page = {
        offset: 0,
        limit: res.meta.last_page * res.meta.per_page,
        size: res.meta.per_page,
        amounts: [10]
      }
    }
  })
  
  const addProdMutation = createMutation(addProduto, {
    onMutate: async ({nome, valor, descricao, categoria}: ProdutoItem) => {
      await queryClient.cancelQueries(['produtos'])
      const prevProds: Produto | undefined = queryClient.getQueryData(['produtos'])

      if (prevProds) {
        queryClient.setQueryData(['produtos'], {
          ...prevProds,
          data: [
            ...prevProds.data,
            {
              id: "definindo...",
              nome: nome,
              valor: valor,
              descricao: descricao,
              categoria: categoria
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

</script>

<div class="flex flex-col gap-4 px-8">
  <Accordion class="card">
    <AccordionItem>
      <svelte:fragment slot="summary">Filtros</svelte:fragment>
      <div slot="content" class="grid grid-cols-2 gap-4">
        <label class="label">
          <span>Nome</span>
          <input class="input" type="text" bind:value={filters.nome}/>
        </label>
        <label class="label">
          <span>Categoria</span>
          <select class="select" bind:value={filters.categorias}>
            {#each $categoriasStore as categoria}
            <option value={categoria.nome}>{categoria.nome}</option>
            {/each}
          </select>
        </label>
        <div class="flex justify-end col-start-2 gap-4">
          <button 
            type="button" 
            class="btn variant-ghost-warning rounded-xl"
            on:click={() => {
              routeFilter = ""
              filters = {
                categorias: "",
                nome: ""
              }
            }}
            on:keypress={() => {}}
          >
            Limpar
          </button>
          <button 
            type="button" 
            class="btn variant-ghost-primary rounded-xl"
            on:click={() => {
              setRouteFilter(filters)
            }}
            on:keypress={() => {}}
          >
            Filtrar
          </button>
        </div>
      </div>
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
        <Paginator bind:settings={page} />
        {/if}
        <div class="flex justify-end">
          <button 
            type="button" 
            class="btn variant-ghost-primary rounded-xl"
            on:click={() => {
            produtoStore.set({id: "", nome: "", valor: "", categoria: "", categoria_id: "", descricao: ""})
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
