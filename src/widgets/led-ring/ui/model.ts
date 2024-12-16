import { useEffect } from 'react'
import { useSharedValue } from 'react-native-reanimated'

const offset = (arr: string[]) => [...arr.slice(-1), ...arr.slice(0, -1)]

export const useLedRing = (ledsCount: number) => {
  const leds = Array(ledsCount).fill('#18c965', 0, 3).fill('#ff4ecd', 3)
  const colors = useSharedValue<string[]>(leds)

  useEffect(() => {
    const interval = setInterval(() => {
      colors.value = offset(colors.value)
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return { leds, colors }
}
