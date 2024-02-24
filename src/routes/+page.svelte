<script lang="ts">
  export let data;

  let scrapedData: string;

  scrapedData = data.scrapedData;

</script>

<div>
  <h1>Scraped Data:</h1>
  <p>{scrapedData}</p>
</div>