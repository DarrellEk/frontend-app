<script>
  import { onMount } from 'svelte';
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';

  let map;

  onMount(() => {
    // Set the initial view to Kuala Lumpur
    map = L.map('map').setView([3.1390, 101.6869], 13);

    // Use CartoDB tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors, &copy; CARTO',
    }).addTo(map);

    map.on('click', onMapClick);
  });

  function onMapClick(e) {
    const { lat, lng } = e.latlng;

    const popupContent = `
      <div class="popup-container">
        <h1>Do you want to store a memory here? ☁️</h1>
        <br>
        <div class="button-container">
          <button class="btn btn-yes" onclick="storeMemory(${lat}, ${lng}, true)">Yes</button>
          <button class="btn btn-no" onclick="storeMemory(${lat}, ${lng}, false)">No</button>
        </div>
      </div>
    `;

    const marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(popupContent, { minWidth: 200, maxWidth: 400 }).openPopup();

    // You can add the image upload logic here
    console.log(`Clicked on: ${lat}, ${lng}`);
  }

  // Function to handle memory storage
  function storeMemory(lat, lng, isStore) {
    const marker = map.getLayers()[0]; // Assuming the marker is the first layer
    if (!marker) return;

    if (isStore) {
      // Add your logic for storing the memory here
      console.log(`Memory stored at: ${lat}, ${lng}`);
    } else {
      marker.closePopup();
      map.removeLayer(marker);
      console.log(`Marker removed at: ${lat}, ${lng}`);
    }
  }
</script>

<style>
  #map {
    height: 600px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: 1px solid #ccc;
  }

  .popup-container {
    text-align: center;
  }

  .button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  .btn {
    padding: 10px;
    width: 45%; /* Adjust as needed */
    border-radius: 5px;
    cursor: pointer;
  }

  .btn-yes {
    background-color: #4caf50;
    color: white;
  }

  .btn-no {
    background-color: #f44336;
    color: white;
  }

  .leaflet-popup-content-wrapper {
    border-radius: 10px;
  }

  .leaflet-popup-content {
    padding: 10px;
  }
</style>

<div id="map"></div>
