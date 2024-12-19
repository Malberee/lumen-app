import { cssInterop } from 'nativewind'
import Svg, {
  Defs,
  FeGaussianBlur,
  Filter,
  G,
  LinearGradient,
  Path,
  Stop,
} from 'react-native-svg'

cssInterop(Svg, { className: 'style' })

export const Blob = () => {
  return (
    <Svg className="absolute size-[130%]" viewBox="0 0 200 200">
      <Defs>
        <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
          <Stop stopColor="#a931ff" />
          <Stop offset="100%" stopColor="#2ec4fd" />
        </LinearGradient>
        <Filter id="blur" width="100" height="100">
          <FeGaussianBlur stdDeviation="20" result="blur" />
          <FeGaussianBlur stdDeviation="20" result="blur" />
          <FeGaussianBlur stdDeviation="20" result="blur" />
          <FeGaussianBlur stdDeviation="20" result="blur" />
          <FeGaussianBlur stdDeviation="20" result="blur" />
        </Filter>
      </Defs>
      <G transform="translate(100 100)">
        <Path
          fill="url(#gradient)"
          d="M52.7,-39.4C67.5,-23.5,78.1,-1.6,73.4,16C68.8,33.7,49,47.2,28.3,56.2C7.5,65.2,-14.1,69.8,-31.2,62.4C-48.2,55.1,-60.6,35.9,-67.3,13.5C-73.9,-8.9,-74.7,-34.5,-62.5,-49.8C-50.3,-65.1,-25.1,-70.1,-3.1,-67.6C19,-65.2,37.9,-55.3,52.7,-39.4Z"
        />
        <Path
          fill="url(#gradient)"
          filter="url(#blur)"
          opacity="0.8"
          d="M52.7,-39.4C67.5,-23.5,78.1,-1.6,73.4,16C68.8,33.7,49,47.2,28.3,56.2C7.5,65.2,-14.1,69.8,-31.2,62.4C-48.2,55.1,-60.6,35.9,-67.3,13.5C-73.9,-8.9,-74.7,-34.5,-62.5,-49.8C-50.3,-65.1,-25.1,-70.1,-3.1,-67.6C19,-65.2,37.9,-55.3,52.7,-39.4Z"
        />
      </G>
    </Svg>
  )
}
