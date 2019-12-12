import { observer } from "mobx-react"
import { NavigationStackScreenComponent, NavigationStackScreenProps } from "react-navigation-stack"
import styles from "./expense-list-style"
import { View } from "react-native"
import { Button, Overlay, Text } from "react-native-elements"
import { HeaderCalender } from "@components/header-calender"
import { useStores } from "@stores/root-store"
import CalendarStrip from "react-native-calendar-strip"
import { color, GlobalStyles } from "@theme"
import { ProgressLayout } from "@components/progress-layout"
import { ExpensesList } from "@components/expenses-list"
import React, { useEffect } from "react"
import { DrawerButton } from "@components/drawer-button"
import { ConvertCurrency } from "@components/convert-currency"

export interface ExpenseListScreenProps extends NavigationStackScreenProps<{}> {}

const NoExpenses = () => (
  <View style={GlobalStyles.center}>
    <Text h4={true}>{"No Expenses"}</Text>
  </View>
)

export const ExpenseListScreen: NavigationStackScreenComponent<ExpenseListScreenProps> = observer(
  props => {
    const { appStore, settingsStore } = useStores()
    const { navigation } = props

    useEffect(() => {
      appStore.getExpensesByDate()
    }, [])

    const navToAdd = () => {
      navigation.navigate("Add")
    }

    const renderExpenseList = () => {
      if (appStore.isExpensesEmpty) {
        return <NoExpenses />
      } else {
        return <ExpensesList />
      }
    }

    return (
      <View style={styles.container}>
        {appStore.isReportDialogVisible && (
          <Overlay isVisible={appStore.isReportDialogVisible}>
            <ConvertCurrency
              expenses={appStore.expenses}
              appCurrency={settingsStore.selectedCurrency}
            />
          </Overlay>
        )}
        <CalendarStrip
          calendarAnimation={{ type: "sequence", duration: 30 }}
          calendarHeaderStyle={styles.calenderTextColor}
          calendarColor={color.primary}
          dateNumberStyle={styles.calenderTextColor}
          dateNameStyle={styles.calenderTextColor}
          highlightDateNameStyle={styles.calenderHighlighted}
          highlightDateNumberStyle={styles.calenderHighlighted}
          style={styles.calender}
          onDateSelected={date => appStore.changeDate(date)}
          selectedDate={appStore.selectedDate}
        />
        <ProgressLayout isLoading={appStore.isExpensesLoading}>
          {renderExpenseList()}
          <Button
            style={styles.addBtn}
            buttonStyle={styles.addBtn}
            type={"solid"}
            icon={{ name: "add", type: "material" }}
            onPress={navToAdd}
          />
        </ProgressLayout>
      </View>
    )
  },
)

ExpenseListScreen.navigationOptions = ({ navigation }) => ({
  headerRight: <HeaderCalender />,
  headerLeft: <DrawerButton navigation={navigation} />,
})
