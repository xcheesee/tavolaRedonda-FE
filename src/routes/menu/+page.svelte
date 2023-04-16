<script lang="ts" >
	import MenuItemCard from "../../components/menuItemCard.svelte";

	export let data;
	console.log(data);
</script>
<div class="flex justify-center">
	<div class="flex flex-col gap-4 pt-8 lg:w-[1024px]">
	{#each data.produto as produto}
		<MenuItemCard produto={produto}/>
	{/each}
	</div>
</div>
