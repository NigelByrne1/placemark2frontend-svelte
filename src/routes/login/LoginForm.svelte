<script lang="ts">
  import { goto } from "$app/navigation";
  import Message from "$lib/ui/Message.svelte";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";

  let email = $state("");
  let password = $state("");
  let message = $state("");

  async function login() {
    const success = false;
    if (success) {
      goto("/placemark");
    } else {
      message = "Error Trying to login in";
    }
  }
</script>

<div class="box has-background-danger">
  {#if message}
    <Message {message} />
  {/if}
  <UserCredentials bind:email bind:password />
  <button onclick={() => login()} class="button">Log In</button>.
  <p class="has-text-centered has-text-white">
    or <a href="/" data-cy="home-redirect"> Head back to the homepage </a>
  </p>
</div>
