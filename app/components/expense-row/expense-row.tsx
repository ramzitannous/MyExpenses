import React, { memo } from "react"
import { Expense } from "@models/expense"
import { Button, ListItem } from "react-native-elements"
import { Image, ImageStyle } from "react-native"
import { CurrenciesMap } from "../../assets/curr"

const currenciesMap = CurrenciesMap()

export interface ExpenseRowProps {
  expense: Expense

  onDelete: () => void
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
export const ExpenseRow = memo(
  (props: ExpenseRowProps) => {
    // grab the props
    const {
      expense: { value, note, currency },
      onDelete,
    } = props

    return (
      <ListItem
        subtitle={note ? (note === "" ? "No Note" : note) : "No Note"}
        title={`${value} ${currenciesMap[currency].symbol}`}
        bottomDivider={true}
        rightElement={
          <Button type={"clear"} onPress={onDelete} icon={{ type: "material", name: "delete" }} />
        }
        leftElement={<Image style={FlagStyle} source={currenciesMap[currency].image} />}
      />
    )
  },
  (prevProps, nextProps) => prevProps.expense.id === nextProps.expense.id,
)

ExpenseRow.displayName = "ExpenseRow"
