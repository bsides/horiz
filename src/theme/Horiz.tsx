import { LayoutGroup, motion } from 'framer-motion'
import { useSettingsStore } from '~/store/settings'
import type { Combatant } from '~/types'

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
        className="relative z-10 bg-white px-4 py-2 pr-5 before:absolute before:-z-10 before:-mx-4 before:-my-2 before:block before:h-full before:w-[96%] before:skew-x-[-30deg] before:bg-pink-500 before:content-['']"
      >
        <div className="">{combatant.name}</div>
        <div className="-ml-2">{getDPS(combatant)}</div>
        {/* <div className="">
          D / ! / !!! {combatant.DirectHitPct} / {combatant['crithit%']} /{' '}
          {combatant.CritDirectHitPct}
        </div> */}
      </motion.div>
    </LayoutGroup>
  )
}
