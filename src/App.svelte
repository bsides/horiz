<script lang="ts">
  import Encounter from './components/Encounter.svelte'
  import Battler from './components/Battler.svelte'
  import type { CombatantType, CombatDataType, CombatWindowType } from './types'
  // import './common'

  export let fullData: CombatDataType
  export let encounter = fullData?.Encounter
  export let battler: CombatantType[] = []

  const newWindow: CombatWindowType = window as CombatWindowType
  newWindow.data = []
  if (newWindow !== undefined) {
    newWindow.addOverlayListener('CombatData', (data) => {
      const { Combatant } = data
      fullData = data
      battler = Object.keys(Combatant).map((key) => Combatant[key])
      console.log(battler)
    })
    newWindow.startOverlayEvents()
  }
</script>

<main>
  <Encounter data={encounter} />
  <Battler data={battler} />
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
    font-size: 1em;
    color: white;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
