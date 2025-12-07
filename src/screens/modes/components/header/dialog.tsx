import { Button } from 'merlo-ui'
import type { FC } from 'react'
import { Text } from 'react-native'

import { Modal } from '@components'

interface DialogProps {
  onSubmit: () => void
  onClose: () => void
}

export const Dialog: FC<DialogProps> = ({ onClose, onSubmit }) => {
  return (
    <Modal onClose={onClose}>
      <Text className="mb-4 text-lg text-foreground">
        Are you sure you want to disconnect?
      </Text>
      <Button
        size="lg"
        variant="flat"
        color="default"
        className="mb-2"
        onPress={onClose}
      >
        Cancel
      </Button>
      <Button size="lg" color="danger" onPress={onSubmit}>
        Disconnect
      </Button>
    </Modal>
  )
}
