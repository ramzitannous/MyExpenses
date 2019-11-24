import { Image, View } from "react-native"
import { Text } from "react-native-elements"
import Styles from "./styles"
import React from "react"
import { DrawerContentComponentProps, DrawerNavigatorItems } from "react-navigation-drawer"
import IMAGES from "@assets"

const appTitle = require("../../../app.json").displayName

interface DrawerContentProps extends DrawerContentComponentProps {
  children: React.ReactNode
}
/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function DrawerContent(props: DrawerContentProps) {
  // grab the props

  return (
    <View>
      <View style={Styles.content}>
        <Image source={IMAGES.brand} />
        <Text h4={true}>{appTitle}</Text>
      </View>
      <DrawerNavigatorItems {...props} />
    </View>
  )
}
