<script lang="ts">
  import { goto } from "$app/navigation";
  import { loggedInUser } from "$lib/runes.svelte";
  import { placemarkService } from "$lib/services/placemark-service";
  import Message from "$lib/ui/Message.svelte";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";


  let email = $state("");
  let password = $state("");
  let message = $state("");


  async function login() {
    console.log(`attempting to log in email: ${email} with password: ${password}`);
    let session = await placemarkService.login(email, password);
    if (session) {
      loggedInUser.email = email;
      loggedInUser.name = session.name;
      loggedInUser.token = session.token;
      loggedInUser._id = session._id;
      localStorage.placemark = JSON.stringify(loggedInUser);
      console.log(`Session: ${JSON.stringify(session)}`);
      goto("/placemark");
    } else {
      email = "";
      password = "";
      message = "Invalid Credentials";
    }
  }
</script>


<div class="box has-background-success">
  {#if message}
    <Message {message} />
  {/if}
  <UserCredentials bind:email bind:password />
  <button onclick={() => login()} class="button">Log In</button>.
  <p class="has-text-centered has-text-white">
    or <a href="/" data-cy="home-redirect"> Head back to the homepage </a>
  </p>
</div>
