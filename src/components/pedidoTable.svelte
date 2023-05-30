<script lang="ts">
  import type { Pedido, Produto } from "../utils/types";
	import PedidoRow from "./pedidoRow.svelte";
  import ProdutoRow from "./produtoRow.svelte";
  export let pedidos: any;
  console.log(pedidos)
</script>
<div class="table-container">
  <table class="table table-hover">
    <thead >
      <tr class="variant-ghost-primary">
        <th>Id</th>
        <th>Cliente</th>
        <th>Valor</th>
        <th>Forma de Pagamento</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody class="bg-primary-700">
      {#each pedidos.data as pedido}
        <tr>
          <PedidoRow pedido={pedido} />
        </tr>
      {/each}
    </tbody>
  </table>
</div>
