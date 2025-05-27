<script lang="ts">
  import { loggedInUser, subTitle } from "$lib/runes.svelte";
  import { placemarkService } from "$lib/services/placemark-service";
  import type { Placemark } from "$lib/types/placemark-types";
  import Card from "$lib/ui/Card.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import { onMount } from "svelte";

  subTitle.text = "Placemarks Geo Data";
  let map: LeafletMap;

  onMount(async () => {
    const placemarks = await placemarkService.getPlacemarks(loggedInUser.token);
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

<Card title="Placemarks Locations">
  <LeafletMap height={60} bind:this={map} />
</Card>
