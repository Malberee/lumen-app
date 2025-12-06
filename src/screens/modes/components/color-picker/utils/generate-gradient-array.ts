import { colorKit } from 'reanimated-color-picker'

export const generateGradientArray = (
  start: string,
  end: string,
  steps = 6,
) => {
  'worklet'
  const gradient = []

  for (let i = 0; i < steps; i++) {
    const percentage = (i / (steps - 1)) * 100

    const color = colorKit.runOnUI().blend(start, end, percentage)
    gradient.push(color.hex())
  }

  return gradient
}
