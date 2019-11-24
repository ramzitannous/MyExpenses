import { action, observable } from "mobx"
import { Expense } from "@models/expense"
import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import { showError, showSnackbar } from "@utils/helpers"
import { Currency } from "@models/currency"

export class AddExpenseScreenStore {
  @observable
  expense: Expense = {
    date: new Date(),
    note: "",
    value: 0,
    category: "FOOD",
    currency: Currency.ILS,
  }

  private expensesRef: FirebaseFirestoreTypes.CollectionReference

  @observable
  showDate = false

  @action
  changeExpense(newExpense: { [key: string]: string | number | Date }) {
    this.expense = Object.assign(this.expense, newExpense)
  }

  @action
  showDatePicker(show: boolean) {
    this.showDate = show
  }

  getExpensesRef() {
    if (!this.expensesRef) {
      this.expensesRef = firestore().collection("expenses")
    }
  }

  saveExpense() {
    this.getExpensesRef()
    try {
      this.expensesRef.add(this.expense)
      showSnackbar("Saved Successfully !")
      this.resetExpense()
    } catch (e) {
      console.error(e)
      showError("Error While Saving !")
    }
  }

  resetExpense() {
    this.expense = {
      date: new Date(),
      value: 0,
      currency: Currency.ILS,
      category: "FOOD",
      note: "",
    }
  }
}
