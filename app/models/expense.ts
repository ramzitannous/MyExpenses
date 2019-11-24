import { Currency } from "@models/currency"

export interface Expense {
  note: string
  value: number
  category: string
  date: Date
  currency: Currency
}
