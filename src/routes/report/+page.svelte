<script lang="ts">
    import { subTitle } from "$lib/runes.svelte";
    import Card from "$lib/ui/Card.svelte";    
    import PlacemarkList from "$lib/ui/PlacemarkList.svelte";
    
    subTitle.text = "Donations to date";
</script>

<Card title ="Donations">
    <PlacemarkList />
</Card>