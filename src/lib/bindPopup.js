import * as L from 'leaflet';

export default function bindPopup(marker, createFn) {
	let popupComponent;
	marker.bindPopup(() => {
		let container = L.DomUtil.create('div');
		popupComponent = createFn(container);
		return container;
	});

	marker.on('popupclose', () => {
		if (popupComponent) {
			let old = popupComponent;
			popupComponent = null;
			// Wait for the popup to completely fade out before destroying it.
			// Otherwise the fade out looks weird as the contents disappear too early.
			setTimeout(() => {
				old.$destroy();
			}, 500);
		}
	});
}
