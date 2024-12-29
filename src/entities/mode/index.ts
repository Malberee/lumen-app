type Param = 'speed' | 'length'

export type ColorType = 'primary' | 'secondary'

export type ModeType = {
  name: string
  params: Param[]
  colors: ColorType[]
}
