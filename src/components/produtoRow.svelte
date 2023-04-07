<script lang="ts">
    import { modalStore, type ModalSettings, type ModalComponent } from "@skeletonlabs/skeleton";
    import Icon from "@iconify/svelte";
    import ProdutoForm from "./produtoForm.svelte";
	import { invalidate } from "$app/navigation";
    export let produto: {id: string, nome: string, valor: string}
    const del: ModalSettings = {
        type: 'confirm',
        title: `Deletar ${produto.nome}`,
        body: `Deseja remover ${produto.nome} dos registros?`,
        response: async (r: boolean) => {
            await fetch(`http://127.0.0.1:8000/api/produtos/${produto.id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
            })
            await invalidate('prods:get')
            modalStore.close()
        }
    }
    const editComponent: ModalComponent = {
        ref: ProdutoForm,
        props: {produto: produto, type: 'edit'},
        
    }
    const edit: ModalSettings = {
        type: 'component',
        component: editComponent,
        response: async (r: {nome: string, valor: string}) => {
            await fetch(`http://127.0.0.1:8000/api/produtos/${produto.id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome: r.nome,
                    valor: r.valor,
                })
            })
            await invalidate('prods:get')
        }
    }

</script>

<td>0</td>
    <td class="w-3/4">{produto.nome}</td>
    <td>R$ {produto.valor}</td>
    <td>
        <button 
            type="button"
            on:click={() => {modalStore.trigger(edit)}}
        >
            <Icon icon="mdi:pencil-circle" width="32" height="32"/>
        </button>
        <button 
            type="button"
            on:click={() => {modalStore.trigger(del)}}
        >
            <Icon icon="mdi:trash-circle" width="32" height="32"/>
        </button>
    </td>
