<script lang="ts">
  import { subTitle, loggedInUser } from "$lib/runes.svelte";
  import { placemarkService } from "$lib/services/placemark-service";
  import Card from "$lib/ui/Card.svelte";
  import PlacemarkForm from "./PlacemarkForm.svelte";
  import type { Category } from "$lib/types/placemark-types";
  import { onMount } from "svelte";

  subTitle.text = "Add a Placemark";

  let categoryList: Category[] = [];

  onMount(async () => {
    categoryList = await placemarkService.getCategorys(loggedInUser.token);
  });
</script>

<Card title="Please Add a Placemark">
  <PlacemarkForm {categoryList} />
</Card>
