<script lang="ts">
	import SidebarList from "../../components/sidebarList.svelte";
</script>

<div class="grid grid-cols-[300px_1fr] h-full">
	<nav class="list">
		<ul>
        	<SidebarList name="Perfil" redirect="/"/>
        	<SidebarList name="Menu" redirect="/menu"/>
        	<SidebarList name="Meus Pedidos" redirect="/pedidos"/>
		</ul>
	</nav>
	<slot/>
</div>
