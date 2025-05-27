<script lang="ts">
  import { subTitle, currentDataSets } from "$lib/runes.svelte";
  import Card from "$lib/ui/Card.svelte";
  // @ts-ignore
  import Chart from "svelte-frappe-charts";

  subTitle.text = "Placemark Charts";

</script>

<div class="columns">
  <div class="column">
    <Card title="Placemarks by Category">
      <Chart data={currentDataSets.placemarksByCategory} type="bar" />
    </Card>
  </div>
  <div class="column">
    <Card title="Placemarks by User">
      <Chart data={currentDataSets.placemarksByUser} type="pie" />
    </Card>
  </div>
</div>
