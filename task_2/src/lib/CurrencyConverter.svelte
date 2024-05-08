<script lang="ts">
  import {currencyStore} from '../stores/currencies';
  import {Icon} from 'svelte-icons-pack';
  import {AiOutlineSwap} from "svelte-icons-pack/ai";
  import Select from "svelte-select";
  import {Wave} from "svelte-loading-spinners";

  const converter = currencyStore();
  converter.load();

  function handleCurrencyAmountChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = parseFloat(target.value);

    if (isNaN(value)) {
      return;
    }

    if (target.classList.contains('from-amount')) {
      converter.update((state) => ({...state, fromAmount: value}));
    } else if (target.classList.contains('to-amount')) {
      converter.update((state) => ({...state, toAmount: value}));
    }
    convertCurrency();
  }

  function handleCurrencyChange(event: CustomEvent, name: string): void {
    const target = event.detail as HTMLSelectElement;

    if (name === 'fromCurrency') {
      converter.update((state) => ({...state, fromCurrency: target.value}));
    } else if (name === 'toCurrency') {
      converter.update((state) => ({...state, toCurrency: target.value}));
    }
    convertCurrency();
  }

  function convertCurrency() {
    const fromCurrencyRate = $converter.conversionRates[$converter.fromCurrency];
    const toCurrencyRate = $converter.conversionRates[$converter.toCurrency];
    const convertedToAmount = $converter.fromAmount * (toCurrencyRate / fromCurrencyRate);
    const convertedFromAmount = $converter.toAmount * (fromCurrencyRate / toCurrencyRate);

    converter.update((state) => ({...state, toAmount: convertedToAmount, fromAmount: convertedFromAmount}));
  }
</script>

{#if $converter.loading}
  <Wave size="60" color="#FF3E00" unit="px" duration="2s"/>
{:else if $converter.currencies.length > 0}
  <div class="currency-converter">
    <div class="input-group">
      <input
              class="input from-amount"
              type="number"
              min="0"
              value={$converter.fromAmount.toFixed(2)}
              on:input={handleCurrencyAmountChange}
      />
      <Select items={$converter.currencies}
              value={$converter.fromCurrency}
              on:change={(event) => {handleCurrencyChange(event, 'fromCurrency')}}
              showChevron
              clearable={false}
              class="select"
      />
    </div>
    <Icon src={AiOutlineSwap} size={32}/>
    <div class="input-group">
      <input
              class="input to-amount"
              type="number"
              min="0"
              value={$converter.toAmount.toFixed(2)}
              on:input={handleCurrencyAmountChange}
      />
      <Select items={$converter.currencies}
              value={$converter.toCurrency}
              on:change={(event) => {handleCurrencyChange(event, 'toCurrency')}}
              showChevron
              clearable={false}
              class="select"
      />
    </div>
  </div>
{:else if $converter.error}
  <p>{$converter.error?.message ?? 'Unknown error'}</p>
{/if}

<style lang="scss">
  .currency-converter {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: max-content;
    width: max-content;
    column-gap: 16px;
  }

  .input-group {
    width: max-content;
    box-sizing: border-box;
    height: 58px;
    font-size: 24px;
    padding: 8px;
    border: 1px solid lightgray;
    border-radius: 16px;
    display: inline-flex;
    column-gap: 12px;
  }

  .input {
    border: none;
    font-size: 22px;
    padding: 8px;
  }

  :global(.select) {
    background: #f8f8f8 !important;
    border-radius: 12px !important;
  }
</style>