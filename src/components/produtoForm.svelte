<script lang="ts">
    import { modalStore } from "@skeletonlabs/skeleton"
</script>
<div class="bg-surface-900 px-8 py-4 rounded flex flex-col gap-4">
    <div class="text-3xl pb-2 text-center text-primary-400">Adicionar Novo Produto</div>
    <label >
        <span>Nome</span>
        <input type="text" class="input" placeholder="Big Mac"/>
    </label>
    <label >
        <span>Valor</span>
        <input type="text" class="input" placeholder="Big Mac"/>
    </label>
    <button 
        type="button" 
        class="btn rounded bg-secondary-800"
        on:click={() => modalStore.close()}
    >Add</button>
</div>