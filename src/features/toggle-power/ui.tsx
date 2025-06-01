import { Switch } from '@malberee/heroui-native'

import { useModesStore } from '@entities/mode'

export const TogglePower = () => {
  const onValueChange = useModesStore((state) => state.setPower)

  return (
    <Switch
      size="md"
      onValueChange={onValueChange}
      defaultSelected
      aria-label="Toggle power"
    />
  )
}
