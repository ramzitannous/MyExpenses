import { createDrawerNavigator } from "react-navigation-drawer"
import { DrawerContent } from "@components/drawer-content"
import { ExpenseFlow } from "./expenses-stack"
import { ReportsScreen } from "@screens/reports-screen"
import { SettingsScreen } from "@screens/settings-screen"
import { createStack } from "./helper"

export const DrawerNavigator = createDrawerNavigator(
  {
    ExpenseFlow: {
      screen: ExpenseFlow,
    },

    Report: {
      screen: ReportsScreen,
    },

    Settings: {
      screen: createStack("Settings", SettingsScreen, "Settings"),
    },
  },
  {
    contentComponent: DrawerContent,
    initialRouteName: "ExpenseFlow",
    drawerType: "front",
  },
)
