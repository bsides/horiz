import React from 'react'
import type { Options } from '../types'

const optionsInitialData: Options = {
  isTestData: true,
}

type OptionsContextType = {
  options: Options
  setOptions: React.Dispatch<React.SetStateAction<Options>>
}
export const OptionsContext = React.createContext<OptionsContextType>({
  options: optionsInitialData,
  setOptions: (value) => value,
})

export function OptionsProvider(props: React.PropsWithChildren) {
  const [options, setOptions] = React.useState(optionsInitialData)

  return <OptionsContext.Provider value={{ options, setOptions }} {...props} />
}
