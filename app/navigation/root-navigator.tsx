import { DrawerNavigator } from "./drawer-navigator"
import { createSwitchNavigator } from "react-navigation"

export const RootNavigator = createSwitchNavigator(
  {
    Drawer: { screen: DrawerNavigator },
  },
  {},
)
