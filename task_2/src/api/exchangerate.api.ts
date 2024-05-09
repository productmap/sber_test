// Exchange Rate API
import { config } from "./exchangerate.config";
import { currenciesData } from "../data/data";

export const getExchangeRate = async () => {
  const response = await fetch(
    `${config.apiUrl}${config.apiKey}/latest/${config.base}`
  );
  return await response.json();
};

export const getMockRate = async () => {
  return currenciesData;
};
