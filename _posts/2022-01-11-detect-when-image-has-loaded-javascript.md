---
title: Detect when an image has loaded with JavaScript
date: 2022-01-11 17:36:00 Z
tags:
- JavaScript
---

When you’re wanting to make something happen after an image has completely loaded, you need an event to attach your script to. This can be a little tricky to get right, but with a combination of event listeners and the image `complete` attribute, it’s possible.

Before I get carried away with this custom approach, I want to call out that a package exists to handle this called [imagesLoaded](https://imagesloaded.desandro.com). I haven’t used this myself, but it would probably be more appropriate for a larger project where images are a key feature.

## The image `complete` attribute

The `complete` attribute ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/complete)) is the key to this approach. Essentially, we need to look to this attribute to get a status of whether or not an image has loaded.

Critically, we need to define what “complete” really means here. It can be true if an image is ready to display, but it can also be true if the image failed. This complicates matters, as we’ll need to check the `complete` attribute, and also verify that the image load was a success.

## The `load` event listener

The other half of this approach is the event listener. This is similar to other common event listeners, where it fires when something changes. Instead of a keystroke, we listen for the image to communicate that it has loaded.

The nuance with this event listener is that we want to use the `complete` attribute, and only apply the event listener if the image is not complete. If it’s already loaded, whether it just downloaded before our listener was attached, or is cached in the browser, we don’t need to listen for the `load` event, as it won’t happen.

I’ve also included an event listener for an `error` event, in case the image fails to load for whatever reason. This could be used to show an error message, or offer the user an alternative.

```jsx
const image = document.querySelector('.container img');
if ( !image.complete) {
	image.addEventListener('load', handleImageLoad);
	image.addEventListener('error', handleImageLoad);
}
```

## The listener function

Now that we have a way to check the image status, and we’re listening for the `load` event, we need a function to actually make something happen. In this example, the function removes an active class from the container. We could use this in our CSS to show/hide the loading animation or image.

```jsx
const handleImageLoad = () => {
	container.classList.remove('is-loading');
	image.removeEventListener('load', handleImageLoad)
}
```

Additionally, you may have noticed, this function also removes the event listener from the image. This is good cleanup to do so that the browser isn’t waiting for anything else to happen with the image.