import { cn, semanticColors } from 'merlo-ui'
import { memo } from 'react'
import { Pressable, Text } from 'react-native'

import { Surface } from '@components'
import { type ModeName, useStore } from '@store'

import { icons } from './constants'

interface ModeProps {
  name: ModeName
}

export const Mode = memo<ModeProps>(({ name }) => {
  const setMode = useStore((state) => state.setMode)
  const isSelected = useStore(
    (state) => state.modes[state.currentMode].name === name,
  )

  const Icon = icons[name]

  return (
    <Surface
      as={Pressable}
      onPress={() => setMode(name)}
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
})
