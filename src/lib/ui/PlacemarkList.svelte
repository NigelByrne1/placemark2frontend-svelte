<script lang="ts">
  import { currentPlacemarks, currentCategorys, currentUsers } from "$lib/runes.svelte";
  import DOMPurify from "dompurify";
  
  function sanitize(html: string) {
  return DOMPurify.sanitize(html);
}

</script>

<table class="table is-fullwidth">
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Latitude</th>
      <th>Longitude</th>
      <th>Category</th>
      <th>User</th>
    </tr>
  </thead>
  <tbody>
    {#each currentPlacemarks.placemarks as placemark}
      <tr>
        <td>{@html sanitize(placemark.name)}</td>
        <td>{@html sanitize(placemark.description)}</td>
        <td>{placemark.latitude}</td>
        <td>{placemark.longitude}</td>
        <td>
          {#each currentCategorys.categorys as category}
            {#if category._id === placemark.categoryid}
              {category.title}
            {/if}
          {/each}
        </td>
        <td>
          {#each currentCategorys.categorys as category}
            {#if category._id === placemark.categoryid}
              {#each currentUsers.users as user}
                {#if user._id === category.userid}
                  {user.firstName} {user.lastName}
                {/if}
              {/each}
            {/if}
          {/each}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
