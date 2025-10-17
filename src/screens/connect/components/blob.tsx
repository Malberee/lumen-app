import {
  BlurMask,
  Canvas,
  LinearGradient,
  Path,
  Skia,
  vec,
} from '@shopify/react-native-skia'
import { Dimensions } from 'react-native'

export const Blob = () => {
  const { width, height } = Dimensions.get('window')

  const path = Skia.Path.MakeFromSVGString(
    'M52.7,-39.4C67.5,-23.5,78.1,-1.6,73.4,16C68.8,33.7,49,47.2,28.3,56.2C7.5,65.2,-14.1,69.8,-31.2,62.4C-48.2,55.1,-60.6,35.9,-67.3,13.5C-73.9,-8.9,-74.7,-34.5,-62.5,-49.8C-50.3,-65.1,-25.1,-70.1,-3.1,-67.6C19,-65.2,37.9,-55.3,52.7,-39.4Z',
  )!
  const bounds = path.getBounds()

  const canvasCenterX = width / 2
  const canvasCenterY = height / 2

  const shapeCenterX = bounds.x + bounds.width / 2
  const shapeCenterY = bounds.y + bounds.height / 2

  const dx = canvasCenterX - shapeCenterX
  const dy = canvasCenterY - shapeCenterY

  const transform = [
    { translateX: dx },
    { translateY: dy },
    { scale: width / Math.max(bounds.width, bounds.height) },
  ]

  const gradient = (
    <LinearGradient
      start={vec(shapeCenterX, shapeCenterX - bounds.height / 2)}
      end={vec(shapeCenterX, shapeCenterX + bounds.height / 2)}
      colors={['#006FEE', '#2EC4FD']}
    />
  )

  return (
    <Canvas style={{ position: 'absolute', height, width }}>
      <Path opacity={0.6} path={path} transform={transform}>
        {gradient}
        <BlurMask blur={70} />
      </Path>
      <Path path={path} transform={transform}>
        {gradient}
      </Path>
    </Canvas>
  )
}
