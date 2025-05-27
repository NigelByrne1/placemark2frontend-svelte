<script lang="ts">
  import { subTitle } from "$lib/runes.svelte";
  import Card from "$lib/ui/Card.svelte";
  import PlacemarkForm from "./PlacemarkForm.svelte";

  subTitle.text = "Make a Donation";
</script>

<Card title="Please Donate">
  <PlacemarkForm />
</Card>
