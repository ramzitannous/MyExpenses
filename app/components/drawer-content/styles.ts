import { Dimensions, StyleSheet } from "react-native"
import { color, GlobalStyles } from "@theme"

const HEIGHT = Dimensions.get("window").height

const Styles = StyleSheet.create({
  content: {
    ...GlobalStyles.center,
    backgroundColor: color.primary,
    flex: 0,
    height: HEIGHT * 0.3,
  },
})

export default Styles
