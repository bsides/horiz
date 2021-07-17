import { Writable, writable } from 'svelte/store'
import { toBoolean } from '$/utils/helper'
import type { ConfigType } from '$/utils/types'

const initialConfig: ConfigType = {
  // Toggle test characters with numbers so user can setup his interface properly
  showSetup: true,
  // Toggle random numbers to simulate battle mode
  toggleTestNumbers: true,
  // Choices: ['byRole']
  // byRole: Color units by their roles, either Healers, Tanks, Physical Ranged DPS, Magical Ranged DPS, Melee DPS
  color: 'byRole',
  // The name of the person using ACT. This will probably change the first time the user setup
  characterName: 'YOU',
  // Toggle the actual number order of the sort setup by the user, ie: 1st, 2nd in DPS or Healing
  showRank: true,
  // Toggle the icon representing its job, like White Mage or Dragoon
  showJobIcon: true,
  // Toggle "Healing Per Second"
  showHps: true,
  // Toggle highlighting the number part, dps or healing
  showHighlight: false,
  // Toggle showing you
  showSelf: true,
  // Toggle the skill and number in dps/healing of your most big one
  showMaxhit: false,
  // Toggle encounter duration time
  showDuration: true,
  // Toggle encounter total damage (of the maximum of participants)
  showTotalDps: true,
  // Toggle dps in percentage (%) along the number
  showDamagePercent: true,
  // Toggle showing discord webhook in setup (for dev only)
  showDiscord: false,
  // Toggle showing language options in setup (for dev only)
  showLocale: false,
  // Toggle characters without classes/jobs, like chocobos, summons, machinist's devices
  showJobless: false,
  // Level of zoom, intended for resolutions beyond full hd
  zoom: '1',
  // The discord webhook url, setup by the user
  discord: '',
  // The maximum number of combatants to show in the overlay
  maxCombatants: 8,
  // The default language and localization
  locale: 'enUS',
  // The size of the config window, in pixels (for dev only)
  configWindow: {
    width: 1300,
    height: 239,
  },
  // Color by roles
  colorHealer: 'rgba(139, 195, 74, 0.3)',
  colorTank: 'rgba(33, 150, 243, 0.3)',
  colorDps: 'rgba(244, 67, 54, 0.3)',
  theme: 'original',
}

type ConfigStoreType<T> = Writable<ConfigType> & {
  toggle?: (value: string) => void
}

const lsConfigStore = localStorage.getItem('configStore')
function toggle(value: string) {
  configStore.update((current) => ({ ...current, [value]: !toBoolean(current[value]) }))
}

export const configStore: ConfigStoreType<ConfigType> = writable(
  lsConfigStore ? JSON.parse(lsConfigStore) : initialConfig
)

configStore.subscribe((value) => {
  localStorage.setItem('configStore', value ? JSON.stringify(value) : JSON.stringify(initialConfig))
})

configStore.toggle = toggle
