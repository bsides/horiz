import React from 'react'
import type { OverlayDataForHoriz } from '../types'
import JSONFakeData from '../utils/fakeData.json'
import {
  getRandom,
  makeFakeData,
  transformCombatDataIntoHorizData,
} from '../utils/general'
import { useOptions } from './useOptions'

export const CombatDataContext =
  React.createContext<OverlayDataForHoriz | null>(null)

export function CombatDataProvider(props: React.PropsWithChildren) {
  const { options } = useOptions()
  const [data, setData] = React.useState<OverlayDataForHoriz | null>(null)

  React.useEffect(() => {
    // Regular conditions, data flowing from ACT's FFXIV + Overlay plugins
    if (!options.isTestData) {
      window.addOverlayListener('CombatData', (data) =>
        setData(transformCombatDataIntoHorizData(data)),
      )
      window.startOverlayEvents()
    }

    // Special condition, used to configure the interface or during development
    // Sends fake data through the application
    if (options.isTestData) {
      window.__HORIZ__.intervalId = handleFakeDataStream(setData)
    }

    // Resets the interval created in the special condition above
    return () => {
      if (window?.__HORIZ__?.intervalId) {
        clearInterval(window.__HORIZ__.intervalId)
      }
    }
  }, [options.isTestData])

  return (
    <CombatDataContext.Provider value={data}>
      {props.children}
    </CombatDataContext.Provider>
  )
}

function handleFakeDataStream(cb: (data: OverlayDataForHoriz) => void) {
  const fakeData = transformCombatDataIntoHorizData(JSONFakeData)
  return setInterval(
    () => {
      cb(makeFakeData(fakeData))
    },
    getRandom(2000, 5000),
  )
}
