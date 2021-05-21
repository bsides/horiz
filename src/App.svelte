<script lang="ts">
  import jsonPreview from '$/json/preview.json'
  import { configStore } from '$/utils/stores'
  import Config from '$/components/Config.svelte'
  import Encounter from '$/components/Encounter.svelte'
  import Battler from '$/components/Battler.svelte'
  import Original from '$/themes/Original.svelte'
  import type { CombatantType, CombatDataType, CombatWindowType } from '$/utils/types'
  import { getNewRandom } from '$/utils/helper'

  let fullData: CombatDataType
  let encounter = fullData?.Encounter
  let combatants: CombatantType[] = []

  const newWindow: CombatWindowType = window as CombatWindowType
  newWindow.data = {}
  // if (newWindow !== undefined) {
  //   newWindow.addOverlayListener('CombatData', (data) => {
  //     const { Combatant } = data
  //     fullData = data
  //     combatants = Object.keys(Combatant).map((key) => Combatant[key])
  //     console.log(combatants)
  //   })
  //   newWindow.startOverlayEvents()
  // }

  function handleContextMenu(evt: MouseEvent) {
    evt.preventDefault()
    configStore.toggle('showSetup')
  }
  let preview = jsonPreview

  let clear: number
  $: {
    clearInterval(clear)
    clear = setInterval(() => {
      const combatant = preview.Combatant
      for (const i in combatant) {
        combatant[i] = { ...combatant[i], ...getNewRandom() }
      }
      preview.Combatant = combatant
    }, 1000)
    newWindow.data = preview
    fullData = preview
    combatants = Object.keys(preview.Combatant).map((key) => preview.Combatant[key])
    encounter = preview.Encounter
  }
</script>

<main on:contextmenu={handleContextMenu}>
  <Encounter data={encounter} />
  {#if $configStore.theme === 'original'}
    <Original data={combatants} />
  {/if}
  <Battler data={combatants} />
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
