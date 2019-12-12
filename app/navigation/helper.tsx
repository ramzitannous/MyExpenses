import { createStackNavigator } from "react-navigation-stack"
import { DrawerButton } from "@components/drawer-button"
import React from "react"

export function createStack(routeName: string, screen: any, headerTitle: string) {
  return createStackNavigator(
    {
      [routeName]: { screen: screen },
    },
    {
      initialRouteName: routeName,
      defaultNavigationOptions: ({ navigation, theme }) => ({
        gesturesEnabled: true,
        headerLeft: <DrawerButton navigation={navigation} />,
        headerTitle: headerTitle,
      }),
    },
  )
}
