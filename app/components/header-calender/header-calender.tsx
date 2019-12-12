import React, { FunctionComponent } from "react"
import { View } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { useStores } from "@stores/root-store"
import { observer } from "mobx-react"
import { Button } from "react-native-elements"

export interface HeaderCalenderProps {}

enum PickerEventTypes {
  SET = "set",
  Dismissed = "dismissed",
}
/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export const HeaderCalender: FunctionComponent<HeaderCalenderProps> = observer(() => {
  // grab the props
  const { appStore } = useStores()

  const changeDate = (event, date: Date) => {
    if (event.type === PickerEventTypes.Dismissed) {
      appStore.showDatePicker(false)
    } else {
      appStore.showDatePicker(false)
      appStore.changeDate(date)
    }
  }

  return (
    <View>
      <Button
        type={"clear"}
        onPress={() => appStore.showDatePicker(true)}
        icon={{ type: "material", name: "date-range" }}
      />
      {appStore.showDate && (
        <DateTimePicker
          mode={"date"}
          display={"calendar"}
          value={appStore.selectedDate || new Date()}
          onChange={(event, date) => changeDate(event, date)}
        />
      )}
    </View>
  )
})
