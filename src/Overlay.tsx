import { Player } from '~/Player'
import { useCombatData } from '~/context/useCombatData'

export function Overlay() {
  const data = useCombatData()

  if (data) {
    return (
      <div className="flex gap-4 justify-center text-center bg-[--overlay-color-background]">
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
