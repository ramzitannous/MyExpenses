import React, { useState } from "react"
import { observer } from "mobx-react"
import { NavigationStackScreenProps } from "react-navigation-stack"
import { CurrencyModal } from "@components/currency-modal"
import { Button, View } from "react-native"
import styles from "@screens/settings-screen/settings-style"
import { useStores } from "@stores/root-store"

export interface SettingsScreenProps extends NavigationStackScreenProps<{}> {}

export const SettingsScreen: React.FunctionComponent<SettingsScreenProps> = observer(() => {
  const { settingsStore } = useStores()

  const [currency, setCurrency] = useState(settingsStore.selectedCurrency)

  return (
    <View style={styles.container}>
      <CurrencyModal
        onSelectCurrency={currency => setCurrency(currency)}
        selectedCurrency={currency}
      />

      <Button
        title={"save"}
        onPress={() => settingsStore.updateAppSettings({ currency: currency.code })}
      />
    </View>
  )
})
