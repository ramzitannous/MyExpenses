import React, { useLayoutEffect } from "react"
import { observer } from "mobx-react"
import { NavigationStackScreenProps } from "react-navigation-stack"
import { ScrollView } from "react-native"
import { color, GlobalStyles } from "@theme"
import { Button, Icon, Input } from "react-native-elements"
import DateTimePicker from "@react-native-community/datetimepicker"
import { useStores } from "@stores/root-store"
import { CurrencyModal } from "@components/currency-modal"
import styles from "@screens/add-expense-screen/add-expense-style"

export interface AddExpenseScreenProps extends NavigationStackScreenProps<{}> {}

export const AddExpenseScreen: React.FunctionComponent<AddExpenseScreenProps> = observer(() => {
  const { appStore, settingsStore } = useStores()

  useLayoutEffect(() => {
    appStore.changeExpense({ currency: settingsStore.selectedCurrency.code })
  }, [])

  const changeDate = newDate => {
    appStore.showDatePicker(false)
    appStore.changeDate(newDate)
  }

  const changeValue = (value: string) => {
    if (value && value.length > 0) {
      appStore.changeExpense({ value: Number(value) })
    } else {
      appStore.changeExpense({ value: Number(0) })
    }
  }

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={GlobalStyles.root}
      keyboardShouldPersistTaps={"always"}
      keyboardDismissMode={"on-drag"}
    >
      <Input
        label={"Value"}
        keyboardType={"numeric"}
        leftIcon={{ name: "attach-money", type: "material" }}
        value={`${appStore.expense.value}`}
        onChangeText={changeValue}
      />

      <Input
        label={"Note"}
        keyboardType={"default"}
        leftIcon={{ name: "event-note", type: "material" }}
        value={appStore.expense.note}
        onChangeText={text => appStore.changeExpense({ note: text })}
      />

      <Input
        label={"Date"}
        editable={false}
        value={appStore.selectedDateStr}
        rightIcon={
          <Icon
            type={"material"}
            name={"date-range"}
            onPress={() => appStore.showDatePicker(true)}
          />
        }
      />

      {appStore.showDate && (
        <DateTimePicker
          mode={"date"}
          value={appStore.selectedDate}
          onChange={(event, date) =>
            event.type === "dismissed" ? appStore.showDatePicker(false) : changeDate(date)
          }
        />
      )}

      <CurrencyModal
        selectedCurrency={settingsStore.selectedCurrency}
        onSelectCurrency={currency => appStore.changeExpense({ currency: currency.code })}
      />

      <Button
        disabled={appStore.isSaveDisabled || appStore.saveDisabled}
        buttonStyle={{ backgroundColor: color.palette.green }}
        title={"save"}
        icon={{ name: "save", type: "material" }}
        onPress={() => appStore.saveExpense(appStore.expense)}
      />
    </ScrollView>
  )
})
