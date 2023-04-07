<script lang="ts">
  import { modalStore } from "@skeletonlabs/skeleton"
  export let produto = {id: '', nome: '', valor: ''};
  export let type = 'add';
  export let parent;

  function onFormSubmit() {
    console.log($modalStore[0])
    if($modalStore[0].response) $modalStore[0].response({...formData, send: true})
    modalStore.close()
  }

  function onFormCancel() {
    modalStore.close()
  }
  const formData = {
    nome: produto.nome,
    valor: produto.valor,
  }
</script>
<div class="bg-surface-900 px-8 py-4 rounded flex flex-col gap-4">
  {#if type === 'add'}
    <div class="text-3xl pb-2 text-center text-primary-400">
      Adicionar Novo Produto
    </div>
    {:else if type === 'edit'}
    <div class="text-3xl pb-2 text-center text-primary-400">
      Editar Produto #{produto.id}
    </div>
  {/if} 
  <label >
    <span>Nome</span>
    <input type="text" class="input" placeholder="Big Mac" bind:value={formData.nome}/>
  </label>
  <label >
    <span>Valor</span>
    <input type="text" class="input" placeholder="Big Mac" bind:value={formData.valor}/>
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
