<script lang="ts">
	import Icon from "@iconify/svelte";
	import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
	import { createQuery } from "@tanstack/svelte-query";
	import PedidoTable from "../../../components/pedidoTable.svelte";
  import { Line, Doughnut, Bar, PolarArea } from 'svelte-chartjs'
  import 'chart.js/auto'; 
	import FiltroInput from "../../../components/filtroInput.svelte";
	import type { PageServerData } from "./$types";

  export let data: PageServerData; 

  let pagamentoGraphs = {
    labels: Object.keys(data?.totalPagamentos),
    datasets: [
      {
        label: "Formas De Pagamento",
        data: Object.values(data?.totalPagamentos) as number[],
        backgroundColor: [
          "rgba(255, 134,159,0.4)",
          "rgba(98,  182, 239,0.4)",
          "rgba(255, 218, 128,0.4)",
          "rgba(113, 205, 205,0.4)",
          "rgba(170, 128, 252,0.4)",
          "rgba(255, 177, 101,0.4)"
        ],
        borderWidth: 1,
        borderColor: [
          "rgba(255, 134, 159, 1)",
          "rgba(98,  182, 239, 1)",
          "rgba(255, 218, 128, 1)",
          "rgba(113, 205, 205, 1)",
          "rgba(170, 128, 252, 1)",
          "rgba(255, 177, 101, 1)"
        ]
      }
    ]
  }; 

  let statusGraphs = {
    labels: Object.keys(data?.totalStatus),
    datasets: [
      {
        label: "Status",
        data: Object.values(data?.totalStatus) as number[],
        backgroundColor: [
          "rgba(255, 134,159,0.4)",
          "rgba(98,  182, 239,0.4)",
          "rgba(255, 218, 128,0.4)",
          "rgba(113, 205, 205,0.4)",
          "rgba(170, 128, 252,0.4)",
          "rgba(255, 177, 101,0.4)"
        ],
        borderWidth: 1,
        borderColor: [
          "rgba(255, 134, 159, 1)",
          "rgba(98,  182, 239, 1)",
          "rgba(255, 218, 128, 1)",
          "rgba(113, 205, 205, 1)",
          "rgba(170, 128, 252, 1)",
          "rgba(255, 177, 101, 1)"
        ]
      }
    ]
  }; 

  let categoriaGraphs = {
    labels: Object.keys(data?.totalCategorias),
    datasets: [
      {
        label: "Status",
        data: Object.values(data?.totalCategorias)as number[],
        backgroundColor: [
          "rgba(255, 134,159,0.4)",
          "rgba(98,  182, 239,0.4)",
          "rgba(255, 218, 128,0.4)",
          "rgba(113, 205, 205,0.4)",
          "rgba(170, 128, 252,0.4)",
          "rgba(255, 177, 101,0.4)"
        ],
        borderWidth: 1,
        borderColor: [
          "rgba(255, 134, 159, 1)",
          "rgba(98,  182, 239, 1)",
          "rgba(255, 218, 128, 1)",
          "rgba(113, 205, 205, 1)",
          "rgba(170, 128, 252, 1)",
          "rgba(255, 177, 101, 1)"
        ]
      }
    ]
  }; 

  let filters = {
      clientes: "",
      valor_maior_que: "",
      valor_menor_que: "",
      status_pedido: ""
  }
  let routeFilter = ""

  function setRouteFilter(filters: any) {
    routeFilter = Object.entries(filters).reduce( (prev, curr) => {
      return `${prev}filter[${curr[0]}]=${curr[1]}&`
    }, "?")
  }

  $: pedidosQuery = createQuery({
      queryKey: ["pedidos", routeFilter],
      queryFn: async () => await ( (await fetch(`http://127.0.0.1:8000/api/pedidos${routeFilter}`)).json() )
  })
</script>

<div class="flex flex-col gap-4 px-8">
  <Accordion class="card">
    <AccordionItem open>
      <svelte:fragment slot="summary">Filtros</svelte:fragment>
      <div slot="content" class="grid grid-cols-2 gap-4">
        <FiltroInput label="Cliente" value={filters.clientes} />
        <label class="label">
          <span>Status</span>
          <select class="select" bind:value={filters.status_pedido}>
            <option value="finalizado">Finalizado</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </label>
        <div class="flex flex-col gap-4 ">
            <div class="font-bold text-xl">Valor Total</div>
            <div class="flex flex-col gap-4">
                <div class="input-group input-group-divider grid-cols-[auto_1fr_auto_1fr]">
                    <div class="input-group-shim">
                        <Icon icon="tabler:chevron-right" width={36}/> 
                    </div>
                    <input type="text" placeholder="Maior que ..." bind:value={filters.valor_maior_que}/>
                    <div class="input-group-shim">
                        <Icon icon="tabler:chevron-left" width={36}/> 
                    </div>
                    <input type="text" placeholder="Menor que ..." bind:value={filters.valor_menor_que}/>
                </div>

            </div>
        </div>
        <div class="flex justify-end col-start-2 row-start-3 gap-4">
          <button 
            type="button" 
            class="btn variant-ghost-warning rounded-xl"
            on:click={() => {
                filters = {
                    clientes: "",
                    valor_maior_que: "",
                    valor_menor_que: "",
                    status_pedido: ""
                }
                setRouteFilter("")
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
    <AccordionItem open>
      <svelte:fragment slot="summary">Graficos</svelte:fragment>
      <svelte:fragment slot="content">
        <div class="grid lg:grid-cols-3 grid-cols-1">
          <div>
            <Bar data={pagamentoGraphs} height={300} options={{maintainAspectRatio: false}}/>
          </div>
          <div>
            <Doughnut data={statusGraphs} height={300} options={{maintainAspectRatio: false}}/>
          </div>
          <div>
            <PolarArea data={categoriaGraphs} height={300} options={{maintainAspectRatio: false}}/>
          </div>
        </div>
      </svelte:fragment>
    </AccordionItem>
  </Accordion>
  <Accordion class="card ">
    <AccordionItem open>
      <svelte:fragment slot="summary">Pedidos</svelte:fragment>
      <svelte:fragment slot="content">
        {#if $pedidosQuery.isLoading}
        <div>Carregando...</div>
        {:else}
        <PedidoTable pedidos={$pedidosQuery.data}/>
        {/if}
        <div class="flex justify-end">
          <button 
            type="button" 
            class="btn variant-ghost-primary rounded-xl"
            on:click={() => {
            //produtoStore.set({id: "", nome: "", valor: "", categoria: "", categoria_id: "", descricao: ""})
            //modalStore.trigger(prodForm);
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
