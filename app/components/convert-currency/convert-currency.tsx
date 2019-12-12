import React, { useMemo, useState } from "react"
import { Expense } from "@models/expense"
import { FlatList, View, ViewStyle } from "react-native"
import { Divider, ListItem, Text } from "react-native-elements"
import { CurrencyConvertService } from "@services/currency-convert"
import { ProgressLayout } from "@components/progress-layout"
import { CurrenciesMap } from "../../assets/curr"
import { Currency } from "@models/currency"

const currenciesMap = CurrenciesMap()

export interface ConvertCurrencyProps {
  expenses: Expense[]

  appCurrency: Currency
}

const ContainerView: ViewStyle = {
  flexGrow: 1,
  flexDirection: "column",
  justifyContent: "space-evenly",
  padding: 8,
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function ConvertCurrency(props: ConvertCurrencyProps) {
  // grab the props
  const { expenses, appCurrency } = props
  const [isLoading] = useState(false)
  const currencyService = useMemo(() => new CurrencyConvertService(appCurrency.code), [])

  let sum = 0

  return (
    <ProgressLayout isLoading={isLoading}>
      <View style={ContainerView}>
        <Text h4={true}>Daily Report</Text>
        <FlatList
          data={expenses}
          renderItem={({ item }) => (
            <ListItem
              title={`${item.value} ${currenciesMap[item.currency].symbol}`}
              subtitle={`${currencyService.convert(item.currency, item.value)} ${
                currenciesMap[item.currency].symbol
              }`}
            />
          )}
        />
        <Divider />
        <Text>{`Total: ${sum} ${appCurrency}`}</Text>
      </View>
    </ProgressLayout>
  )
}
