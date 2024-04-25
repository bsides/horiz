import { useSettingsStore } from './store/settings'
import { Combatant } from './types'

type PlayerProps = {
  combatant: Combatant
}
export function Player({ combatant }: PlayerProps) {
  const settings = useSettingsStore()

  function getDPS(combatant: Combatant) {
    if (settings.dpsType === 'individual' && settings.dpsShowDecimals) {
      return combatant.dps
    }
    if (settings.dpsType === 'individual' && !settings.dpsShowDecimals) {
      return combatant.DPS
    }
    if (settings.dpsType === 'encounter' && settings.dpsShowDecimals) {
      return combatant.encdps
    }
    if (settings.dpsType === 'encounter' && !settings.dpsShowDecimals) {
      return combatant.ENCDPS
    }

    // Default
    return combatant.ENCDPS
  }

  return (
    <div>
      <div>{combatant.name}</div>
      <div>{getDPS(combatant)}</div>
      <div>! {combatant.DirectHitPct}</div>
      <div>!! {combatant['crithit%']}</div>
      <div>!!! {combatant.CritDirectHitPct}</div>
    </div>
  )
}
