import { useCombatData } from '~/context/useCombatData'
import { Horiz } from '~/theme/Horiz'

export function Overlay() {
  const data = useCombatData()

  if (data) {
    return (
      <div className="overlay">
        {data?.combatants.map((combatant) => {
          return <Horiz key={combatant.name} combatant={combatant} />
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
