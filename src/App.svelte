<script lang="ts">
  import jsonPreview from '$/json/preview.json'
  import { configStore } from '$/utils/stores'
  import Config from '$/components/Config.svelte'
  import Encounter from '$/components/Encounter.svelte'
  import Horizoverlay from '$/themes/Horizoverlay.svelte'
  import type { CombatantType, CombatDataType, CombatWindowType } from '$/utils/types'
  import { getNewRandom } from '$/utils/helper'

  let fullData: CombatDataType
  let encounter = fullData?.Encounter
  let combatants: CombatantType[] = []
  let testData: CombatDataType = jsonPreview
  let testModeTimer: ReturnType<typeof setTimeout>

  const newWindow: CombatWindowType = window as CombatWindowType
  newWindow.data = {}

  function handleContextMenu(evt: MouseEvent) {
    evt.preventDefault()
    configStore.toggle('showSetup')
  }

  function assignData(givenData: CombatDataType) {
    newWindow.data = givenData
    fullData = givenData
    combatants = Object.keys(givenData.Combatant).map((key) => givenData.Combatant[key])
    encounter = givenData.Encounter
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
      assignData(testData)
    } else {
      if (testModeTimer) clearInterval(testModeTimer)
      newWindow.addOverlayListener('CombatData', (data) => assignData(data))
      newWindow.startOverlayEvents()
    }
  }
</script>

<main on:contextmenu={handleContextMenu}>
  <Encounter data={encounter} />
  {#if $configStore.theme === 'original'}
    <Horizoverlay data={combatants} />
  {/if}
  {#if $configStore.showSetup}
    <Config />
  {/if}
</main>

<style lang="scss">
  @import 'styles/global';
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
