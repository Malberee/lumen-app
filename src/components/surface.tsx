import { cn } from 'merlo-ui'
import type { ComponentProps, ElementType, ReactNode } from 'react'
import { View } from 'react-native'

type AsProp<T extends ElementType> = {
  as?: T
  children?: ReactNode
}

type PolymorphicProps<T extends ElementType> = AsProp<T> &
  Omit<ComponentProps<T>, keyof AsProp<T>>

export const Surface = <T extends ElementType = typeof View>({
  children,
  className,
  as,
  ...props
}: PolymorphicProps<T>) => {
  const Component = as ?? View

  return (
    <Component
      {...props}
      className={cn(
        'rounded-xl border border-default-100 bg-surface p-4',
        className,
      )}
    >
      {children}
    </Component>
  )
}
