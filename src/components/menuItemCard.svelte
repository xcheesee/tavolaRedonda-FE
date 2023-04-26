<script lang="ts">
  import type { ProdutoItem , CarrinhoItem } from "../utils/types";
  import { multiplyNum } from "../utils/funcs";
  import { carrinhoStore } from "../utils/stores";
  export let produto: ProdutoItem | CarrinhoItem;
  let qtd = 0;
</script>

<div class="card p-4 grid grid-cols-[max-content_1fr_max-content_max-content] gap-4">
  <div>ItemImage</div>
  <div class="px-8">
    <div class="text-3xl">{produto.nome}</div>
    <div>{produto.descricao}</div>
  </div>
  <form 
    class="grid grid-cols-[max-content_max-content_1fr] gap-4 items-center"
    on:submit={e => {
      e.preventDefault();
      const currQtd = $carrinhoStore[produto.id]?.qtd ?? 0
      const newQtd = currQtd + qtd;
      $carrinhoStore = {...$carrinhoStore, [produto.id]: {id: produto.id, nome: produto.nome, valor: produto.valor, descricao: produto.descricao, categoria: produto.categoria, qtd: newQtd}}
      qtd = 0;
    }}	  
  >
    <div> R$ {qtd === 0 ? produto.valor : multiplyNum(produto.valor, qtd)} </div>
    <input type="number" name="qtd" class="input w-24" maxlength="3" bind:value={qtd}/>
    <button class="btn variant-filled-primary" type="submit">Adicionar </button>
  </form >
</div>
