<script lang="ts">
  import type { CombatantType } from '$/utils/types'
  import { jobs } from '$/utils/constants'

  export let data: CombatantType[]

  const getJobImage = (battler: CombatantType) => {
    const jobObj = jobs.filter((job) => job.short === battler.Job.toLowerCase())[0]
    // const path = '/images/original'
    const path = '/images/metal'
    const fileType = 'png'
    return `${path}/${jobObj.full}.${fileType}`
  }

  let showBattlerInfo = false
  const toggleShowBattlerInfo = () => (showBattlerInfo = !showBattlerInfo)

  $: console.log(data)
  // $: data = $configStore.data.sort((a, b) => Number(a.ENCDPS) - Number(b.ENCDPS))
</script>

<div class="battlers">
  {#each data as battler}
    <div
      class="battler"
      on:mouseenter={toggleShowBattlerInfo}
      on:mouseleave={toggleShowBattlerInfo}
    >
      <div>
        <img src={getJobImage(battler)} alt={`${battler.Job}'s class icon`} class="job-icon" />
      </div>
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

    .job-icon {
      width: 16px;
    }
  }
  .battler-info {
    position: absolute;
    top: 21px;
    background: rgba(0, 0, 0, 0.8);
    padding: 6px 12px;
    text-align: left;
  }
  .layout-mode {
    border: 2px solid red;
  }
</style>
