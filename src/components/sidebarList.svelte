<script lang="ts">
	import { goto } from "$app/navigation";

    export let redirect: string;
    export let name: string;
</script>

<div class="h-full flex">
    <button on:click={() => goto(redirect)} class="w-full">
        <li class="hover:bg-primary-500 text-xl my-4">
            <div>{name}</div>
        </li>
    </button>
</div>