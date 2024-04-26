import { Player } from '~/Player'
import { useCombatData } from '~/context/useCombatData'

export function Overlay() {
  const data = useCombatData()

  if (data) {
    return (
      <div className="flex justify-center gap-4 bg-[--overlay-color-background] text-center">
        {data?.combatants.map((combatant) => {
          return <Player key={combatant.name} combatant={combatant} />
        })}
      </div>
    )
  }

  return (
    <div className="text-center">
      <header className="bg-white">
        <p>H O R I Z</p>
        <p>Awaiting for combat data...</p>
      </header>
    </div>
  )
}
