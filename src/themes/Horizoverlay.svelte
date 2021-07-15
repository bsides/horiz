<script lang="ts">
  import type { CombatantType } from '$/utils/types'
  import { jobs } from '$/utils/constants'

  export let data: CombatantType[]

  const getJobShortName = (battler: CombatantType) => {
    const short = jobs.find((job) => job.short === battler.Job?.toLowerCase())?.short
    if (!short) return 'error'
    return short
  }

  let showBattlerInfo = false
  const toggleShowBattlerInfo = () => (showBattlerInfo = !showBattlerInfo)

  // Sorts the combatants according to options
  // $: data = data.sort((a, b) => Number(a.ENCDPS) - Number(b.ENCDPS))

  // Debug
  // $: console.log(data)
</script>

<div class="battlers">
  {#each data as battler}
    <div
      class="battler"
      on:mouseenter={toggleShowBattlerInfo}
      on:mouseleave={toggleShowBattlerInfo}
    >
      <!-- <div>
        <img src={getJobImage(battler)} alt={`${battler.Job}'s class icon`} class="job-icon" />
      </div> -->
      <div class={`original job-icon ${getJobShortName(battler)}`} />
      <div>{battler.name}</div>
      <div>{battler.ENCDPS} <span>DPS</span></div>
    </div>
    {#if showBattlerInfo}
      <div class="battler-info">
        <div>Name: {battler.name}</div>
        <div>DPS: {battler.ENCDPS}</div>
        <div>
          Critical Hits (!): {Number(battler.crithits) - Number(battler.CritDirectHitCount)}
        </div>
        <div>
          Direct Hits (!!): {Number(battler.DirectHitCount) - Number(battler.CritDirectHitCount)}
        </div>
        <div>Critical Direct Hit (!!!): {battler.CritDirectHitCount}</div>
      </div>
    {/if}
  {/each}
</div>

<style lang="scss">
  .battlers {
    display: flex;
    cursor: default;
    position: relative;

    > div {
      padding: 0 6px;
    }
  }
  .battler {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: black;
    margin-right: 10px;
    width: 150px;
    height: 26px;
    text-align: center;

    & > div {
      z-index: 1;
    }

    &::before {
      position: absolute;
      background: rgba(255, 255, 255, 0.8);
      transform: skew(-30deg);
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      z-index: 0;
    }

    /* .job-icon {
      width: 16px;
    } */
  }
  /* .job-icon {
    background: url('/images/metal_sprite_squared.png');
    background-repeat: no-repeat;
    background-attachment: fixed;
    width: 20px;
    height: 20px;
    background-size: 140px; // 7 sprites of 20px x 20px side by side
  } */
  .battler-info {
    position: absolute;
    top: 21px;
    background: rgba(0, 0, 0, 0.8);
    padding: 6px 12px;
    text-align: left;
  }
  @import '../styles/sprites';
</style>
