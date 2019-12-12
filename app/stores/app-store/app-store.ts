import { action, computed, observable } from "mobx"
import { Expense } from "@models/expense"
import { showError, showSnackbar } from "@utils/helpers"
import moment, { Moment } from "moment"
import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"

export class AppStore {
  @observable
  expenses: Expense[] = []

  @observable
  isExpensesLoading = true

  isExpensesEmpty = true

  @observable
  selectedDate = new Date()

  expensesId: string

  @observable
  refreshing = false

  @observable
  expense: Expense = {
    note: "",
    value: 0,
    category: "FOOD",
  }

  @observable
  isReportDialogVisible = false

  @observable
  saveDisabled = false

  private isDateChanged = true

  // cache value
  private expensesRef: FirebaseFirestoreTypes.CollectionReference = null

  private expensesCollectionRef: FirebaseFirestoreTypes.CollectionReference = null

  constructor() {
    this.selectedDate.setHours(0, 0, 0, 0)
  }

  @action
  async refresh() {
    this.refreshing = true
    await this.getExpensesByDate(false)
    this.refreshing = false
  }

  @action
  changeDate(newDate: Moment | Date) {
    if (newDate instanceof Date) {
      this.selectedDate = newDate
    } else {
      this.selectedDate = newDate.toDate()
    }
    this.selectedDate.setHours(0, 0, 0, 0)
    this.isDateChanged = true
    this.getExpensesByDate()
  }

  @action
  emptyExpenses(shouldShowLoading) {
    this.isExpensesEmpty = true
    this.expenses = []
    this.isExpensesLoading = shouldShowLoading && false
  }

  @action
  async getExpensesByDate(shouldShowLoading = true) {
    this.isExpensesLoading = shouldShowLoading && true
    if (this.isDateChanged) {
      this.expensesRef = await this.getExpensesRef()
      this.isDateChanged = false
    }

    this.expensesId = this.expensesRef.id
    const queryExpenses = await this.expensesRef.get()
    if (queryExpenses.docs.length === 0) {
      this.emptyExpenses(shouldShowLoading)
      return
    }

    const myExpenses: Expense[] = queryExpenses.docs.map(value => {
      const data = value.data()
      return {
        currency: data.currency,
        value: data.value,
        category: data.category,
        note: data.note,
        id: value.id,
      }
    })
    this.isExpensesEmpty = false
    this.expenses = [...myExpenses]
    this.isExpensesLoading = shouldShowLoading && false
  }

  async deleteExpense(expenseId: string, index: number) {
    try {
      const expense = await this.expensesRef.doc(expenseId)
      await expense.delete()
      this.expenses.splice(index, 1)
      this.expenses = [...this.expenses]
      showSnackbar("Expense Deleted Successfully")
    } catch (e) {
      showError("Expense Not Deleted !")
    }
  }

  async saveExpense(expense: Expense) {
    this.saveDisabled = true
    try {
      if (!this.expensesRef) {
        this.expensesRef = await this.getExpensesRef()
      }
      await this.expensesRef.add(expense)
      showSnackbar("Saved Successfully !")
      // this.resetExpense()
    } catch (e) {
      console.error(e)
      showError("Error While Saving !")
    } finally {
      this.saveDisabled = false
    }
  }

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

  resetExpense() {
    this.expense = {
      value: 0,
      currency: "USD",
      category: "FOOD",
      note: "",
    }
  }

  @computed
  get selectedDateStr() {
    return this.selectedDate.toDateString()
  }

  @computed
  get isSaveDisabled() {
    return this.expense.value === 0
  }

  async getExpensesRef(): Promise<FirebaseFirestoreTypes.CollectionReference> {
    if (!this.expensesCollectionRef) {
      this.expensesCollectionRef = firestore().collection("expensesCollection")
    }
    const dateStr = moment(this.selectedDate).format("d-MMM-YYYY")
    const docRef = this.expensesCollectionRef.doc(dateStr)
    return docRef.collection("expenses")
  }

  @action
  showReport(visible: boolean) {
    this.isReportDialogVisible = visible
  }
}
