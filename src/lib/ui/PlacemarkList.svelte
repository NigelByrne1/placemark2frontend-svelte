<script lang="ts">
  let { placemarks, categories } = $props();
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
    {#each placemarks as placemark}
      <tr>
        <td>{placemark.name}</td>
        <td>{placemark.description}</td>
        <td>{placemark.latitude}</td>
        <td>{placemark.longitude}</td>
        <td>
          {#if categories}
            {#each categories as category}
              {#if category._id === placemark.categoryid}
                {category.title}
              {/if}
            {/each}
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
