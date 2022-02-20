---
title: How to add multiple default markers with popups in Mapbox GL JS
date: 2018-10-10 00:00:00 Z
tags:
- JavaScript
---

To create my travel map, I used Mapbox GL JS. After the map embed loads from Mapbox, it fires off an ajax request to a WordPress site where the location data is stored. The map gets the response in JSON, which is then used to build a geoJSON object that the map will understand. From there, adding the data to the map is fairly easy, if you know what you’re doing.

Adding a single marker to a Mapbox embed is straightforward. The Mapbox documentation site provides a [working example](https://www.mapbox.com/mapbox-gl-js/api/#marker) that can be emulated, but doesn’t give explicit instructions for what to do if you have multiple points. In my case, I also wanted to add a popup for each of the markers with a title and visit count.

Now that I’m on the other side of this issue, it seems so straightforward. In order to get here, though, I used a [store locator demo from Mapbox](https://www.mapbox.com/help/demos/gl-store-locator/step-five.html). It’s slightly more complicated than what I was looking for, but it contained the structure that I was looking for. If you open the inspector on that page, there’s a script tag at the bottom of the page that contains the relevant JS.

To add more than one marker, all that’s needed is a `forEach` loop. If coming from geojson, you can loop over the `features` array. In the store locator demo, that looks like this:

```js
stores.features.forEach(function(marker) { ... }
```

Within the forEach, it’s simple to create a new marker for each point in the `features` array.

```js
new mapboxgl.Marker()
    .setLngLat(marker.geometry.coordinates)
    .addTo(map);
```

The store locator example, like all of the others provided by Mapbox, uses a custom icon for each marker. I prefer the default Mapbox marker style, so the part of the demo where it creates an empty div for each marker is unnecessary, and actually removes the default icon when set in the `new mapboxgl.marker` call.

To add a popup to each marker, there are a number of ways to go about it. This was confusing to me at first, as some demos show a way to use just one popup, and update it as each marker is clicked on or activated. This is not necessary, as you can create a popup for each marker, and the map handles the display.

Above the `new mapboxgl.Marker()` call above, building a popup is done very similarly:

```js
var popup = new mapboxgl.Popup()
    .setText(marker.properties.title);
```

With a popup created, a slight modification to the marker setup will ensure that the popup is attached to the appropriate marker.

```js
new mapboxgl.Marker()
    .setLngLat(marker.geometry.coordinates)
    .setPopup(popup)
    .addTo(map);
```

An archived, working version of this code can be [seen on Github](https://github.com/samhermes/samhermes.github.io/blob/e03be05ef9544bf4f5bc7d13b93c9ac709354cd9/js/travel-map.js), where I customize the popup styles a bit.