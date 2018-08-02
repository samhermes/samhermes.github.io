---
layout: travel-map
title: Travel Map
custom_js:
- js/travel-map
custom_css: /css/travel-map
---
<div id="travel-map" style="width: 100%; height: 500px;"></div>
<script>
mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtaGVybWVzIiwiYSI6ImNpbGxjeGhmYzVvMm52bm1jdmx0NmtvbXoifQ.uf5gBnnbU05bnaw7atDu9A';
var map = new mapboxgl.Map({
    container: 'travel-map',
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 3,
    center: [-95.7129, 37.0902],
    scrollZoom: false,
});
</script>
