import { CurrencyRateResponse } from "@models/fixer"

export interface Settings {
  currency?: string
  currencyRate?: CurrencyRateResponse
}
