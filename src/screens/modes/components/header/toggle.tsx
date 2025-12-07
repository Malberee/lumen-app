import { Button } from 'merlo-ui'
import { type FC, useEffect, useState } from 'react'

import { PowerIcon } from '../icons'

interface ToggleProps {
  value?: boolean
  onValueChange?: (value: boolean) => void
}

export const Toggle: FC<ToggleProps> = ({ value, onValueChange }) => {
  const [isSelected, setIsSelected] = useState(value)

  useEffect(() => {
    setIsSelected(value)
  }, [value])

  return (
    <Button
      color={isSelected ? 'primary' : 'default'}
      variant={isSelected ? 'solid' : 'flat'}
      size="lg"
      isIconOnly
      className="transition-colors"
      startContent={
        <PowerIcon className="text-default-foreground" width={20} height={20} />
      }
      onPress={() => {
        setIsSelected(!isSelected)
        onValueChange?.(!isSelected)
      }}
      aria-label="Toggle power"
      aria-checked={isSelected}
      aria-selected={isSelected}
      role="switch"
    />
  )
}
