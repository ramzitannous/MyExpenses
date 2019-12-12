import * as React from "react"
// eslint-disable-next-line react-native/split-platform-components
import { Platform, ProgressBarAndroid, ProgressViewIOS, ViewStyle } from "react-native"
import { Screen } from "../screen"
import { GlobalStyles } from "@theme"

export interface ProgressLayoutProps {
  /**
   * children
   */
  children?: React.ReactNode

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  /**
   * loading
   */
  isLoading: boolean
}

export const ProgressLayout = React.memo(
  (props: ProgressLayoutProps) => {
    // grab the props
    const { style, isLoading, children } = props

    if (isLoading) {
      return (
        <Screen style={GlobalStyles.center}>
          {Platform.OS === "android" ? (
            <ProgressBarAndroid style={style} indeterminate={true} />
          ) : (
            <ProgressViewIOS style={style} />
          )}
        </Screen>
      )
    }

    return <React.Fragment>{children}</React.Fragment>
  },
  (prevProps, nextProps) => prevProps.isLoading === nextProps.isLoading,
)

ProgressLayout.displayName = "ProgressLayout"
