import { Button, CloseIcon } from '@malberee/heroui-native'

export const BackButton = () => (
  <Button
    isIconOnly
    size="sm"
    color="default"
    variant="light"
    startContent={<CloseIcon className="text-foreground" width={20} />}
    onPress={() => history.back()}
  />
)
