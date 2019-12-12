import React, { memo } from "react"
import { Currency } from "@models/currency"
import PickerModal from "react-native-picker-modal-view"
import { DropdownCurrencies } from "../../assets/curr"
import { IModalListInDto } from "react-native-picker-modal-view/dist/Interfaces"
import { CurrencyItem } from "@components/currency-item"

const currencies = DropdownCurrencies()

export interface CurrencyModalProps {
  onSelectCurrency: (currency: Currency) => void

  selectedCurrency: Currency
}

export const CurrencyModal = memo(
  (props: CurrencyModalProps) => {
    // grab the props
    const { onSelectCurrency, selectedCurrency } = props

    return (
      <PickerModal
        onEndReached={() => {}}
        onClosed={() => {}}
        items={currencies}
        selected={{
          Value: selectedCurrency,
          Id: selectedCurrency.code,
          Name: selectedCurrency.name,
        }}
        onSelected={(selected: IModalListInDto<Currency>) => {
          onSelectCurrency(selected.Value as Currency)
          return selected
        }}
        autoGenerateAlphabeticalIndex={true}
        renderListItem={(_, listItem) => <CurrencyItem currency={listItem.Value as Currency} />}
      />
    )
  },
  (prevProps, nextProps) => prevProps === nextProps,
)

CurrencyModal.displayName = "CurrencyModal"
