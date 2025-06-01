import { Button, CloseIcon } from '@malberee/heroui-native'
import { Link } from 'expo-router'
import { useState } from 'react'

import { ConnectionPanel } from '@shared/ui'

import { Form } from './form'
import { SuccessOverlay } from './success-overlay'

export const ConnectDeviceToAP = () => {
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false)

  return (
    <ConnectionPanel
      title="Connect device to access point"
      endContent={
        <Link href="../" asChild>
          <Button
            isIconOnly
            size="sm"
            color="default"
            variant="light"
            startContent={<CloseIcon className="text-foreground" width={20} />}
          />
        </Link>
      }
    >
      <Form onSuccess={() => setShowSuccessOverlay(true)} />
      {showSuccessOverlay ? <SuccessOverlay /> : null}
    </ConnectionPanel>
  )
}
