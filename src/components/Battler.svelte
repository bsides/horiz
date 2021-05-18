<script lang="ts">
  import type { CombatantType } from '../types'

  export let data: CombatantType[]
</script>

<div class="battlers">
  {#each data as battler}
    <div class="battler">
      <span>Class symbol</span>
      <span>{battler.name}</span>
      <span />
    </div>
    <div>Name: {battler.name}</div>
    <div>DPS: {battler.ENCDPS}</div>
    <div>
      Critical Hits (!): {Number(battler.crithits) -
        Number(battler.CritDirectHitCount)}
    </div>
    <div>
      Direct Hits (!!): {Number(battler.DirectHitCount) -
        Number(battler.CritDirectHitCount)}
    </div>
    <div>Critical Direct Hit (!!!): {battler.CritDirectHitCount}</div>
  {/each}
</div>

<style lang="scss">
  .battlers {
    display: flex;

    > div {
      padding: 0 6px;
    }
  }
</style>
