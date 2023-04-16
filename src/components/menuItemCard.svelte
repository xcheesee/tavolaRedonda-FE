<script lang="ts">
  import { onMount } from "svelte";
  import type { ProdutoItem } from "../utils/types";
  export let produto:ProdutoItem;
  let qtd = 0;
  onMount( () => {localStorage.carrinho = JSON.stringify({})})
</script>

<div class="card p-4 grid grid-cols-[max-content_1fr_max-content_max-content] gap-4">
  <div>ItemImage</div>
  <div class="px-8">
    <div class="text-3xl">{produto.nome}</div>
    <div>ItemDescricao</div>
  </div>
  <form 
    class="grid grid-cols-[max-content_max-content_1fr] gap-4 items-center"
    on:submit={e => {
      e.preventDefault();
      let carrinho = JSON.parse(localStorage.carrinho);
      const currQtd = carrinho[produto.id]?.qtd ?? 0
      const newQtd = currQtd + qtd;
      carrinho = {...carrinho, [produto.id]: {nome: produto.nome, valor: produto.valor, qtd: newQtd}}
      localStorage.carrinho = JSON.stringify(carrinho);
      qtd = 0;
    }}	  
  >
    <div> R$ {qtd === 0 ? produto.valor : +produto.valor * qtd} </div>
    <input type="number" name="qtd" class="input w-24" pattern="\d" maxlength="3"bind:value={qtd}/>
    <button class="btn variant-filled-primary" type="submit">Adicionar </button>
  </form >
</div>
