export interface Currency {
  symbol: string
  name: string
  symbolNative: string
  code: string
  image: any
}

export interface CurrencyInfo {
  symbol: string
  name: string
  image: any
}

export interface CurrencyMap {
  [code: string]: CurrencyInfo
}
