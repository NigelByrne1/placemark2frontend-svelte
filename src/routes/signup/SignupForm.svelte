<script lang="ts">
  import { goto } from "$app/navigation";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";
  import UserDetails from "$lib/ui/UserDetails.svelte";
  import Message from "$lib/ui/Message.svelte";
  import { placemarkService } from "$lib/services/placemark-service";

  let firstName = $state("");
  let lastName = $state("");
  let email = $state("");
  let password = $state("");
  let message = $state("");

  async function signup() {
  const user = {
    firstName,
    lastName,
    email,
    password
  };

  const success = await placemarkService.signup(user);

  if (success) {
    goto("/login"); 
  } else {
    message = "Error Trying to sign up";
  }
}
</script>

<div class="box">
  {#if message}
    <Message {message} />
  {/if}
  <UserDetails bind:firstName bind:lastName />
  <UserCredentials bind:email bind:password />
  <button onclick={() => signup()} class="button">Sign Up</button>
  <p class="has-text-centered">
    Already have an account? <a href="/login" data-cy="login-redirect">Login Here</a>
  </p>
  <p class="has-text-centered">
    or <a href="/" data-cy="home-redirect"> Head back to the homepage </a>
  </p>
</div>
