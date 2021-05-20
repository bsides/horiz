<script lang="ts">
  import { configStore } from '../stores'

  const config = {
    testMode: false,
    characterName: 'YOU',
    locale: 'en',
  }
  function handleInput(evt) {
    console.log(evt)
  }

  function updateTestMode(evt) {
    configStore.update((current) => ({ ...current, showSetup: evt.target.checked }))
  }
  $: console.log($configStore)
</script>

<div class="config">
  <h1>Config</h1>
  <div>
    <input
      type="checkbox"
      name="test-mode"
      bind:checked={config.testMode}
      on:click={updateTestMode}
    /> Test Mode
  </div>
  <pre>{JSON.stringify($configStore, null, 2)}</pre>
</div>

<style lang="scss">
</style>
