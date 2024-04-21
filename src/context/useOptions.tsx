import React from 'react'
import { OptionsContext } from './options'

export const useOptions = () => {
  return React.useContext(OptionsContext)
}
