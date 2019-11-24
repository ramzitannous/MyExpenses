import React, { useMemo } from "react"
import { observer, useLocalStore } from "mobx-react"
import { NavigationStackScreenProps } from "react-navigation-stack"
import { Picker, ScrollView, View } from "react-native"
import { AddExpenseScreenStore } from "./add-expense-store"
import { GlobalStyles } from "@theme"
import { Button, Input, Text } from "react-native-elements"
import styles from "@screens/add-expense-screen/add-expense-style"
import DateTimePicker from "@react-native-community/datetimepicker"
import { Currency } from "@models/currency"

export interface AddExpenseScreenProps extends NavigationStackScreenProps<{}> {}

export const AddExpenseScreen: React.FunctionComponent<AddExpenseScreenProps> = observer(props => {
  const addExpenseStore = useLocalStore(() => new AddExpenseScreenStore())

  const changeDate = newDate => {
    addExpenseStore.changeExpense({ date: newDate })
    addExpenseStore.showDatePicker(false)
  }

  const currencies = useMemo(
    () => Object.keys(Currency).map(curr => <Picker.Item key={curr} label={curr} value={curr} />),
    [],
  )

  const save = () => {
    addExpenseStore.saveExpense()
  }

  return (
    <ScrollView
      contentContainerStyle={GlobalStyles.root}
      keyboardShouldPersistTaps={"always"}
      keyboardDismissMode={"on-drag"}
    >
      <Input
        label={"Value"}
        keyboardType={"numeric"}
        leftIcon={{ name: "attach-money", type: "material" }}
        value={`${addExpenseStore.expense.value}`}
        onChangeText={text => addExpenseStore.changeExpense({ value: text })}
      />

      <Input
        label={"Note"}
        keyboardType={"default"}
        leftIcon={{ name: "attach-money", type: "material" }}
        value={addExpenseStore.expense.note}
        onChangeText={text => addExpenseStore.changeExpense({ note: text })}
      />

      <View style={styles.dateContainer}>
        <Text>{addExpenseStore.expense.date.toString()}</Text>
        <Button
          type={"clear"}
          onPress={() => addExpenseStore.showDatePicker(true)}
          icon={{ type: "material", name: "date-range" }}
        />
      </View>

      {addExpenseStore.showDate && (
        <DateTimePicker
          mode={"date"}
          value={addExpenseStore.expense.date}
          onChange={(event, date) => changeDate(date)}
        />
      )}

      <View>
        <Text>{"Currency"}</Text>
        <Picker
          selectedValue={addExpenseStore.expense.currency}
          onValueChange={itemValue => addExpenseStore.changeExpense({ currency: itemValue })}
        >
          {currencies}
        </Picker>
      </View>

      <Button title={"save"} icon={{ name: "save", type: "material" }} onPress={save} />
    </ScrollView>
  )
})
