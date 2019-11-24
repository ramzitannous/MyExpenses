import { Dimensions, StyleSheet } from "react-native"
import { color } from "./color"

const WIDTH = Dimensions.get("window").width

export const GlobalStyles = StyleSheet.create({
  center: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  root: {
    backgroundColor: color.palette.white,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: WIDTH * 0.1,
  },
})
