import { ApiFactory } from "@api"
import { CurrencyRateResponse } from "@models/fixer"

export class CurrencyConvertService {
  private currencyRates: object

  constructor(private appCurrency: string) {}

  public async findCurrencyRates(): Promise<CurrencyRateResponse> {
    const api = ApiFactory.getInstance()
    const result = await api.getCurrencyRates(this.appCurrency)
    this.currencyRates = result.rates
    return result
  }

  public convert(toCurrency: string, amount: number): number {
    if (this.appCurrency === toCurrency) {
      return amount
    }

    const conversionRate = 1.0 / this.currencyRates[toCurrency]
    return conversionRate * amount
  }
}
