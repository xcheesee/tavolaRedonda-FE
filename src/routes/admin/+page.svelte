<script lang="ts">
    import { Accordion, AccordionItem, modalStore, type ModalSettings, type ModalComponent } from '@skeletonlabs/skeleton';
    import type { Produto } from '../../utils/types';
	import ProdutoTable from '../../components/produtoTable.svelte';
	import ProdutoForm from '../../components/produtoForm.svelte';
    import { Paginator } from '@skeletonlabs/skeleton';
    const produtos: Produto[] = [
        {
            id: "0",
            nome: "Hamburger",
            valor: "15.99",
        },
        {
            id: "0",
            nome: "Hamburger",
            valor: "15.99",
        },
        {
            id: "0",
            nome: "Hamburger",
            valor: "15.99",
        },
    ]
    const formModalComp: ModalComponent = {
        ref: ProdutoForm,
        props: { background: "variant-ghost-primary" }    
    }

    const alert: ModalSettings = {
        type: 'component',
        component: formModalComp
    };
    let addFormVisible: boolean = false;
    let page = {
        offset: 0,
        limit: 5,
        size: produtos.length,
        amounts: [1,2,5,10],
    }
</script>
<div class="flex flex-col gap-4 px-8">
    <Accordion class="card">
        <AccordionItem>
            <svelte:fragment slot="summary">Filtros</svelte:fragment>
            <svelte:fragment slot="content">
                <label class="label">
                    <span>Filtro1</span>
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
                <ProdutoTable produtos={produtos} />
                <Paginator bind:settings={page} />
                <div class="flex justify-end">
                    <button 
                        type="button" 
                        class="btn variant-ghost-primary rounded-xl"
                        on:click={() => {
                            modalStore.trigger(alert);
                        }}
                        on:keypress={() => addFormVisible = true}
                    >
                        Add
                    </button>
                </div>
            </svelte:fragment>
        </AccordionItem>
    </Accordion>
</div>
{#if addFormVisible}
    <div></div>
{/if}