import { Button, type ButtonProps, Minus, Plus } from 'merlo-ui'
import { memo, useRef, useState } from 'react'
import { Text, View } from 'react-native'

import { MIN_LEDS } from '@constants'

interface NumberPickerProps {
  onValueChange: (value: number) => void
}

type Direction = 1 | -1

const INITIAL_DELAY = 400

const SPEED_STAGES = [
  { duration: 0, interval: 200 },
  { duration: 1500, interval: 100 },
]

export const NumberPicker = memo<NumberPickerProps>(({ onValueChange }) => {
  const [value, setValue] = useState(MIN_LEDS)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const valueRef = useRef(value)

  const clearTimer = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  const changeValue = (direction: 1 | -1) => {
    const nextValue = Math.max(MIN_LEDS, valueRef.current + direction)

    valueRef.current = nextValue
    setValue(nextValue)
  }

  const stopChanging = () => {
    clearTimer()
    startTimeRef.current = null
    onValueChange(valueRef.current)
  }

  const getInterval = () => {
    const elapsed = Date.now() - (startTimeRef.current ?? Date.now())

    return (
      [...SPEED_STAGES].reverse().find(({ duration }) => elapsed >= duration)
        ?.interval ?? 150
    )
  }

  const scheduleChange = (direction: Direction) => {
    changeValue(direction)

    timeoutRef.current = setTimeout(() => {
      scheduleChange(direction)
    }, getInterval())
  }

  const startChanging = (direction: Direction) => {
    clearTimer()

    startTimeRef.current = Date.now()
    changeValue(direction)

    timeoutRef.current = setTimeout(() => {
      scheduleChange(direction)
    }, INITIAL_DELAY)
  }

  const buttonProps: ButtonProps = {
    variant: 'flat',
    color: 'default',
    size: 'lg',
    className: 'size-14',
    isIconOnly: true,
  }

  return (
    <View className="flex-row gap-4">
      <Button
        {...buttonProps}
        onPressIn={() => startChanging(-1)}
        onPressOut={stopChanging}
        startContent={<Minus className="text-foreground" />}
      />

      <View>
        <Text className="text-center text-6xl font-bold text-foreground">
          {value}
        </Text>
        <Text className="text-center text-large text-foreground">LEDs</Text>
      </View>

      <Button
        {...buttonProps}
        onPressIn={() => startChanging(1)}
        onPressOut={stopChanging}
        startContent={<Plus className="text-foreground" />}
      />
    </View>
  )
})
