export interface ExchangeRateApiResult {
  result: boolean;
  timestamp: number;
  historical: boolean;
  base: string;
  date: string;
  conversion_rates: {
    [key: string]: number;
  };
}

export interface ExchangeRateApiError {
  result: boolean;
  documentation: string;
  termsOfUse: string;
  errorType: string;
}
