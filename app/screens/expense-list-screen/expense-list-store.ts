import { observable } from "mobx"
import { Expense } from "@models/expense"

export class ExpenseListScreenStore {
  @observable
  expenses: Expense[] = [];

}
