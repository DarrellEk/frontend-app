<script>
	// import * as L from 'leaflet';
	import 'leaflet/dist/leaflet.css';
	import { onMount } from 'svelte';
	import MarkerPopup from '../../components/markerPopup.svelte';
	import MemoryForm from '../../components/memoryForm.svelte';
	import Sidebar from '../../components/sidebar.svelte';

	let mapElement;
	let memoryFormHidden = true;
	let activeMarker;
	const coords = [51.505, -0.09];
	const markers = [];

	function onPostSubmit() {
		markers.push(activeMarker);
		memoryFormHidden = true;
	}

	onMount(async () => {
		const L = await import('leaflet');
		const bindPopup = (await import('../../lib/bindPopup')).default;
		let map = L.map(mapElement).setView(coords, 10);

		L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
			attribution: `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,
	     &copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`,
			subdomains: 'abcd',
			maxZoom: 20
		}).addTo(map);

		map.on('click', (e) => {
			let clickedCoords = [e.latlng.lat, e.latlng.lng];

			map.setView(clickedCoords);

			if (activeMarker !== undefined && markers.indexOf(activeMarker) === -1) {
				map.removeLayer(activeMarker);
				memoryFormHidden = true;
			}

			setTimeout(() => {
				let accepted = false;
				// this means marker was not added as memory

				activeMarker = L.marker(clickedCoords).addTo(map);
				bindPopup(activeMarker, (container) => {
					return new MarkerPopup({
						target: container,
						props: {
							onAccept: () => {
								accepted = true;
								activeMarker.closePopup();

								memoryFormHidden = false;
							},

							onCancel: () => {
								map.removeLayer(activeMarker);
							}
						}
					});
				});
				activeMarker.openPopup();
				activeMarker.on('popupclose', () => {
					if (!accepted) {
						map.removeLayer(activeMarker);
						memoryFormHidden = true;
					}
				});
			}, 150);
		});
	});
</script>

<Sidebar />
<MemoryForm hidden={memoryFormHidden} {onPostSubmit} />
<div id="map-container" class="h-full w-full">
	<div id="map" class="h-full w-full" bind:this={mapElement} />
</div>

<style>
	#map {
		width: 100vw;
		height: 100%;
	}
</style>
