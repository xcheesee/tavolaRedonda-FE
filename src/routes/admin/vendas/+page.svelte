<script lang="ts">
	import Icon from "@iconify/svelte";
	import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
	import { createQuery } from "@tanstack/svelte-query";
	import PedidoTable from "../../../components/pedidoTable.svelte";
  import { Line, Doughnut, Bar, PolarArea } from 'svelte-chartjs'
  import 'chart.js/auto'; 
	import FiltroInput from "../../../components/filtroInput.svelte";
	import { getGraphs, getPedidos } from "../../../utils/funcs";
  import { userStore } from "../../../utils/stores";

  //export let data: PageServerData; 
  let pagamentoGraphs: any;
  let statusGraphs: any;
  let categoriaGraphs: any;

  $: graphsQuery = createQuery({
    queryKey: ['graficos'],
    queryFn: () => getGraphs($userStore.token, filters),
    onSuccess: (res) => {
      pagamentoGraphs = {
        labels: Object.keys(res?.totalPagamentos),
        datasets: [
          {
            label: "Formas De Pagamento",
            data: Object.values(res?.totalPagamentos) as number[],
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

      statusGraphs = {
        labels: Object.keys(res?.totalStatus),
        datasets: [
          {
            label: "Status",
            data: Object.values(res?.totalStatus) as number[],
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

      categoriaGraphs = {
        labels: Object.keys(res?.totalCategorias),
        datasets: [
          {
            label: "Status",
            data: Object.values(res?.totalCategorias)as number[],
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
    }
  })

  let filters = {
      users: "",
      valor_maior_que: "",
      valor_menor_que: "",
      data_depois_de: "",
      data_antes_de: "",
      status_pedido: "",
      forma_pagamento: ""
  }
  let routeFilter = ""

  function setRouteFilter(filters: any) {
    routeFilter = Object.entries(filters).reduce( (prev, curr) => {
      return `${prev}filter[${curr[0]}]=${curr[1]}&`
    }, "?")
  }

  $: pedidosQuery = createQuery({
      queryKey: ["pedidos", routeFilter],
      queryFn: async () => await getPedidos($userStore.token, routeFilter)
  })
</script>

<div class="flex flex-col gap-4 px-8">
  <Accordion class="card">
    <AccordionItem open>
      <svelte:fragment slot="summary">Filtros</svelte:fragment>
      <div slot="content" class="grid grid-cols-2 gap-4">
        <FiltroInput label="Cliente" value={filters.users} />
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
        <div class="flex flex-col gap-4 ">
            <div class="font-bold text-xl">Datas</div>
            <div class="flex flex-col gap-4">
              <div class="input-group input-group-divider grid-cols-[auto_1fr_auto_1fr]">
                <div class="input-group-shim">
                  <Icon icon="tabler:chevron-right" width={36}/> 
                </div>
                <input type="date" placeholder="Depois de ..." bind:value={filters.data_depois_de}/>
                <div class="input-group-shim">
                  <Icon icon="tabler:chevron-left" width={36}/> 
                </div>
                <input type="date" placeholder="Antes de ..." bind:value={filters.data_antes_de}/>
              </div>
            </div>
        </div>
        <label class="label col-span-2">
          <span>Forma de Pagamento</span>
          <select class="select" bind:value={filters.forma_pagamento}>
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartao de Credito</option>
            <option value="debito">Cartao de Debito</option>
          </select>
        </label>
        <div class="flex justify-end col-start-2 gap-4">
          <button 
            type="button" 
            class="btn variant-ghost-warning rounded-xl"
            on:click={() => {
                filters = {
                    users: "",
                    valor_maior_que: "",
                    valor_menor_que: "",
                    data_depois_de: "",
                    data_antes_de: "",
                    status_pedido: "",
                    forma_pagamento: "",
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
          {#if $graphsQuery.isLoading}
          <div>Carregando...</div>
          {:else}
          <div>
            <Bar data={pagamentoGraphs} height={300} options={{maintainAspectRatio: false}}/>
          </div>
          <div>
            <Doughnut data={statusGraphs} height={300} options={{maintainAspectRatio: false}}/>
          </div>
          <div>
            <PolarArea data={categoriaGraphs} height={300} options={{maintainAspectRatio: false}}/>
          </div>
          {/if}
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
        </div>
      </svelte:fragment>
    </AccordionItem>
  </Accordion>
</div>
