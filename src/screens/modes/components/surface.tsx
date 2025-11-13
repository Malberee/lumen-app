import { cn } from 'merlo-ui'
import type { FC, PropsWithChildren } from 'react'
import { View } from 'react-native'

interface SurfaceProps extends PropsWithChildren {
  className?: string
}

export const Surface: FC<SurfaceProps> = ({ children, className }) => {
  return (
    <View
      className={cn(
        'rounded-xl border border-default-100 bg-surface p-4',
        className,
      )}
    >
      {children}
    </View>
  )
}
