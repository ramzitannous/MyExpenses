import { createDrawerNavigator } from "react-navigation-drawer"
import { DrawerContent } from "@components/drawer-content"
import { ExpenseFlow } from "./expenses-stack"
import { ReportsScreen } from "@screens/reports-screen"

export const DrawerNavigator = createDrawerNavigator(
  {
    ExpenseFlow: {
      screen: ExpenseFlow
    },
    Report: {
      screen: ReportsScreen
    }
  },
  {
    contentComponent: DrawerContent,
    initialRouteName: "ExpenseFlow",
    drawerType: "front",
  },
)
