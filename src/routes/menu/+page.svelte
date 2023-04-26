<script lang="ts" >
	import MenuItemCard from "../../components/menuItemCard.svelte";
  	import Icon from "@iconify/svelte";

	export let data;
</script>
<div class="flex justify-center">
	<div class="flex flex-col gap-4 pt-8 lg:w-[1024px]">
	{#each data.produto as produto}
		<MenuItemCard produto={produto}/>
	{/each}
	</div>
</div>
<div class="fixed bottom-0 right-0 m-8">
	<a href="/menu/checkout">
	<button class="w-16 h-16 bg-surface-400 rounded-full flex items-center justify-center">
		<Icon icon="ic:outline-shopping-cart" height="32" width="32" color="white"></Icon>
	</button>
	</a>
</div>
