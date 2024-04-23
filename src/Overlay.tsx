import { Player } from './Player'
import { useCombatData } from './context/useCombatData'

export function Overlay() {
  const data = useCombatData()

  if (data) {
    return (
      <div className="overlay">
        {data?.combatants.map((combatant) => {
          return (
            <Player
              key={combatant.name + combatant.deaths + combatant.DPS}
              combatant={combatant}
            />
          )
        })}
      </div>
    )
  }

  return (
    <div className="nodata">
      <div className="header">
        <p>H O R I Z</p>
        <p>Awaiting for combat data...</p>
      </div>
    </div>
  )
}
