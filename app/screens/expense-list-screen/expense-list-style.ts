import { StyleSheet } from "react-native"
import { color } from "@theme"

const styles = StyleSheet.create({
  addBtn: {
    backgroundColor: color.primary,
    borderRadius: 30,
    bottom: 30,
    height: 60,
    position: "absolute",
    right: 30,
    width: 60,
  },
  calender: {
    height: 100,
    paddingBottom: 10,
    paddingTop: 20,
  },
  calenderHighlighted: {
    color: color.calenderHighlightedText,
  },
  calenderTextColor: {
    color: color.calenderDefault,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    position: "relative",
  },
})

export default styles
