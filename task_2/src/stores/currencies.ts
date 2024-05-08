import { writable } from "svelte/store";
import { getExchangeRate } from "../api/exchangerate.api";

type StoreState = {
  conversionRates: { [key: string]: number };
  currencies: string[];
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
  conversionRate: number;
  loading: boolean;
  error: Error | null;
};

export const currencyStore = () => {
  const { subscribe, update } = writable<StoreState>({
    conversionRates: {},
    currencies: [],
    fromCurrency: "USD",
    toCurrency: "RUB",
    fromAmount: 0,
    toAmount: 0,
    conversionRate: 0,
    loading: true,
    error: null,
  });

  const load = async () => {
    update((state) => ({ ...state, loading: true }));
    try {
      const data = await getExchangeRate();

      if (data.result === "error") {
        throw new Error(`error`);
      }

      update((state) => ({
        ...state,
        conversionRates: data.conversion_rates,
        currencies: Object.keys(data.conversion_rates),
        loading: false,
      }));
    } catch (error) {
      console.log(error);
      update((state) => ({ ...state, loading: false }));
    }
  };

  return {
    subscribe,
    update,
    load,
  };
};
