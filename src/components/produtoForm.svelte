<script lang="ts">
    import { modalStore } from "@skeletonlabs/skeleton"
    export let produto = {id: '', nome: '', valor: ''}
    export let type = 'add';
    export let parent;
    function onFormSubmit(): void {
        if($modalStore[0].response) $modalStore[0].response(formData)
        console.log($modalStore[0].response)
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
    <button 
        type="button" 
        class="btn rounded bg-secondary-800"
        on:click={onFormSubmit}
    >Add</button>
</div>
