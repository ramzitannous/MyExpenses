import React, { useEffect, useState } from "react"
import { Animated } from "react-native"
import { Screen } from "../screen"
import IMAGES from "@assets"
import { GlobalStyles } from "@theme"

export interface SplashProps {}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function Splash() {
  const [scaleFactor] = useState(new Animated.Value(1))

  const config = {
    delay: 500,
    duration: 2000,
    useNativeDriver: true,
  }
  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleFactor, {
        toValue: 2,
        ...config,
      }),
      Animated.timing(scaleFactor, {
        toValue: 1,
        ...config,
      }),
    ]).start()
  }, [])

  return (
    <Screen style={GlobalStyles.center}>
      <Animated.Image
        source={IMAGES.brand}
        style={{ transform: [{ scaleX: scaleFactor }, { scaleY: scaleFactor }] }}
      />
    </Screen>
  )
}
