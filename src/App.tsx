import { Overlay } from './Overlay'
import { CombatDataProvider } from './context/combatData'
import { OptionsProvider } from './context/options'
import type { OverlayData } from './types'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __HORIZ__: Record<string, any>
    addOverlayListener(type: string, cb: (data: OverlayData) => void): void
    startOverlayEvents(): void
  }
}

export function App() {
  return (
    <OptionsProvider>
      <CombatDataProvider>
        <Overlay />
      </CombatDataProvider>
    </OptionsProvider>
  )
}

export default App
