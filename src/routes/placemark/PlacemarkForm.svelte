<script lang="ts">
  import { loggedInUser, currentCategorys } from "$lib/runes.svelte";
  import { placemarkService } from "$lib/services/placemark-service";
  import type { Placemark, Category } from "$lib/types/placemark-types";
  import Coordinates from "$lib/ui/Coordinates.svelte";

  let name = $state("");
  let description = $state("");
  let lat = $state(52.160858);
  let lng = $state(-7.15242);
  let message = $state("Please enter a placemark");
  let selectedCategory = $state("");
  let addNewCategory = $state(false);
  let newCategoryTitle = $state("");

  async function addPlacemark() {
    const creatingNew = addNewCategory && newCategoryTitle.trim() !== "";
    const usingExisting = !addNewCategory && selectedCategory;

    if (!creatingNew && !usingExisting) {
      message = "Please select or create a category";
      return;
    }

    if (!name || !description) {
      message = "Please fill in name and description";
      return;
    }

    let categoryId = selectedCategory;

    if (creatingNew) {
      const newCategory: Category = {
        title: newCategoryTitle.trim(),
        userid: loggedInUser._id
      };

      const created = await placemarkService.addCategory(newCategory, loggedInUser.token);
      if (!created) {
        message = "Error creating new category.";
        return;
      }

      await placemarkService.refreshPlacemarkInfo();

      const latest = currentCategorys.categorys.find(
        c => c.title === newCategory.title && c.userid === loggedInUser._id
      );
      if (!latest) {
        message = "New category not found after creating.";
        return;
      }

      categoryId = latest._id;
    }

    const placemark: Placemark = {
      name,
      description,
      latitude: lat,
      longitude: lng,
      categoryid: categoryId
    };

    const success = await placemarkService.addPlacemark(categoryId, placemark, loggedInUser.token);
    if (!success) {
      message = "Placemark not saved - an error occurred";
      return;
    }

    message = `Placemark "${name}" added successfully!`;
    name = "";
    description = "";
    lat = 52.160858;
    lng = -7.15242;
    selectedCategory = "";
    newCategoryTitle = "";
    addNewCategory = false;
  }
</script>

<div>
  <!-- Name -->
  <div class="field">
    <label class="label" for="name">Placemark Name:</label>
    <input bind:value={name} class="input" id="name" name="name" type="text" />
  </div>

  <!-- Description -->
  <div class="field">
    <label class="label" for="description">Description:</label>
    <input bind:value={description} class="input" id="description" name="description" type="text" />
  </div>

  <!-- Category Selection / Creation -->
  <div class="field">
    <label class="label">Category</label>

    <label class="checkbox mb-2">
      <input type="checkbox" bind:checked={addNewCategory} />
      Add a new category
    </label>

    {#if addNewCategory}
      <input class="input" placeholder="New Category Title" bind:value={newCategoryTitle} />
    {:else}
      <div class="select">
        <select bind:value={selectedCategory}>
          <option disabled value="">-- Select Category --</option>
          {#each currentCategorys.categorys as category}
            <option value={category._id}>{category.title}</option>
          {/each}
        </select>
      </div>
    {/if}
  </div>

  <!-- Coordinates -->
  <Coordinates bind:lat bind:lng />

  <!-- Submit -->
  <div class="field mt-4">
    <button on:click={addPlacemark} class="button is-danger is-fullwidth">Add Placemark</button>
  </div>

  <!-- Feedback -->
  <div class="box mt-4">
    <div class="content has-text-centered">
      {message}
    </div>
  </div>
</div>
