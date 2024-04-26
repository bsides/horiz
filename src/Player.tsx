import { useSettingsStore } from '~/store/settings'
import { Horiz } from '~/theme/Horiz'
import type { Combatant } from '~/types'

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

  if (settings.theme === 'horiz') {
    return <Horiz combatant={combatant} />
  }

  return (
    <div>
      <div>{combatant.name}</div>
      <div>{getDPS(combatant)}</div>
      <div>
        D / ! / !!! {combatant.DirectHitPct} / {combatant['crithit%']} /{' '}
        {combatant.CritDirectHitPct}
      </div>
    </div>
  )
}
