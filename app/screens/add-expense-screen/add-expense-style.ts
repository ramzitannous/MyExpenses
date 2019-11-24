import { StyleSheet } from "react-native"
import { color } from "@theme"

const styles = StyleSheet.create({
  dateContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  root: {
    backgroundColor: color.palette.white,
    flexDirection: "column",
  },
  title: {
    color: color.palette.black,
    fontSize: 18,
    textAlign: "center",
  },
})

export default styles
