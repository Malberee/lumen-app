import { Path } from 'react-native-svg'

import { AnimatedColorSvg } from './animated-color-svg'
import type { IconProps } from './types'

export const PaintBucketIcon = (props: IconProps) => {
  return (
    <AnimatedColorSvg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M18.9998 11L10.9998 3L2.39984 11.6C2.03339 11.9739 1.82813 12.4765 1.82812 13C1.82813 13.5235 2.03339 14.0261 2.39984 14.4L7.59984 19.6C8.39984 20.4 9.59984 20.4 10.3998 19.6L18.9998 11Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M5 2L10 7L5 2Z" fill="currentColor" />
      <Path
        d="M5 2L10 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M2 13H17H2Z" fill="currentColor" />
      <Path
        d="M2 13H17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M22 20C22 20.5304 21.7893 21.0391 21.4142 21.4142C21.0391 21.7893 20.5304 22 20 22C19.4696 22 18.9609 21.7893 18.5858 21.4142C18.2107 21.0391 18 20.5304 18 20C18 18.4 19.7 17.6 20 16C20.3 17.6 22 18.4 22 20Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </AnimatedColorSvg>
  )
}
