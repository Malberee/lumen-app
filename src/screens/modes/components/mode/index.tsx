import { cn, semanticColors } from 'merlo-ui'
import type { FC } from 'react'
import { Pressable, Text } from 'react-native'

import { useStore } from '@store'

import { Surface } from '../surface'
import { icons } from './constants'

interface ModeProps {
  name: string
  index: number
}

export const Mode: FC<ModeProps> = ({ name, index }) => {
  const setMode = useStore((state) => state.setMode)
  const currentModeIndex = useStore((state) => state.currentMode)

  const isSelected = currentModeIndex === index
  const Icon = icons[name]

  return (
    <Surface
      as={Pressable}
      onPress={() => setMode(index)}
      className={cn(
        'flex-col items-center justify-center gap-1 px-1.5 py-4 transition-colors duration-200',
        isSelected && 'border-primary bg-primary-50',
      )}
    >
      <Icon
        color={
          isSelected
            ? semanticColors.dark.primary[400]!
            : semanticColors.dark.default[300]!
        }
        duration={200}
      />
      <Text
        className={cn(
          'text-center text-sm capitalize text-foreground-300 transition-colors duration-200',
          isSelected && 'text-primary',
        )}
      >
        {name}
      </Text>
    </Surface>
  )
}
