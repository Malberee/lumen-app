import Svg, { Path, type SvgProps } from 'react-native-svg'

export const ConstrastIcon = (props: SvgProps) => {
  return (
    <Svg width="12" height="12" viewBox="0 0 12 12" fill="none" {...props}>
      <Path
        d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 9C6.79565 9 7.55871 8.68393 8.12132 8.12132C8.68393 7.55871 9 6.79565 9 6C9 5.20435 8.68393 4.44129 8.12132 3.87868C7.55871 3.31607 6.79565 3 6 3V9Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
