<script lang="ts">
	import Icon from "@iconify/svelte";

	let showPw = false;
	let pw: string;
</script>
<div class="flex items-center justify-center h-full">
	<div class="lg:w-1/3 bg-surface-800 rounded-xl border border-surface-500">
		<div class="grid gap-4 mx-4 my-8">
			<div class="text-center font-bold text-3xl pb-4">FACA SEU LOGIN IMEDIATAMENTE</div>
			<label class="label"	>
				<span>Username</span>
				<input class="input" type="text"/>
			</label>
			{#if showPw}
			<label class="label">
			  <span>Password</span>
			  <div class="input-group input-group-divider grid-cols-[1fr_auto]">
			  	 <input type="text" bind:value={pw}/>
			  	<button class="" on:click={() => showPw = !showPw}><Icon icon="fluent:eye-off-20-filled" width={36}/></button>
			  </div>
			</label>
			{:else}
			<label class="label">
				<span>Password</span>
			  <div class="input-group input-group-divider grid-cols-[1fr_auto]">
			  	<input type="password" bind:value={pw}/>
			  	<button class="" on:click={() => showPw = !showPw}><Icon icon="fluent:eye-20-filled" width={36}/></button>
			  </div>
			</label>
			{/if}
			<div class="flex justify-end gap-4">
				<button class="btn">Criar Conta</button>
				<button class="btn variant-filled">Login</button>
			</div>
		</div>
	</div>
</div>
