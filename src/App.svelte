<script lang="ts">
  import { get } from 'svelte/store'
  import jsonPreview from './json/preview.json'
  import { configStore } from './stores'
  import Config from './components/Config.svelte'
  import Encounter from './components/Encounter.svelte'
  import Battler from './components/Battler.svelte'
  import type { CombatantType, CombatDataType, CombatWindowType } from './types'
  import { getNewRandom } from './helper'
  // import './common'

  let fullData: CombatDataType
  let encounter = fullData?.Encounter
  let battler: CombatantType[] = []

  const newWindow: CombatWindowType = window as CombatWindowType
  newWindow.data = []
  // if (newWindow !== undefined) {
  //   newWindow.addOverlayListener('CombatData', (data) => {
  //     const { Combatant } = data
  //     fullData = data
  //     battler = Object.keys(Combatant).map((key) => Combatant[key])
  //     console.log(battler)
  //   })
  //   newWindow.startOverlayEvents()
  // }

  function handleContextMenu(evt: MouseEvent) {
    evt.preventDefault()
    configStore.toggle('showSetup')
  }
  let preview = jsonPreview

  let clear
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
    battler = Object.keys(preview.Combatant).map((key) => preview.Combatant[key])
    encounter = preview.Encounter
  }
</script>

<main on:contextmenu={handleContextMenu}>
  <Encounter data={encounter} />
  <Battler data={battler} />
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
