<script lang="ts">
  import Card from "$lib/ui/Card.svelte";
  import PlacemarkList from "$lib/ui/PlacemarkList.svelte";
  import { loggedInUser, subTitle } from "$lib/runes.svelte";
  import { placemarkService } from "$lib/services/placemark-service";
  import { onMount } from "svelte";

  subTitle.text = "Placemarks to Date";

  let placemarks = [];
  let categories = [];

  onMount(async () => {
    placemarks = await placemarkService.getPlacemarks(loggedInUser.token);
    categories = await placemarkService.getCategorys(loggedInUser.token);
  });
</script>

<Card title="Placemarks">
  <PlacemarkList {placemarks} {categories} />
</Card>
