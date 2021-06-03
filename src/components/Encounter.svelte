<script lang="ts">
  import type { EncounterType } from '$/utils/types'

  export let data: EncounterType
</script>

<div>
  {#if data}
    {data.title} - {data.CurrentZoneName} - {data.ENCDPS} - {data.MAXHEAL} - {data.MAXHIT}
  {/if}
</div>
