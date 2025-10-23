import { useEffect } from 'react'

import { UDP } from '@services'
import { useStore } from '@store'
import { objToString } from '@utils'

import { flatObject } from './utils'

let skipNext = false

export const useUdpSync = () => {
  useEffect(() => {
    const unsubCurrentMode = useStore.subscribe(
      ({ currentMode }) => currentMode.name,
      () => {
        skipNext = true

        const currentMode = useStore.getState().currentMode
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

    const unsubColors = useStore.subscribe(
      ({ currentMode }) => currentMode.colors,
      (colors) => {
        if (skipNext) return

        const data = objToString(colors)
          .replace('primary', 'pri')
          .replace('secondary', 'sec')

        UDP.sendMessage(`MODE ${data}`)
      },
    )

    const unsubSpeed = useStore.subscribe(
      ({ currentMode }) => currentMode.speed,
      (speed) => {
        if (skipNext) return

        UDP.sendMessage(`MODE spd=${speed}`)
      },
    )

    const unsubLength = useStore.subscribe(
      ({ currentMode }) => currentMode.length,
      (length) => {
        if (skipNext) return

        UDP.sendMessage(`MODE lgt=${length}`)
      },
    )

    const unsubPower = useStore.subscribe(
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
      UDP.close()
    }
  }, [])
}
