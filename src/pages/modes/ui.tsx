import React from 'react'
import { useSharedValue } from 'react-native-reanimated'

import { LedRing } from '@widgets/led-ring'
import { ModeCarousel } from '@widgets/mode-carousel'
import { ModeList } from '@widgets/mode-list'

import type { ModeType } from '@entities/mode'

const modes: ModeType[] = [
  { name: 'loading', params: ['speed'], colors: ['primary', 'secondary'] },
  {
    name: 'snake',
    params: ['speed', 'length'],
    colors: ['primary', 'secondary'],
  },
  {
    name: 'double snake',
    params: ['speed', 'length'],
    colors: ['primary', 'secondary'],
  },
  {
    name: 'fill',
    params: ['speed'],
    colors: ['primary', 'secondary'],
  },
  {
    name: 'double fill',
    params: ['speed'],
    colors: ['primary', 'secondary'],
  },
  { name: 'static', params: [], colors: ['primary'] },
  { name: 'chroma', params: ['speed'], colors: [] },
  { name: 'rainbow', params: ['speed'], colors: [] },
  { name: 'custom', params: ['speed'], colors: [] },
]

export const Modes = () => {
  const shouldAnimateLedRing = useSharedValue(true)

  return (
    <>
      <LedRing shouldAnimate={shouldAnimateLedRing} />
      <ModeCarousel modes={modes} />
      <ModeList modes={modes} shouldAnimateLedRing={shouldAnimateLedRing} />
    </>
  )
}
