import * as React from "react"
import { Platform, SafeAreaView, StatusBar, View, ViewStyle } from "react-native"
import { color } from "@theme"
import { hasNotch } from "react-native-device-info"

export interface ScreenProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  children?: React.ReactNode
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function Screen(props: ScreenProps) {
  // grab the props
  const { style, children } = props
  const Container = Platform.OS === "android" ? View : SafeAreaView
  const styles: ViewStyle = {
    ...style,
    flex: 1,
    paddingTop: Platform.OS === "android" && hasNotch() ? StatusBar.currentHeight : 0,
    backgroundColor: color.background,
  }

  return <Container style={styles}>{children}</Container>
}
