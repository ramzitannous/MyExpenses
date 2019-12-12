import { CurrencyRateResponse } from "@models/fixer"
import { CurrencyConvertService } from "@services/currency-convert"
import { Currency } from "@models/currency"
import { Settings } from "@models/settings"
import { loadString, saveString } from "@storage"
import { CurrenciesMap } from "../../assets/curr"
import { computed, observable } from "mobx"
import NetInfo from "@react-native-community/netinfo"

const currencies = CurrenciesMap()

const SETTINGS_KEY = "settings"

export class SettingsStore {
  @computed
  public get selectedCurrency(): Currency {
    const selected = currencies[this.appSettings.currency]
    return {
      code: this.appSettings.currency,
      name: selected.name,
      image: selected.image,
      symbol: selected.symbol,
      symbolNative: selected.symbol,
    }
  }

  @observable
  appSettings: Settings

  private async getCurrencyRates(currencyCode: string): Promise<CurrencyRateResponse> {
    const service = new CurrencyConvertService(currencyCode)
    const res = await service.findCurrencyRates()
    return res
  }

  private async defaultSettings(): Promise<Settings> {
    const rates = await this.getCurrencyRates("ILS")
    return {
      currency: "ILS",
      currencyRate: rates,
    }
  }

  async loadAppSettings(): Promise<void> {
    const settingStr = await loadString(SETTINGS_KEY)
    let settings: Settings = JSON.parse(settingStr)
    if (!settings) {
      settings = await this.defaultSettings()
      this.appSettings = settings
      this.updateAppSettings(settings)
    } else {
      this.appSettings = settings
    }

    // if connected update currency rates
    const state = await NetInfo.fetch()
    if (state.isConnected) {
      settings.currencyRate = await this.getCurrencyRates(settings.currency)
      this.appSettings = settings
      this.updateAppSettings({ currencyRate: settings.currencyRate })
    }
  }

  async updateAppSettings(settings: Settings) {
    const updatedSettings = Object.assign(this.appSettings, settings)
    this.appSettings = updatedSettings
    const settingStr = JSON.stringify(updatedSettings)
    saveString(SETTINGS_KEY, settingStr)
  }
}
