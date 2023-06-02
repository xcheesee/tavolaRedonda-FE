<script lang="ts">
	import { goto } from "$app/navigation";
	import { toastStore, type ToastSettings } from "@skeletonlabs/skeleton";
    import { userStore } from "../../utils/stores";

    let logoutToast: ToastSettings = {
        message: "Logout realizado com sucesso!",
        background: "variant-ghost-success"
    }

    async function logoutRequest() {
        const res = await fetch("http://127.0.0.1:8000/api/logout", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${$userStore.token}`
            }
        })
        if(res.ok || res.status === 401) {
            toastStore.trigger(logoutToast)
            $userStore = {mensagem: "", user_id: "", token: "", type: "", email: "", nome: ""}
            goto("/menu")
        }
    }

</script>
<div class="flex items-center justify-center h-full">
	<div class="lg:w-1/5 bg-surface-800 rounded-xl border border-surface-500 flex flex-col gap-4 items-center justify-center p-4">
        <div>Deseja realizar o logout?</div>
        <div>
            <button class="btn" on:click={() => goto("/menu")}>Nao</button>
            <button class="btn variant-filled-error" on:click={() => logoutRequest()}>Sim</button>
        </div>
    </div>
</div>