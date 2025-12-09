import { Button } from 'merlo-ui'

import { PaletteIcon } from '../icons'
import { useColorPicker } from './hooks'

export const Trigger = () => {
  const { open } = useColorPicker()

  return (
    <Button
      size="lg"
      startContent={
        <PaletteIcon
          height={20}
          width={20}
          className="text-primary-foreground"
        />
      }
      onPress={open}
    >
      Change colors
    </Button>
  )
}
