import * as React from "react"
import { observer, useLocalStore } from "mobx-react"
import { NavigationStackScreenProps } from "react-navigation-stack"
import styles from "./reports-style"
import { View } from "react-native";
import { ReportsScreenStore } from "./reports-store"


export interface ReportsScreenProps extends NavigationStackScreenProps<{}> {
}


export const ReportsScreen: React.FunctionComponent<ReportsScreenProps> = observer((props) => {
  const reportsStore = useLocalStore(() => new ReportsScreenStore())
  return (
    <View style={styles.root}>
    </View>
  )
})
