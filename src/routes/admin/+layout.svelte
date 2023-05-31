<script lang="ts">
	import SidebarList from "../../components/sidebarList.svelte";
    import { AppShell } from "@skeletonlabs/skeleton";
</script>

<AppShell slotSidebarLeft="bg-surface-500/5 w-56 ">
    <svelte:fragment slot="sidebarLeft">
	     <nav class="list">
		      <ul>
                <SidebarList name="Usuarios" redirect="/"/>
                <SidebarList name="Vendas" redirect="/admin/vendas"/>
                <SidebarList name="Produtos" redirect="/admin/produtos"/>
		      </ul>
	     </nav>
    </svelte:fragment>
    <div class="bg-surface-900 h-full">
        <slot/>
    </div>
</AppShell>