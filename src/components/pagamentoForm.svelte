<script lang="ts">
  let forma_pagamento: string;
</script>
<form>
  <select bind:value={forma_pagamento}>
    <option value="dinheiro">Dinheiro</option>
    <option value="credito">Cartao de Credito</option>
    <option value="debito">Cartao de Debito</option>
  </select>
</form>
