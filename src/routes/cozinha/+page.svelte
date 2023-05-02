<script lang="ts">
    import CozinhaPedidoCard from '../../components/cozinhaPedidoCard.svelte';
    export let data;
</script>
<div class="flex flex-col pl-4 pt-4">
    <div class="grid xl:grid-cols-3 lg:grid-cols-2 px-8 py-8 gap-8">
      {#each data.pedidos as pedido}
        <CozinhaPedidoCard pedido={pedido} />
      {/each}
    </div>
    <div class="grid xl:grid-cols-3 lg:grid-cols-2 px-8 py-8 gap-8">
      {#each data.pedidos as pedido}
        <CozinhaPedidoCard pedido={pedido} />
      {/each}
    </div>
    <div class="grid xl:grid-cols-3 lg:grid-cols-2 px-8 py-8 gap-8">
      {#each data.pedidos as pedido}
        <CozinhaPedidoCard pedido={pedido} />
      {/each}
    </div>
</div>