import type { OverlayData, OverlayDataForHoriz } from '../types'

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

export function getNumber(value: number | string) {
  const valueToNumber = Number(value)
  if (typeof valueToNumber === 'number' && !isNaN(valueToNumber)) {
    return valueToNumber
  }
}

export function convertCombatDataIntoHorizData(overlayData: OverlayData) {
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
