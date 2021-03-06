import { Writable, writable } from 'svelte/store'
import { toBoolean } from '$/utils/helper'
import type { ConfigType } from '$/utils/types'

const initialConfig: ConfigType = {
  showSetup: true,
  testMode: true,
  color: 'byRole',
  characterName: 'YOU',
  showRank: true,
  showJobIcon: true,
  showHps: true,
  showHighlight: false,
  showSelf: true,
  showMaxhit: false,
  showDuration: true,
  showTotalDps: true,
  showDamagePercent: true,
  showDiscord: false,
  showLocale: false,
  showJobless: false,
  zoom: '1',
  discord: '',
  maxCombatants: 8,
  locale: 'enUS',
  configWindow: {
    width: 1300,
    height: 239,
  },
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
