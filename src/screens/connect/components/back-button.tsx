import { router } from 'expo-router'
import { Button, CloseIcon } from 'merlo-ui'

export const BackButton = () => (
  <Button
    isIconOnly
    size="sm"
    color="default"
    variant="light"
    startContent={<CloseIcon className="text-foreground" width={20} />}
    onPress={() => router.back()}
  />
)
