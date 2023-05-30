<script lang="ts">
	import SidebarList from "../../components/sidebarList.svelte";
    import { goto } from "$app/navigation";

    import { AppShell } from "@skeletonlabs/skeleton";
</script>
    <AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4">
        <svelte:fragment slot="sidebarLeft">
	<!-- Insert the list: -->
	        <nav class="list">
		        <ul>
                    <SidebarList name="Usuarios"/>
                    <div class="h-full flex">
                        <button on:click={() => goto("/admin/vendas")} class="w-full">
                            <SidebarList name="Vendas" />
                        </button>
                    </div>
                    <div class="h-full flex">
                        <button on:click={() => goto("/admin/produtos")} class="w-full">
                            <SidebarList name="Produtos" />
                        </button>
                    </div>
		        </ul>
	        </nav>
	        <!-- --- -->
        </svelte:fragment>
    <div class="bg-surface-900 h-full">
        <slot/>
    </div>
    </AppShell>