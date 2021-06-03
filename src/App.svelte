<script lang="ts">
  import jsonPreview from '$/json/preview.json'
  import { configStore } from '$/utils/stores'
  import Config from '$/components/Config.svelte'
  import Encounter from '$/components/Encounter.svelte'
  import Original from '$/themes/Original.svelte'
  import type { CombatantType, CombatDataType, CombatWindowType } from '$/utils/types'
  import { getNewRandom } from '$/utils/helper'

  let fullData: CombatDataType
  let encounter = fullData?.Encounter
  let combatants: CombatantType[] = []
  let testData: CombatDataType = jsonPreview
  let testModeTimer: number

  const newWindow: CombatWindowType = window as CombatWindowType
  newWindow.data = {}

  function handleContextMenu(evt: MouseEvent) {
    evt.preventDefault()
    configStore.toggle('showSetup')
  }

  $: {
    if ($configStore.testMode) {
      clearInterval(testModeTimer)
      testModeTimer = setInterval(() => {
        const combatant = testData.Combatant
        for (const i in combatant) {
          combatant[i] = { ...combatant[i], ...getNewRandom() }
        }
        testData.Combatant = combatant
      }, 1000)
      newWindow.data = testData
      fullData = testData
      combatants = Object.keys(testData.Combatant).map((key) => testData.Combatant[key])
      encounter = testData.Encounter
    } else {
      if (testModeTimer) clearInterval(testModeTimer)
      newWindow.addOverlayListener('CombatData', (data) => {
        const { Combatant } = data
        newWindow.data = data
        fullData = data
        combatants = Object.keys(Combatant).map((key) => Combatant[key])
        encounter = data.Encounter
      })
      newWindow.startOverlayEvents()
    }
  }
</script>

<main on:contextmenu={handleContextMenu}>
  <Encounter data={encounter} />
  {#if $configStore.theme === 'original'}
    <Original data={combatants} />
  {/if}
  {#if $configStore.showSetup}
    <Config />
  {/if}
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
