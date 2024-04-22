import { useCombatData } from './context/useCombatData'

export function Overlay() {
  const data = useCombatData()

  if (data) {
    return (
      <div className="overlay">
        {data?.combatants.map((combatant) => (
          <div key={combatant.name + combatant.deaths + combatant.DPS}>
            <div>{combatant.name}</div>
            <div>DPS: {combatant.ENCDPS}</div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="nodata">
      <header>
        <p>H O R I Z</p>
        <p>Awaiting for combat data...</p>
      </header>
    </div>
  )
}
