import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export type SettingsState = typeof initialState
const initialState = {
  isTestData: true,
  dpsType: 'encounter',
  dpsShowDecimals: true,
}

export type SettingsActions = {
  update: (
    key: keyof SettingsState,
    value: SettingsState[keyof SettingsState],
  ) => void
  reset: () => void
}

export const useSettingsStore = create<SettingsState & SettingsActions>()(
  devtools(
    // persist(
    (set) => ({
      ...initialState,
      update: (key, value) => set((state) => ({ ...state, [key]: value })),
      reset: () => {
        set(initialState)
      },
    }),
    //   {
    //     name: 'horiz-settings-storage',
    //   },
    // ),
  ),
)
