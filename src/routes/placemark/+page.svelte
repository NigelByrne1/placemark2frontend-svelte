<script lang="ts">
  import { loggedInUser, subTitle, currentDataSets } from "$lib/runes.svelte";
  import { placemarkService } from "$lib/services/placemark-service";
  import Card from "$lib/ui/Card.svelte";
  import { onMount } from "svelte";
  import PlacemarkForm from "./PlacemarkForm.svelte";
  import PlacemarkList from "$lib/ui/PlacemarkList.svelte";
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";




  subTitle.text = "Add and View Placemarks";
  let map: LeafletMap;
  let categoryList = [];
  let placemarks = [];

  onMount(async () => {
    categoryList = await placemarkService.getCategorys(loggedInUser.token);
    placemarks = await placemarkService.getPlacemarks(loggedInUser.token);

    placemarks.forEach((placemark: Placemark) => {
      map.addMarker(placemark.latitude, placemark.longitude, placemark.name);
    });
    const lastPlacemark = placemarks[placemarks.length - 1];
    if (lastPlacemark) {
        map.moveTo(lastPlacemark.latitude, lastPlacemark.longitude);
    }
    }
    );
</script>

<div class="columns">
  <div class="column">
    <Card title="Placemarks to Date">
      <PlacemarkList {placemarks} {categoryList} />
    </Card>
  </div>
  <div class="column">
    <Card title="Please Add a Placemark">
      <PlacemarkForm {categoryList} />
    </Card>
    <Card title="Placemarks by Category">
      <Chart data={currentDataSets.placemarksByCategory} type="bar" />
    </Card>
    <Card title="Map of Placemarks">
      <LeafletMap height={30} bind:this={map} />
    </Card>
  </div>
</div>


