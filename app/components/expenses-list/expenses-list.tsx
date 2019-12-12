import React from "react"
import { Alert, FlatList } from "react-native"
import { ExpenseRow } from "@components/expense-row"
import { useStores } from "@stores/root-store"
import { observer } from "mobx-react"
import { Button } from "react-native-elements"

export const ExpensesList = observer(() => {
  // grab the props
  const { appStore } = useStores()
  const showDialog = (expenseId: string, index: number) => {
    Alert.alert("Delete Expense", "Do You Want To Delete ?", [
      { style: "default", text: "yes", onPress: () => appStore.deleteExpense(expenseId, index) },
      { text: "cancel", style: "cancel" },
    ])
  }

  return (
    <FlatList
      ListHeaderComponent={<Button title={"Report"} onPress={() => appStore.showReport(true)} />}
      data={appStore.expenses}
      keyExtractor={item => item.id}
      refreshing={appStore.refreshing}
      onRefresh={() => appStore.refresh()}
      renderItem={({ item, index }) => (
        <ExpenseRow expense={item} onDelete={() => showDialog(item.id, index)} />
      )}
    />
  )
})
