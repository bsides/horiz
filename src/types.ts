export type GenericObject = { [key: string]: any }
export type GenericFunction = (data: GenericObject) => void

export type NewWindow = Window &
  typeof globalThis & {
    addOverlayListener: (context: string, fn: GenericFunction) => void
    startOverlayEvents: () => void
  }

export type LocaleType = {
  initial: {
    help: string
  }
  config: {
    setupTitle: string
    nameTitle: string
    nameHelp: string
    themeTitle: string
    themeOption1: string
    themeOption2: string
    toggleTitle: string
    toggleOption1: string
    toggleOption2: string
    toggleOption3: string
    toggleOption4: string
    toggleOption5: string
    toggleOption6: string
    toggleOption7: string
    toggleOption8: string
    toggleOption9: string
    toggleOption10: string
    toggleOption11: string
    toggleOption12: string
    toggleOption13: string
    maxCombatantsTitle: string
    zoomTitle: string
    zoomOption1: string
    zoomOption2: string
    zoomOption3: string
    zoomOption4: string
    zoomOption5: string
    zoomOption6: string
    resetTitle: string
    discordTitle: string
    discordHelp: string
    localeTitle: string
    localeOption1: string
    localeOption1Value: string
    localeOption2: string
    localeOption2Value: string
    localeOption3: string
    localeOption3Value: string
    localeOption4: string
    localeOption4Value: string
    localeOption5: string
    localeOption5Value: string
    localeOption6: string
    localeOption6Value: string
    help: string
  }
  setupMode: {
    instructionsTitle: string
    instructions: string
  }
}

export type CombatWindow = Window &
  typeof globalThis & {
    addOverlayListener: (
      context: 'CombatData',
      fn: (data: CombatDataType) => void
    ) => void
    startOverlayEvents: () => void
    data: CombatDataType[] | unknown[]
  }

export type EncounterType = {
  CurrentZoneName: string
  'DAMAGE-*': string
  'DAMAGE-b': string
  'DAMAGE-k': string
  'DAMAGE-m': string
  DPS: string
  'DPS-*': string
  'DPS-k': string
  'DPS-m': string
  DURATION: string
  ENCDPS: string
  'ENCDPS-*': string
  'ENCDPS-k': string
  'ENCDPS-m': string
  ENCHPS: string
  'ENCHPS-*': string
  'ENCHPS-k': string
  'ENCHPS-m': string
  Last10DPS: string
  Last30DPS: string
  Last60DPS: string
  MAXHEAL: string
  'MAXHEAL-*': string
  MAXHEALWARD: string
  'MAXHEALWARD-*': string
  MAXHIT: string
  'MAXHIT-*': string
  TOHIT: string
  'critheal%': string
  critheals: string
  'crithit%': string
  crithits: string
  cures: string
  damage: string
  'damage-*': string
  'damage-m': string
  damagetaken: string
  'damagetaken-*': string
  deaths: string
  dps: string
  'dps-*': string
  duration: string
  encdps: string
  'encdps-*': string
  enchps: string
  'enchps-*': string
  healed: string
  heals: string
  healstaken: string
  'healstaken-*': string
  hitfailed: string
  hits: string
  kills: string
  maxheal: string
  'maxheal-*': string
  maxhealward: string
  'maxhealward-*': string
  maxhit: string
  'maxhit-*': string
  misses: string
  n: string
  powerdrain: string
  'powerdrain-*': string
  powerheal: string
  'powerheal-*': string
  swings: string
  t: string
  title: string
  tohit: string
}

export type CombatantType = {
  BlockPct: string
  CritDirectHitCount: string
  CritDirectHitPct: string
  'DAMAGE-*': string
  'DAMAGE-b': string
  'DAMAGE-k': string
  'DAMAGE-m': string
  DPS: string
  'DPS-*': string
  'DPS-k': string
  'DPS-m': string
  DURATION: string
  DirectHitCount: string
  DirectHitPct: string
  ENCDPS: string
  'ENCDPS-*': string
  'ENCDPS-k': string
  'ENCDPS-m': string
  ENCHPS: string
  'ENCHPS-*': string
  'ENCHPS-k': string
  'ENCHPS-m': string
  IncToHit: string
  Job: string
  Last10DPS: string
  Last30DPS: string
  Last60DPS: string
  MAXHEAL: string
  'MAXHEAL-*': string
  MAXHEALWARD: string
  'MAXHEALWARD-*': string
  MAXHIT: string
  'MAXHIT-*': string
  OverHealPct: string
  ParryPct: string
  TOHIT: string
  absorbHeal: string
  'critheal%': string
  critheals: string
  'crithit%': string
  crithits: string
  crittypes: string
  cures: string
  damage: string
  'damage%': string
  'damage-*': string
  'damage-b': string
  'damage-m': string
  damageShield: string
  damagetaken: string
  'damagetaken-*': string
  deaths: string
  dps: string
  'dps-*': string
  duration: string
  encdps: string
  'encdps-*': string
  enchps: string
  'enchps-*': string
  healed: string
  'healed%': string
  heals: string
  healstaken: string
  'healstaken-*': string
  hitfailed: string
  hits: string
  kills: string
  maxheal: string
  'maxheal-*': string
  maxhealward: string
  'maxhealward-*': string
  maxhit: string
  'maxhit-*': string
  misses: string
  n: string
  name: string
  overHeal: string
  powerdrain: string
  'powerdrain-*': string
  powerheal: string
  'powerheal-*': string
  swings: string
  t: string
  threatdelta: string
  threatstr: string
  tohit: string
}

export type CombatDataType = {
  Encounter: EncounterType
  Combatant: {
    [key: string]: CombatantType
  }
  isActive: boolean
  type: 'CombatData'
}
