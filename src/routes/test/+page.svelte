<script>
  import Map from '../../lib/map.svelte';
</script>

<style>
  body {
    margin: 0;
    overflow: hidden;
  }


  #map-container {
    position: absolute;
    top: 64px; /* Adjust the header height */
    left: 200px;
    right: 100px;
    width: auto;
    height: auto; /* Adjust for the header height */
  }
</style>


<div id="map-container">
  <Map />
</div>
