<script lang="ts">
    import { Accordion, AccordionItem, modalStore, type ModalSettings, type ModalComponent } from '@skeletonlabs/skeleton';
    import type { PageData } from './$types';
    import { invalidate, invalidateAll } from '$app/navigation';
    import ProdutoTable from '../../components/produtoTable.svelte';
    import ProdutoForm from '../../components/produtoForm.svelte';
    import { Paginator } from '@skeletonlabs/skeleton';
    import type { Produto } from '../../utils/types';
    export let data: PageData;
    const formModalComp: ModalComponent = {
        ref: ProdutoForm,
        props: { background: "variant-ghost-primary" }    
    }

    const prodForm: ModalSettings = {
        type: 'component',
        component: formModalComp,
        response: async (r: {nome: string, valor: string}) => {
            await fetch(`http://localhost:8000/api/produtos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome: r.nome,
                    valor: r.valor,
                })
            })
            invalidate('prods:get')
        },
    };
    let produtos: Produto = data 
    let page = {
        offset: 0,
        limit: 5,
        size: 5,
        amounts: [1,2,5,10],
    }
</script>
<div class="flex flex-col gap-4 px-8">
    <Accordion class="card">
        <AccordionItem>
            <svelte:fragment slot="summary">Filtros</svelte:fragment>
            <svelte:fragment slot="content">
                <label class="label">
                    <span></span>
                    <input class="input" type="text" placeholder="input"/>
                </label>
            </svelte:fragment>
        </AccordionItem>
    </Accordion>
    <Accordion class="card">
        <AccordionItem >
            <svelte:fragment slot="summary">Graficos</svelte:fragment>
            <svelte:fragment slot="content">
            </svelte:fragment>
        </AccordionItem>
    </Accordion>
    <Accordion class="card ">
        <AccordionItem open>
            <svelte:fragment slot="summary">Produtos</svelte:fragment>
            <svelte:fragment slot="content">
                <ProdutoTable produtos={data} />
                <Paginator bind:settings={page} />
                <div class="flex justify-end">
                    <button 
                        type="button" 
                        class="btn variant-ghost-primary rounded-xl"
                        on:click={() => {
                            modalStore.trigger(prodForm);
                        }}
                        on:keypress={() => {}}
                    >
                        Add
                    </button>
                </div>
            </svelte:fragment>
        </AccordionItem>
    </Accordion>
</div>
