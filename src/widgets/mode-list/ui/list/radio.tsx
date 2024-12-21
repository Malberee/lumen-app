import { Radio as RadioNextUI, cn } from '@malberee/nextui-native'
import { memo } from 'react'

import type { ModeType } from '@entities/mode'

interface RadioProps {
  isSelected: boolean
  mode: ModeType
}

export const Radio = memo<RadioProps>(({ isSelected, mode }) => {
  return (
    <RadioNextUI
      value={mode.name}
      size="lg"
      classNames={{
        base: cn(
          'bg-default-100 border border-default-200 duration-250 transition-colors rounded-3xl px-4 py-6 flex-row-reverse justify-between w-full',
          isSelected && 'border-primary',
        ),
        label: 'text-xl capitalize',
      }}
    >
      {mode.name}
    </RadioNextUI>
  )
})
