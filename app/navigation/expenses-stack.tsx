import { createStackNavigator } from "react-navigation-stack"
import { ExpenseListScreen } from "@screens/expense-list-screen"
import { AddExpenseScreen } from "@screens/add-expense-screen"
import { color } from "@theme"

export const ExpenseFlow = createStackNavigator(
  {
    List: {
      screen: ExpenseListScreen,
    },
    Add: {
      screen: AddExpenseScreen,
      navigationOptions: () => ({
        headerTitle: "Add Expense",
      }),
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: color.header,
      },
    },
  },
)
