<script lang="ts">
  import { subTitle } from "$lib/runes.svelte";
  import Card from "$lib/ui/Card.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  subTitle.text = "Donations Geo Data";
</script>

<Card title="Donations Locations">
  <LeafletMap />
</Card>
