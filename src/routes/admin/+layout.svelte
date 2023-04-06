<script lang="ts">
	import SidebarList from "../../components/sidebarList.svelte";

    import { AppShell } from "@skeletonlabs/skeleton";
</script>
    <AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4">
        <svelte:fragment slot="sidebarLeft">
	<!-- Insert the list: -->
	        <nav class="list">
		        <ul>
                    <SidebarList name="Vendas"/>
                    <SidebarList name="Usuarios"/>
                    <SidebarList name="Produtos"/>
		        </ul>
	        </nav>
	        <!-- --- -->
        </svelte:fragment>
    <div class="bg-surface-900 h-full">
        <slot/>
    </div>
    </AppShell>