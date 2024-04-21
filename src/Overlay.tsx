import { useCombatData } from './context/useCombatData'

export function Overlay() {
  const data = useCombatData()

  console.log({ data })

  return <div>DPS: {data?.combatants[0].ENCDPS}</div>
}
