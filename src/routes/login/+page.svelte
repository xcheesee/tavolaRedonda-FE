<script lang="ts">
	import Icon from "@iconify/svelte";
	//import { login } from "../../utils/funcs";
	import type { ToastSettings } from "@skeletonlabs/skeleton";
	import { goto } from "$app/navigation";
	import { userStore } from "../../utils/stores"; 
	import { onMount } from "svelte";

	let showPw = false;
	let pw: string;
	export let data;
	
	onMount(() => {
		if(data.token !== "") {
			$userStore = {...$userStore, token: data.token ?? ""}
			goto('/menu')
		}
	})

	const loginToast: ToastSettings = {
		message: "Login efetuado com sucesso!",
		background: "variant-ghost-success"
	}

	const errorToast: ToastSettings = {
		message: "Ocorreu um erro",
		background: "variant-ghost-error"
	}

	//async function LoginRequest(e: HTMLFormElement) {
	//	try{
	//		const userData = await login(e)
	//		$userStore = {...userData}
	//		toastStore.trigger(loginToast)
	//		goto('/menu')
	//	} catch(e) {
	//		toastStore.trigger(errorToast)
	//	}
	//}
</script>
<div class="flex items-center justify-center h-full">
	<div class="lg:w-1/3 bg-surface-800 rounded-xl border border-surface-500">
		<form 
			class="grid gap-4 mx-4 my-8"
			method="POST"
			>
			<div class="text-center font-bold text-3xl pb-4">FACA SEU LOGIN IMEDIATAMENTE</div>
			<label class="label"	>
				<span>E-Mail</span>
				<input class="input" type="text" name="email"/>
			</label>
			{#if showPw}
			<label class="label">
				<span>Password</span>
				<div class="input-group input-group-divider grid-cols-[1fr_auto]">
					<input type="text" bind:value={pw} name="password"/>
					<button class="" on:click={() => showPw = !showPw}><Icon icon="fluent:eye-off-20-filled" width={36}/></button>
				</div>
			</label>
			{:else}
			<label class="label">
				<span>Password</span>
			  	<div class="input-group input-group-divider grid-cols-[1fr_auto]">
			  		<input type="password" bind:value={pw} name="password"/>
			  		<button class="" on:click={() => showPw = !showPw}><Icon icon="fluent:eye-20-filled" width={36}/></button>
			  	</div>
			</label>
			{/if}
			<div class="flex justify-end gap-4">
				<button class="btn" on:click={() => goto("/sign-up")} type="button">Criar Conta</button>
				<button class="btn variant-filled" type="submit">Login</button>
			</div>
		</form>
	</div>
</div>
