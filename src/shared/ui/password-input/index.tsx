import { Input, type InputProps } from '@malberee/nextui-native'
import { type FC, useState } from 'react'
import { Pressable } from 'react-native'

import { ClosedEyeIcon } from './closed-eye-icon'
import { KeyIcon } from './key-icon'
import { OpenEyeIcon } from './open-eye-icon'

export const PasswordInput: FC<InputProps> = ({ isInvalid, ...props }) => {
  const [showPassword, setShowPassword] = useState(false)

  const textColor = isInvalid ? 'text-danger' : 'text-foreground-400'

  return (
    <Input
      size="lg"
      label="Password"
      placeholder="Enter password"
      secureTextEntry={!showPassword}
      classNames={{ clearButton: 'opacity-70' }}
      isInvalid={isInvalid}
      startContent={<KeyIcon className={textColor} width={20} height={20} />}
      endContent={
        <Pressable
          className="opacity-70 transition-opacity active:opacity-100"
          onPress={() => setShowPassword((prevState) => !prevState)}
        >
          {showPassword ? (
            <OpenEyeIcon className={textColor} width={20} height={20} />
          ) : (
            <ClosedEyeIcon className={textColor} width={20} height={20} />
          )}
        </Pressable>
      }
      {...props}
    />
  )
}
