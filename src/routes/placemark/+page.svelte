<script lang="ts">
  import { loggedInUser, subTitle, currentDataSets } from "$lib/runes.svelte";
  import { placemarkService } from "$lib/services/placemark-service";
  import Card from "$lib/ui/Card.svelte";
  import { onMount } from "svelte";
  import PlacemarkForm from "./PlacemarkForm.svelte";
  import PlacemarkList from "$lib/ui/PlacemarkList.svelte";


  subTitle.text = "Add and View Placemarks";

  let categoryList = [];
  let placemarks = [];

  onMount(async () => {
    categoryList = await placemarkService.getCategorys(loggedInUser.token);
    placemarks = await placemarkService.getPlacemarks(loggedInUser.token);
  });
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
  </div>
</div>

<Chart data={currentDataSets.placemarksByCategory} type="bar" />

