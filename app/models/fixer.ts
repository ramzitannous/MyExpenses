export interface CurrencyRateResponse {
  success: boolean
  timestamp: Date
  base: string
  date: Date
  rates: CurrencyRate
}

export interface CurrencyRate {
  [currencyCode: string]: number
}
