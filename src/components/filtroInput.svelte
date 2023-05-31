<script lang="ts">
    export let label: string;
    export let value: any;
</script>

<label class="label">
  <span>{label}</span>
  <input class="input" type="text" bind:value={value}/>
</label>