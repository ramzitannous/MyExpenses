import React, { memo } from "react"
import { Image, ImageStyle } from "react-native"
import { Currency } from "@models/currency"
import { ListItem } from "react-native-elements"

export interface CurrencyItemProps {
  currency: Currency
}

const FlagStyle: ImageStyle = {
  height: 32,
  width: 48,
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export const CurrencyItem = memo(
  (props: CurrencyItemProps) => {
    // grab the props
    const { currency } = props

    return (
      <ListItem
        title={`${currency.name} (${currency.symbol})`}
        rightElement={<Image style={FlagStyle} source={currency.image} />}
      />
    )
  },
  (prevProps, nextProps) => prevProps.currency.code === nextProps.currency.code,
)

CurrencyItem.displayName = "CurrencyItem"
