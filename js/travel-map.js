mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtaGVybWVzIiwiYSI6ImNpbGxjeGhmYzVvMm52bm1jdmx0NmtvbXoifQ.uf5gBnnbU05bnaw7atDu9A';
let map = new mapboxgl.Map({
    container: 'travel-map',
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 3,
    center: [-95.7129, 37.0902],
    scrollZoom: false,
});

map.on('load', function () {
	var url  = "https://samhermes.co/content/wp-json/wp/v2/locations";
	var xhr  = new XMLHttpRequest()
	xhr.open('GET', url)
	xhr.onload = function() {
		var locations = JSON.parse(xhr.responseText);
		var features = Array()
		var latlng = Array()

		locations.forEach(function(element) {
			feature = {
				'type' : 'Feature',
				'geometry' : {
					'type' : 'Point',
					'coordinates' : [ element.fields.coordinates.lng, element.fields.coordinates.lat ]
				},
				'properties' : {
					'title' : element.title.rendered
				}
			}
			features.push(feature)
		})

		map.addSource("locations", {
			"type": "geojson",
			"data": {
				"type": "FeatureCollection",
				"features": features
			}
		})

		map.addLayer({
			"id": "points",
			"type": "circle",
			"source": "locations",
			"paint": {
				"circle-radius": 10,
				"circle-color": "#007cbf"
			}
		});

	}
	xhr.send();
});