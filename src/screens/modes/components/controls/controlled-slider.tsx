import { Slider, type SliderProps } from 'merlo-ui'
import { type FC, useEffect, useState } from 'react'

export const ControlledSlider: FC<SliderProps> = ({
  defaultValue,
  ...props
}) => {
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  return <Slider value={value} onChange={setValue} {...props} />
}
