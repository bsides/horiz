import React from 'react'
import { useCombatData } from './context/useCombatData'

export function Overlay() {
  const data = useCombatData()

  return (
    <div>
      {data?.combatants.map((combatant) => (
        <React.Fragment key={combatant.name}>
          <div>{combatant.name}</div>
          <div>DPS: {combatant.ENCDPS}</div>
        </React.Fragment>
      ))}
    </div>
  )
}
