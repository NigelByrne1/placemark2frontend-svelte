<script lang="ts">
  import { loggedInUser } from "$lib/runes.svelte";
</script>

<nav class="navbar is-full-width is-success">
  <div class="container">
    <div class="navbar-brand">
      <a class="navbar-item" href="/placemark">
        <span class="icon"> <i class="fas fa-map-marker-alt"></i></span><span class="icon mr-1"></span>
        <span><strong>Placemark</strong> </span>
      </a>
    </div>
    <div id="navbarMenu" class="navbar-menu has-text-white">
      <div class="navbar-end">
        <a class="navbar-item" href="/charts"> Charts </a>
        <a class="navbar-item" href="/maps"> Maps </a>
        <a class="navbar-item" href="/report"> Report </a>
        <a class="navbar-item" href="/logout"> Logout [{loggedInUser.email}]</a>
      </div>
      <div></div>
    </div>
  </div>
</nav>
