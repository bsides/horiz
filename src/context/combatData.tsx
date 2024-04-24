import React from 'react'
import { useSettingsStore } from '../store/settings'
import type { OverlayData, OverlayDataForHoriz } from '../types'
import { handleFakeDataStream } from '../utils/fakeCombatData'
import { convertCombatDataIntoHorizData } from '../utils/general'

export const CombatDataContext =
  React.createContext<OverlayDataForHoriz | null>(null)

export function CombatDataProvider(props: React.PropsWithChildren) {
  const settings = useSettingsStore()
  const [data, setData] = React.useState<OverlayDataForHoriz | null>(null)

  const handleCombatData = (data: OverlayData) => {
    if (data.isActive === 'true') {
      const convertedData = convertCombatDataIntoHorizData(data)
      setData(convertedData)
    }
  }

  React.useEffect(() => {
    // Regular conditions, data flowing from ACT's FFXIV + Overlay plugins
    if (!settings.isTestData) {
      window.addOverlayListener('CombatData', handleCombatData)
      window.startOverlayEvents()
    }

    // Special condition, used to configure the interface or during development
    // Sends fake data through the application
    if (settings.isTestData) {
      window.__HORIZ__.intervalId = handleFakeDataStream(setData)
    }

    // Resets the interval created in the special condition above
    return () => {
      if (window?.__HORIZ__?.intervalId) {
        clearInterval(window.__HORIZ__.intervalId)
      }
    }
  }, [settings.isTestData])

  return (
    <CombatDataContext.Provider value={data}>
      {props.children}
    </CombatDataContext.Provider>
  )
}
