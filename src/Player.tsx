import { useOptions } from './context/useOptions'
import { Combatant } from './types'

type PlayerProps = {
  combatant: Combatant
}
export function Player({ combatant }: PlayerProps) {
  const { options } = useOptions()

  function getDPS(combatant: Combatant) {
    if (options.dpsType === 'individual' && options.dpsShowDecimals) {
      return combatant.dps
    }
    if (options.dpsType === 'individual' && !options.dpsShowDecimals) {
      return combatant.DPS
    }
    if (options.dpsType === 'encounter' && options.dpsShowDecimals) {
      return combatant.encdps
    }
    if (options.dpsType === 'encounter' && !options.dpsShowDecimals) {
      return combatant.ENCDPS
    }

    // Default
    return combatant.ENCDPS
  }

  return (
    <div>
      <div>{combatant.name}</div>
      <div>DPS: {getDPS(combatant)}</div>
    </div>
  )
}
