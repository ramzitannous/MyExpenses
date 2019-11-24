import Snackbar from "react-native-snackbar"
import { color } from "@theme"


const action = {
  title: "OK",
  color: color.palette.white,
  onPress: () => {
    Snackbar.dismiss()
  },
}

export function showError(title: string) {
  Snackbar.show({
    title,
    color: color.palette.white,
    backgroundColor: color.error,
    duration: 10000,
    action,
  })
}

export function showSnackbar(title: string) {
  Snackbar.show({
    title,
    duration: 10000,
    action,
  })
}
