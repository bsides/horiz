import type { Combatant, OverlayData, OverlayDataForHoriz } from '../types'
import JSONFakeData from './fakeData.json'

export function getRandom(min: number, max: number): number {
  const first = Math.ceil(min)
  const last = Math.floor(max)
  return Math.floor(Math.random() * (last - first + 1)) + first
}

export function isObjectEmpty(
  obj: Record<string | number | symbol, unknown> | undefined | null,
) {
  if (typeof obj === 'undefined' || obj === null || !obj) {
    return true
  }

  return Object.keys(obj).length === 0 && obj.constructor === Object
}

export function transformCombatDataIntoHorizData(overlayData: OverlayData) {
  const { Combatant, Encounter, isActive } = overlayData
  const combatantsNames = Object.keys(Combatant)
  const combatants = combatantsNames.map(
    (combatantName) => Combatant[combatantName as keyof typeof Combatant],
  ) as unknown as OverlayDataForHoriz['combatants']

  return {
    // For now, we don't need ACT's (really weird, as magic keys' object) format.
    // combatant: Combatant,
    combatants,
    encounter: Encounter,
    isActive,
  } as OverlayDataForHoriz
}

export function randomizeCombatantValues(combatant?: Combatant) {
  if (isObjectEmpty(combatant) || !combatant) {
    return {
      DPS: `${getRandom(2200, 4500)}`,
      ENCDPS: `${getRandom(2200, 4500)}`,
      'damage%': `${getRandom(3, 28)}%`,
      'crithit%': `${getRandom(0, 76)}%`,
      'healed%': `${getRandom(0, 30)}%`,
      ENCHPS: `${getRandom(0, 6000)}`,
      deaths: `${getRandom(0, 3)}`,
    }
  }

  const entries = Object.entries(combatant)
  const newEntries = entries.map(([key, value]) => {
    const valueToNumber = getNumber(value)
    if (valueToNumber) {
      if (valueToNumber >= 1) {
        return [
          key,
          `${getRandom(valueToNumber, valueToNumber + 0.5 * valueToNumber)}`,
        ]
      }
      return [key, `${getRandom(200, 500)}%`]
    }

    return [key, value]
  })

  return Object.fromEntries(newEntries)
}

function getNumber(value: number | string) {
  const valueToNumber = Number(value)
  if (typeof valueToNumber === 'number' && !isNaN(valueToNumber)) {
    return valueToNumber
  }
}

export function makeFakeData(overlayData: OverlayDataForHoriz) {
  const { combatants } = overlayData
  for (const combatantId in combatants) {
    combatants[combatantId] = {
      ...combatants[combatantId],
      ...randomizeCombatantValues(combatants[combatantId]),
    }
  }
  return { ...overlayData, combatants } satisfies OverlayDataForHoriz
}

export function handleFakeDataStream(cb: (data: OverlayDataForHoriz) => void) {
  const fakeData = transformCombatDataIntoHorizData(JSONFakeData)
  return setInterval(
    () => {
      cb(makeFakeData(fakeData))
    },
    getRandom(2000, 5000),
  )
}

// export function wait(delay: number) {
//   return new Promise((resolve) => setTimeout(resolve, delay))
// }

// function convertCombatantValueToNumber(
//   combatantValue: Combatant[keyof Combatant],
// ) {
//   if (getNumber(combatantValue)) {
//     return getNumber(combatantValue)
//   }

//   if (
//     combatantValue.includes('%') ||
//     combatantValue.includes('k') ||
//     combatantValue.includes('m') ||
//     combatantValue.includes('b')
//   ) {
//     const newValue = combatantValue.replace('%', '').replace(/[A-Z]/i, '')
//     if (getNumber(newValue)) {
//       return getNumber(newValue)
//     }
//   }
// }
