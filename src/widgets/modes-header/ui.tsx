import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { TogglePower } from '@features/toggle-power'

export const ModesHeader = () => {
  const { top } = useSafeAreaInsets()

  return (
    <View
      className="absolute z-10 w-full flex-row justify-between p-4"
      style={{ top }}
    >
      <TogglePower />
    </View>
  )
}
