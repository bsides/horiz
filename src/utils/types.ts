export type GenericObjectType = { [key: string]: any }
export type GenericCallbackType = (arg?: any) => void
export type GenericFunctionType = (data: GenericObjectType) => void

export type NewWindow = Window &
  typeof globalThis & {
    addOverlayListener: (context: string, fn: GenericFunctionType) => void
    startOverlayEvents: () => void
  }

export type CombatWindowType = Window &
  typeof globalThis & {
    addOverlayListener: (context: 'CombatData', fn: (data: CombatDataType) => void) => void
    startOverlayEvents: () => void
    data: CombatDataType | unknown
  }

type OverlayPluginApiType = {
  broadcastMessage: (msg: string) => void
  sendMessage: (target: string, msg: string) => void
  overlayMessage: (target: string, msg: string) => void
  endEncounter: () => void
  makeScreenshot: () => void
  setAcceptFocus: (accept: boolean) => void
  callHandler: (data: string, callback: GenericObjectType) => void
  ready?: boolean
}

export type OverlayWindowType = Window &
  typeof globalThis & {
    dispatchOverlayEvent: (msg: CombatDataType | MessageEventOverlayType<CombatDataType>) => void
    addOverlayListener: (event: string, cb: GenericCallbackType) => void
    removeOverlayListener: (event: string, cb: GenericCallbackType) => void
    callOverlayHandler: (msg: CombatDataType | MessageEventOverlayType<CombatDataType>) => void
    startOverlayEvents: () => void
    OverlayPluginApi: OverlayPluginApiType
    __OverlayCallback: any
  }

export interface MessageEventOverlayType<T = any> extends MessageEvent {
  rseq?: number | null
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
  isActive: boolean | string
  type: string | 'CombatData'
}

type DiscipleType = 'dow' | 'dol' | 'doh'
type RoleType = 'tank' | 'healer' | 'dps' | 'crafting' | 'gathering' | 'special' | 'pet'
type ShortCraftingRoleType = 'alc' | 'arm' | 'bsm' | 'crp' | 'cul' | 'gsm' | 'ltw' | 'wvr'
type ShortGatheringRoleType = 'bot' | 'fsh' | 'min'
type ShortTankRoleType = 'drk' | 'gla' | 'mrd' | 'pld' | 'war' | 'titan' | 'gnb'
type ShortHealerRoleType = 'ast' | 'cnj' | 'sag' | 'sch' | 'whm' | 'eos' | 'selene'
type ShortDpsRoleType =
  | 'acn'
  | 'arc'
  | 'blm'
  | 'brd'
  | 'dnc'
  | 'drg'
  | 'lnc'
  | 'mch'
  | 'mnk'
  | 'nin'
  | 'pgl'
  | 'pug'
  | 'rea'
  | 'rdm'
  | 'rog'
  | 'sam'
  | 'smn'
  | 'thm'
  | 'carbuncle'
  | 'garuda'
  | 'ifrit'
  | 'rook'
  | 'bishop'
  | 'chocobo'
  | 'lb'

export type JobsType = {
  full: string
  name: string
  role: RoleType
  short?:
    | ShortTankRoleType
    | ShortHealerRoleType
    | ShortDpsRoleType
    | ShortCraftingRoleType
    | ShortGatheringRoleType
  disciple?: DiscipleType
}

export type ConfigType = {
  theme: string
  showSetup: boolean
  toggleTestNumbers: boolean
  color?: 'byRole'
  characterName?: string
  showRank?: boolean
  showJobIcon?: boolean
  showHps?: boolean
  showHighlight?: boolean
  showSelf?: boolean
  showMaxhit?: boolean
  showDuration?: boolean
  showTotalDps?: boolean
  showDamagePercent?: boolean
  showDiscord?: boolean
  showLocale?: boolean
  showJobless?: boolean
  zoom?: string
  discord?: string
  maxCombatants?: number
  locale?: 'enUS' | 'esES' | 'frFR' | 'ptBR' | 'zhCN' | 'zhHK'
  configWindow?: {
    width?: number
    height?: number
  }
  colorHealer?: string
  colorTank?: string
  colorDps?: string
}
