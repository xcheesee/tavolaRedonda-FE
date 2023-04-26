<script lang="ts">
  import type { Categoria, Produto } from "../utils/types";
  import ProdutoRow from "./produtoRow.svelte";
  export let produtos: Produto;
  export let categorias: Categoria[];
</script>
<div class="table-container">
  <table class="table table-hover">
    <thead >
      <tr class="variant-ghost-primary">
        <th>Id</th>
        <th>Nome</th>
        <th>Descricao</th>
        <th>Valor</th>
        <th>Categoria</th>
        <th>Acao</th>
      </tr>
    </thead>
    <tbody class="bg-primary-700">
      {#each produtos.produto as produto}
        <tr>
          <ProdutoRow produto={produto} />
        </tr>
      {/each}
    </tbody>
  </table>
</div>
