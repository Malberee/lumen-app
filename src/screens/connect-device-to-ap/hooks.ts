import { useReducer } from 'react'

export type Fields = {
  ssid: string
  password: string
}

type State = {
  values: Fields
  errors: Fields
}

export type Action = {
  field: keyof Fields
  value?: string
  error?: string
}

const reducer = (state: State, action: Action): State => {
  return {
    ...state,
    values: {
      ...state.values,
      [action.field]: action.value ?? state.values[action.field],
    },
    errors: {
      ...state.errors,
      [action.field]: action.error ?? state.errors[action.field],
    },
  }
}

export const useForm = () => {
  const [state, dispatch] = useReducer(reducer, {
    values: { ssid: '', password: '' },
    errors: { ssid: '', password: '' },
  })

  const resetErrors = () => {
    Object.keys(state.errors).forEach((field) => {
      dispatch({ field: field as keyof Fields, error: '' })
    })
  }

  return { state, dispatch, resetErrors }
}
