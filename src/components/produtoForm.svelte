<script lang="ts">
  import { modalStore } from "@skeletonlabs/skeleton"
  import { produtoStore, categoriasStore } from "../utils/stores";
  export let type = 'add';

  function onFormSubmit() {
    if($modalStore[0].response) $modalStore[0].response( {...formData,categoria_id: selectedCat,  send: true} )
    modalStore.close()
  }

  function onFormCancel() {
    modalStore.close()
  }

  const formData = {
    ...$produtoStore,
  }

  let selectedCat = $produtoStore.categoria_id ?? 0;
  //$: current = $categoriasStore.find(entry => +entry.id === selectedCat)

</script>
<div class="bg-surface-900 px-8 py-4 rounded flex flex-col gap-4">
  {#if type === 'add'}
    <div class="text-3xl pb-2 text-center text-primary-400">
      Adicionar Novo Produto
    </div>
    {:else if type === 'edit'}
    <div class="text-3xl pb-2 text-center text-primary-400">
      Editar Produto #{formData.id}
    </div>
  {/if} 
  <label>
    <span>Nome</span>
    <input type="text" class="input" placeholder="Big Mac" bind:value={formData.nome}/>
  </label>
  <label>
    <span>Descricao</span>
    <textarea class="textarea" placeholder="Dois Hamburgeres, alface, queijo, molho especial, cebola e picles no pao com gergelim" bind:value={formData.descricao}/>
  </label>
  <label>
    <span>Valor</span>
    <input type="text" class="input" placeholder="Big Mac" bind:value={formData.valor}/>
  </label>
  <label>
    <span>Categoria</span>
    <select  class="select" bind:value={selectedCat} >
      {#each $categoriasStore as value}
      <option value={value.id}>{value.nome}</option>
      {/each}
    </select>
  </label>
  <div class="flex gap-4">
    <button 
      type="button" 
      class="btn rounded bg-secondary-800 capitalize"
      on:click={onFormSubmit}
    >{type}</button>
    <button 
      type="button"
      class="btn"
      on:click={onFormCancel}
    >Cancel</button>
  </div>
</div>
