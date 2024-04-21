import React from 'react'
import { CombatDataContext } from './combatData'

export const useCombatData = () => {
  return React.useContext(CombatDataContext)
}
