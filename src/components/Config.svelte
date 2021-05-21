<script lang="ts">
  import { configStore } from '$/utils/stores'

  const togglables = Object.entries($configStore).filter(
    (entry) => typeof entry[1] === 'boolean' && entry[0] !== 'showSetup'
  )

  $: console.log($configStore)
  $: console.log(togglables)
</script>

<div class="config">
  <h1>Config</h1>
  <div>
    <label
      ><input type="checkbox" name="test-mode" bind:checked={$configStore.showSetup} /> Test Mode</label
    >
    {#each togglables as toggle}
      <label>
        <input
          type="checkbox"
          id={`config-${toggle[0]}`}
          name={`config-${toggle[0]}`}
          bind:checked={$configStore[toggle[0]]}
        />
        {toggle[0]}
      </label>
    {/each}
  </div>
</div>

<style lang="scss">
</style>
