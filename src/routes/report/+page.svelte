<script lang="ts">
  import Card from "$lib/ui/Card.svelte";
  import PlacemarkList from "$lib/ui/PlacemarkList.svelte";
  import { subTitle, currentPlacemarks, currentCategorys } from "$lib/runes.svelte";

  subTitle.text = "Placemarks to Date";

  let { placemarks } = currentPlacemarks;
  let { categorys } = currentCategorys;
</script>

<Card title="Placemarks">
  <PlacemarkList {placemarks} {categorys} />
</Card>
