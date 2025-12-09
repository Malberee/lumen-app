import { Path } from 'react-native-svg'

import { AnimatedColorSvg } from './animated-color-svg'
import type { IconProps } from './types'

export const SnakeIcon = (props: IconProps) => {
  return (
    <AnimatedColorSvg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M6.99986 3.49998C11.9999 1.49998 13.9999 5.99998 9.99986 7.49998C1.49986 9.99998 1.99986 15 4.99986 16C9.99986 18 13.9999 5.99998 18.9999 8.99998C23.9999 12 19.4999 22.5 14.9999 21C9.99986 18.5 15.4999 9.99998 20.9999 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </AnimatedColorSvg>
  )
}
