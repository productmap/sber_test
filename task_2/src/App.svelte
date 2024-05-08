<script lang="ts">
  import CurrencyConverter from "./lib/CurrencyConverter.svelte";
</script>

<main class="main">
  <h1>Конвертер валют</h1>
  <CurrencyConverter/>
</main>

<style lang="scss">
    .main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }
</style>
