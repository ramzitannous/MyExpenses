import * as React from "react"
import { observer } from "mobx-react"
import { NavigationStackScreenProps } from "react-navigation-stack"
import styles from "./expense-list-style"
import { View } from "react-native"
// import { ExpenseListScreenStore } from "./expense-list-store"
import { Button } from "react-native-elements"
import { GlobalStyles } from "@theme"

export interface ExpenseListScreenProps extends NavigationStackScreenProps<{}> {}

export const ExpenseListScreen: React.FunctionComponent<ExpenseListScreenProps> = observer(
  props => {
    // const expenseListStore = useLocalStore(() => new ExpenseListScreenStore())
    const { navigation } = props

    const navToAdd = () => {
      navigation.navigate("Add")
    }

    return (
      <View style={GlobalStyles.root}>
        <Button
          style={styles.addBtn}
          buttonStyle={styles.addBtn}
          type={"solid"}
          icon={{ name: "add", type: "material" }}
          onPress={navToAdd}
        />
      </View>
    )
  },
)
