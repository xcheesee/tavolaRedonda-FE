<script lang="ts">
  import type { CarrinhoItem } from "../utils/types";
  import { multiplyNum } from "../utils/funcs";
	import { carrinhoStore } from "../utils/stores";
  export let item: CarrinhoItem
  let qtd = item.qtd;

</script>
<div class="card p-4 grid grid-cols-[max-content_1fr_max-content_max-content] gap-4">
  <div>ItemImage</div>
  <div class="px-8">
    <div class="text-3xl">{item.nome}</div>
    <div>{item.descricao}</div>
  </div>
  <form 
    class="grid grid-cols-[max-content_max-content_1fr] gap-4 items-center"
    on:submit={e => {
      e.preventDefault();
      $carrinhoStore = {...$carrinhoStore, [item.id]: {id: item.id, nome: item.nome, valor: item.valor, descricao: item.descricao, categoria: item.categoria, qtd: qtd}}
    }}	  
  >
    <div> R$ {qtd === 0 ? item.valor : multiplyNum(item.valor, qtd)} </div>
    <input type="number" name="qtd" class="input w-24" maxlength="3" bind:value={qtd}/>
    <button class="btn variant-filled-primary" type="submit">Alterar </button>
  </form >
</div>

