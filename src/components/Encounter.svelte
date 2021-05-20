<script lang="ts">
  import type { EncounterType } from '../types'

  export let data: EncounterType
</script>

<div>
  {data.title} - {data.CurrentZoneName} - {data.ENCDPS} - {data.MAXHEAL} - {data.MAXHIT}
</div>
