import type { CombatDataType, CombatantType } from '$/utils/types'

export function getRandom(min: number, max: number): number {
  const first = Math.ceil(min)
  const last = Math.floor(max)
  return Math.floor(Math.random() * (last - first + 1)) + first
}

export function getNewRandom() {
  return {
    ENCDPS: `${getRandom(2200, 4500)}`,
    'damage%': `${getRandom(3, 28)}%`,
    'crithit%': `${getRandom(0, 76)}%`,
    'healed%': `${getRandom(0, 30)}%`,
    ENCHPS: `${getRandom(0, 6000)}`,
    deaths: `${getRandom(0, 3)}`,
  }
}

export function makeFakeData(ActXivData) {
  console.log(ActXivData)
  const combatant = ActXivData.Combatant
  for (const i in combatant) {
    combatant[i] = { ...combatant[i], ...getNewRandom() }
  }
  ActXivData.Combatant = combatant
}

export const fakeDataTimer = (ActXivData: Partial<CombatDataType>) => {
  setInterval(function () {
    const combatant = ActXivData.Combatant
    for (const i in combatant) {
      combatant[i] = { ...combatant[i], ...getNewRandom() }
    }
    ActXivData.Combatant = combatant
  }, 2000)
}

export function toBoolean(value: string): boolean {
  return /true/i.test(value)
}
