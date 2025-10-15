import { UDP } from '@services'
import { useModesStore } from '@store'
import { objToString } from '@utils'

import { flatObject } from './utils'

let skipNext = false

export const subscribeStore = () => {
  const unsubCurrentMode = useModesStore.subscribe(
    ({ currentMode }) => currentMode.name,
    () => {
      skipNext = true

      const currentMode = useModesStore.getState().currentMode
      const data = objToString(
        flatObject({
          ...currentMode,
          name: currentMode.name.replace(' ', '-'),
        }),
      )
        .replace('primary', 'pri')
        .replace('secondary', 'sec')

      UDP.sendMessage(`MODE ${data}`)

      setTimeout(() => {
        skipNext = false
      }, 0)
    },
  )

  const unsubColors = useModesStore.subscribe(
    ({ currentMode }) => currentMode.colors,
    (colors) => {
      if (skipNext) return

      const data = objToString(colors)
        .replace('primary', 'pri')
        .replace('secondary', 'sec')

      UDP.sendMessage(`MODE ${data}`)
    },
  )

  const unsubSpeed = useModesStore.subscribe(
    ({ currentMode }) => currentMode.speed,
    (speed) => {
      if (skipNext) return

      UDP.sendMessage(`MODE spd=${speed}`)
    },
  )

  const unsubLength = useModesStore.subscribe(
    ({ currentMode }) => currentMode.length,
    (length) => {
      if (skipNext) return

      UDP.sendMessage(`MODE lgt=${length}`)
    },
  )

  const unsubPower = useModesStore.subscribe(
    (state) => state.power,
    (power) => {
      if (skipNext) return

      UDP.sendMessage(power ? 'P_ON' : 'P_OFF')
    },
  )

  return () => {
    unsubCurrentMode()
    unsubColors()
    unsubSpeed()
    unsubLength()
    unsubPower()
  }
}
