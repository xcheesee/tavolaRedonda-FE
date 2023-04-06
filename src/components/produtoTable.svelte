<script lang="ts">
    import type { Produto } from "../utils/types";
    import type { ModalSettings } from "@skeletonlabs/skeleton"
    import Icon from "@iconify/svelte"
	import ProdutoRow from "./produtoRow.svelte";
    export let produtos: Produto[];
    const confirm: ModalSettings = {
	type: 'confirm',
	// Data
	title: 'Please Confirm',
	body: 'Are you sure you wish to proceed?',
	// TRUE if confirm pressed, FALSE if cancel pressed
	response: (r: boolean) => console.log('response:', r),
};
</script>
<div class="table-container">
	<table class="table table-hover">
		<thead >
			<tr class="variant-ghost-primary">
				<th>Id</th>
				<th>Nome</th>
                <th>Valor</th>
                <th>Acao</th>
			</tr>
		</thead>
		<tbody class="bg-primary-700">
			{#each produtos.produto as produto}
				<tr>
					<ProdutoRow produto={produto} />
				</tr>
			{/each}
		</tbody>
	</table>
</div>
