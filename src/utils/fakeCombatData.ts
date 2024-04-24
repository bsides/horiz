import type { Combatant, OverlayDataForHoriz } from '../types'
import { TEST_NAME_OF_COMBATANTS, TEST_NUMBER_OF_COMBATANTS } from './constants'
import JSONFakeData from './fakeData.json'
import {
  convertCombatDataIntoHorizData,
  getNumber,
  getRandom,
  isObjectEmpty,
} from './general'

export function handleFakeDataStream(cb: (data: OverlayDataForHoriz) => void) {
  const fakeData = convertCombatDataIntoHorizData(JSONFakeData)
  return setInterval(
    () => {
      cb(makeFakeData(fakeData))
    },
    getRandom(2000, 5000),
  )
}

export function makeFakeData(overlayData: OverlayDataForHoriz) {
  const { combatants: originalCombatants } = overlayData
  const duplicatedCombatants = dublicateItemsInArray<Combatant>(
    originalCombatants,
    TEST_NUMBER_OF_COMBATANTS,
  )
  const combatants = duplicatedCombatants.map((combatant, index) => {
    // Take a name from constants
    const name = TEST_NAME_OF_COMBATANTS[index]
    return {
      // Old values that will be replaced by the values below
      ...combatant,
      // Randomize values above
      ...randomizeCombatantValues(combatant),
      // Change the name
      name,
    }
  })

  return {
    ...overlayData,
    combatants,
  } satisfies OverlayDataForHoriz
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
    // if (key.toLowerCase() === 'dps' || key.toLowerCase() === 'encdps') {
    //   console.log({ key, valueToNumber })
    // }
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

function dublicateItemsInArray<T>(arr: T[], numberOfRepetitions: number) {
  return arr.flatMap((item) =>
    Array.from({ length: numberOfRepetitions }).fill(item),
  ) as T[]
}
