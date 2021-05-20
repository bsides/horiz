import { writable } from 'svelte/store'
import type { ConfigType } from './types'

const initialConfig: ConfigType = {
  showSetup: false,
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
}

const lsConfigStore = localStorage.getItem('configStore')
export const configStore = writable(lsConfigStore ? JSON.parse(lsConfigStore) : initialConfig)
configStore.subscribe((value) => {
  localStorage.setItem('configStore', value ? JSON.stringify(value) : JSON.stringify(initialConfig))
})
