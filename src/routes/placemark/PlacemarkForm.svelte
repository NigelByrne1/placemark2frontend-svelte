<script lang="ts">
  import Coordinates from "$lib/ui/Coordinates.svelte";

  let lat = $state(52.160858);
  let lng = $state(-7.15242);

  async function donate() {
    console.log(`Just donated: ${amount} to ${selectedCandidate} via ${selectedMethod} payment`);
    console.log(`lat: ${lat}, lng: ${lng}`);
  }

</script>

<div>
  <div class="field">
    <label class="label" for="amount">Enter Amount:</label>
    <input class="input" id="amount" name="amount" type="number" />
  </div>
  <div class="field">
    <div class="control">
      <label class="label" for="amount">Select Payment Method:</label>
      <input class="radio" type="radio" /> paypal
      <input class="radio" type="radio" /> direct
    </div>
  </div>
  <div class="field">
    <label class="label" for="amount">Select Candidate:</label>
    <div class="select">
      <select>
        <option>Simpson, Lisa</option>
        <option>Simpson, Maggie</option>
        <option>Flanders, Ned</option>
      </select>
    </div>
  </div>

  <Coordinates bind:lat bind:lng />

  <div class="field">
    <div class="control">
      <button class="button is-success is-fullwidth">Donate</button>
    </div>
  </div>
</div>
