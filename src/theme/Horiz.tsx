import { LayoutGroup, motion } from 'framer-motion'
import { useSettingsStore } from '../store/settings'
import { Combatant } from '../types'

type HorizProps = {
  combatant: Combatant
}
export function Horiz({ combatant }: HorizProps) {
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
    <LayoutGroup id={combatant.name}>
      <motion.div
        key={combatant.name}
        layout={!settings.prefersReducedMotion}
        className="combatant"
      >
        <div className="">{combatant.name}</div>
        <div className="">{getDPS(combatant)}</div>
        <div className="">
          D / ! / !!! {combatant.DirectHitPct} / {combatant['crithit%']} /{' '}
          {combatant.CritDirectHitPct}
        </div>
      </motion.div>
    </LayoutGroup>
  )
}
