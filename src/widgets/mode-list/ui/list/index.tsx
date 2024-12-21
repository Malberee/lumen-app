import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { RadioGroup } from '@malberee/nextui-native'
import { type FC, useState } from 'react'

import type { ModeType } from '@entities/mode'

import { Radio } from './radio'

interface ListProps {
  modes: ModeType[]
}

export const List: FC<ListProps> = ({ modes }) => {
  const [value, setValue] = useState('snake')

  return (
    <RadioGroup onValueChange={setValue} value={value}>
      <BottomSheetFlatList
        data={modes}
        renderItem={({ item }) => (
          <Radio mode={item} isSelected={value === item.name} />
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
