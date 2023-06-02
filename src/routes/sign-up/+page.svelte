<script lang="ts">
	import Icon from "@iconify/svelte";
	import { criarConta } from "../../utils/funcs";
	import { goto } from "$app/navigation";
	import { toastStore, type ToastSettings } from "@skeletonlabs/skeleton";

	let showPw = false;
	let pw: string;

	const signupToast: ToastSettings = {
		message: "Conta Criada com sucesso!",
		background: "variant-ghost-success"
	}

	const signupErrorToast: ToastSettings = {
		message: "Houve um erro na criacao da conta :(",
		background: "variant-ghost-error"
	}

	async function criarContaRequest(e: HTMLFormElement) {
		try{
			await criarConta(e)
			toastStore.trigger(signupToast)
			goto("/login")
		} catch(e) {
			toastStore.trigger(signupErrorToast);
		}
	}
</script>

<div class="flex items-center justify-center h-full">
	<div class="lg:w-1/3 bg-surface-800 rounded-xl border border-surface-500">
		<form 
			class="grid gap-4 mx-4 my-8"
			on:submit={async (e) => {
			  e.preventDefault();
				criarContaRequest(e.currentTarget)
			}}>
			<div class="text-center font-bold text-3xl pb-4">CRIE SUA CONTA IMEDIATAMENTE</div>
			<label class="label">
				<span>Username</span>
				<input class="input" type="text" name="name"/>
			</label>
			<label class="label">
				<span>E-Mail</span>
				<input class="input" type="email" name="email"/>
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
			<label class="label">
				<span>Confirm Password</span>
				<input class="input" type="password" name="password_confirmation"/>
			</label>
			<div class="flex justify-end gap-4">
				<button class="btn variant-filled" type="submit">Criar Conta</button>
			</div>
		</form>
	</div>
</div>
