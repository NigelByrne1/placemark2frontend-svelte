<script lang="ts">
  import { goto } from "$app/navigation";
  import { loggedInUser } from "$lib/runes.svelte";
  import { browser } from "$app/environment";

  loggedInUser.email = "";
  loggedInUser.name = "";
  loggedInUser.token = "";
  loggedInUser._id = "";
  if (browser) {
  localStorage.removeItem("donation");
  }
  goto("/");
</script>