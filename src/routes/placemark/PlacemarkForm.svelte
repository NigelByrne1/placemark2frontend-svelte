<script lang="ts">
  import { loggedInUser } from "$lib/runes.svelte";
  import { placemarkService } from "$lib/services/placemark-service";
  import type { Placemark } from "$lib/types/placemark-types";
  import Coordinates from "$lib/ui/Coordinates.svelte";
  import type { Category } from "$lib/types/placemark-types";

  let { categoryList = [] } = $props();

  let name = $state("");
  let description = $state("");
  let selectedCategory = $state("");
  let lat = $state(52.160858);
  let lng = $state(-7.15242);
  let message = $state("Please enter a placemark");

  async function addPlacemark() {
    if (selectedCategory && name && description) {
      const category = categoryList.find((category) => category._id === selectedCategory);
      if (category) {
        const placemark: Placemark = {
          name,
          description,
          latitude: lat,
          longitude: lng,
          categoryid: selectedCategory
        };

        const success = await placemarkService.addPlacemark(selectedCategory, placemark, loggedInUser.token);
        if (!success) {
          message = "Placemark not saved - an error occurred";
          return;
        }

        message = `Placemark "${name}" added to category "${category.title}"`;
      }
    } else {
      message = "Please fill in all fields";
    }
  }
</script>

<div>
  <div class="field">
    <label class="label" for="name">Placemark Name:</label>
    <input bind:value={name} class="input" id="name" name="name" type="text" />
  </div>

  <div class="field">
    <label class="label" for="description">Description:</label>
    <input bind:value={description} class="input" id="description" name="description" type="text" />
  </div>

  <div class="field">
    <label class="label" for="category">Select Category:</label>
    <div class="select">
      <select id="category" bind:value={selectedCategory}>
        <option disabled value="">-- select a category --</option>
        {#each categoryList as category}
          <option value={category._id}>{category.title}</option>
        {/each}
      </select>
    </div>
  </div>

  <Coordinates bind:lat bind:lng />

  <div class="field mt-4">
    <button onclick={addPlacemark} class="button is-danger is-fullwidth">Add Placemark</button>
  </div>

  <div class="box mt-4">
    <div class="content has-text-centered">
      {message}
    </div>
  </div>
</div>
