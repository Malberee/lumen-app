import { EyeFilledIcon, Input, type InputProps } from 'merlo-ui'
import { type FC, useState } from 'react'
import { Pressable } from 'react-native'

import { ClosedEyeIcon } from './closed-eye-icon'
import { KeyIcon } from './key-icon'

export const PasswordInput: FC<InputProps> = ({ isInvalid, ...props }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Input
      secureTextEntry={!showPassword}
      classNames={{ clearButton: 'opacity-70' }}
      isInvalid={isInvalid}
      startContent={
        <KeyIcon className="text-foreground-400" width={20} height={20} />
      }
      endContent={
        <Pressable
          className="opacity-70 transition-opacity active:opacity-100"
          onPress={() => setShowPassword((prevState) => !prevState)}
        >
          {showPassword ? (
            <EyeFilledIcon
              className="text-foreground-400"
              width={20}
              height={20}
            />
          ) : (
            <ClosedEyeIcon
              className="text-foreground-400"
              width={20}
              height={20}
            />
          )}
        </Pressable>
      }
      {...props}
    />
  )
}
