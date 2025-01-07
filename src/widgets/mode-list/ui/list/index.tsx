import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { RadioGroup } from '@malberee/nextui-native'

import {
  selectCurrentMode,
  useModesContext,
  useModesStore,
} from '@entities/mode'

import { Radio } from './radio'

export const List = () => {
  const currentMode = useModesStore(selectCurrentMode)
  const modes = useModesStore((state) => state.modes)
  const { handleSelect } = useModesContext()

  return (
    <RadioGroup onValueChange={handleSelect} value={currentMode.name}>
      <BottomSheetFlatList
        data={modes}
        renderItem={({ item }) => (
          <Radio mode={item} isSelected={currentMode.name === item.name} />
        )}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{
          gap: 16,
          paddingBottom: 32,
        }}
      />
    </RadioGroup>
  )
}
