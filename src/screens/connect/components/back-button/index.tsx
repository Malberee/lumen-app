import { router } from 'expo-router'
import { Button, CloseIcon } from 'merlo-ui'
import type { FC } from 'react'

import { chain } from './utils'

interface BackButtonProps {
  onPress?: () => void
}

export const BackButton: FC<BackButtonProps> = ({ onPress }) => {
  return (
    <Button
      isIconOnly
      size="sm"
      color="default"
      variant="light"
      startContent={<CloseIcon className="text-foreground" width={20} />}
      onPress={chain(() => router.navigate('/'), onPress)}
    />
  )
}
