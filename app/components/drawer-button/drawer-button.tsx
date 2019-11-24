import { Button } from "react-native-elements"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import React from "react"
import { NavigationScreenProp } from "react-navigation"
import { color } from "@theme"

export interface DrawerButtonProps {
  navigation: NavigationScreenProp<{}>
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function DrawerButton(props: DrawerButtonProps) {
  const { toggleDrawer } = props.navigation
  return (
    <Button
      type={"clear"}
      onPress={() => toggleDrawer()}
      icon={<Icon name={"menu"} color={color.menu} size={32} />}
    />
  )
}
