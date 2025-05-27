<script lang="ts">
  import { currentPlacemarks, currentCategorys } from "$lib/runes.svelte";
</script>

<table class="table is-fullwidth">
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Latitude</th>
      <th>Longitude</th>
      <th>Category</th>
    </tr>
  </thead>
  <tbody>
    {#each currentPlacemarks.placemarks as placemark}
      <tr>
        <td>{placemark.name}</td>
        <td>{placemark.description}</td>
        <td>{placemark.latitude}</td>
        <td>{placemark.longitude}</td>
        <td>
          {#each currentCategorys.categorys as category}
            {#if category._id === placemark.categoryid}
              {category.title}
            {/if}
          {/each}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
