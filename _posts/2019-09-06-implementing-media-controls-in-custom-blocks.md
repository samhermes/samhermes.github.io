---
title: Implementing media controls in custom blocks
date: 2019-09-06 22:51:00 Z
---

I’ve been deep in block development for the past few months, and through that, I’ve had to learn a lot of stuff! It’s been really fun, and at times a little challenging. One of the most confusing parts has been media controls. There doesn’t seem to be a plug-and-play implementation that Gutenberg gives you, which is great for flexibility and not so great for times that you just want to get going.

So, what do we want to be able to do?

1. Upload images from our device or choose from the media library
2. Have the chosen image display in our block the way that it would on the front end
3. Allow the image to be updated later

Fair warning, this is going to be a fairly slow explanation of what’s going on. If you’d like to see all of this together at once, head over to the Gutenberg Github and [view the Media & Text edit function](https://github.com/WordPress/gutenberg/blob/master/packages/block-library/src/media-text/edit.js). I pulled a great bit from there.

## The two media components

Gutenberg comes with two media components, `mediaUpload` and `mediaPlaceholder`. `mediaPlaceholder` makes use of `mediaUpload`, but gives us a little UI on top. For most blocks that need a standard media upload control, `mediaPlaceholder` is a great place to start. To add both of them to your block:

```js
const { MediaPlaceholder, MediaUpload } = wp.editor;
```

Of course, only add the one you need, if that’s the case. However, we’re going to take advantage of both, in different ways. Here we go!

## Implementation

This is where things are a bit of a free-for-all, and you can really accomplish about anything that you’d like to. You could put all of the controls right in the block itself, in the block’s toolbar, or in the inspector controls in the sidebar. You could go absolutely mad!

**Following WordPress**

You needn’t look far to get an impression of how the core developers think that this should work. It’s never explicitly said anywhere, but looking at the Media & Text block, you can see that the initial image upload is handled within the block itself, and then updates to the image can be made through a button in the toolbar.

I believe in following WordPress, so that’s where I'm going to take this. First, we need to add a couple of attributes to our block for the image URL.

```js
attributes: {
  mediaUrl: {
    type: 'string',
  }
},
```

Next, we can add a `mediaPlaceholder` to prompt the user to choose an image. Within the edit function of the block, right inside the block’s JSX, we add the following:

```js
{% raw %}<MediaPlaceholder
  icon="format-image"
  labels={{
    title: __('Media area'),
  }}
  className="block-image"
  onSelect={onSelectMedia}
  accept="image/*"
  allowedTypes={['image']}
/>{% endraw %}
```

This gets you pretty far, but this really needs to be nested inside of a conditional that will handle displaying the image on the page after you’ve uploaded or chosen it.

**Image conditional**

In this implementation, the conditional can be fairly simple. We check the attribute that we’re storing the image URL in, and if it has a URL, we render the image, and if not, we display the media placeholder.

```js
{% raw %}{mediaUrl ?
  <div className="block-image" style={{
      backgroundImage: `url(${mediaUrl})`
  }}></div>
  :
  <MediaPlaceholder
    icon="format-image"
    labels={{
      title: __('Media area'),
    }}
    className="block-image"
    onSelect={onSelectMedia}
    accept="image/*"
    allowedTypes={['image']}
  />
}{% endraw %}
```

You can see here that we’re sharing a class name between both the image markup and the media placeholder. This allows the styles to be shared between both. Depending on your block, this may not be what you’re needing. You could split this into two classes and style accordingly.

The major functional piece of the MediaPlaceholder element is the `onSelect` property. It accepts a callback function that handles the image upload process and stores the resulting image attributes.

**Setting up the callback function**

This is the part of the media control that really complicated things for me. It’s incredibly flexible, but leaves a lot to the developer. Maybe too much. `mediaUpload` and `mediaPlaceholder` are just components, and they do not carry much functionality with them. The callback function needs to pull out the appropriate media attributes after a user makes a selection.

Looking at the Media & Text block in Gutenberg, the `onSelectMedia` seems fairly straightforward, apart from the `get` function that is used to pick apart the media attributes in order to retrieve the URL of a specific image size. My inclination here was to reproduce this without depending on Lodash, but I wasn’t able to make it happen. This is something I want to work on in the future.

In order to take advantage of `get`, lodash needs to be added to the project dependencies. In the console:

```bash
npm install lodash
```

After it’s been added, we can then bring in just the `get` function to our block:

```js
import { get } from 'lodash';
```

Now, on to the `onSelect` function. We bring in `setAttributes` from the block’s props. Next, it retrieves the large image size URL, falls back to the full size URL if needed, and then stores the URL in state. This function is a simplification of what is used in the Media & Text block in Gutenberg.

```js
onSelectMedia( media ) {
  const { setAttributes } = this.props;

  // Try the "large" size URL, falling back to the "full" size URL below.
  let src = get( media, [ 'sizes', 'large', 'url' ] ) || get( media, [ 'media_details', 'sizes', 'large', 'source_url' ] );

  setAttributes( {
    mediaUrl: src || media.url,
  } );
}
```

With this, we’re nearly done. As soon as a user selects an image from the placeholder, it will be placed in the block due to our conditional. As soon as `mediaUrl` receives a value in state, it will equate to true. However, now that we have an image in our block, how do we change it?

**Adding a media upload control to the toolbar**

There are a number of ways to handle image modification. We could add our own button over the top of the image, add something to the inspector, or, the WordPress way, we could add a control to the block’s toolbar. You probably saw that coming.

We’re already importing the media components, we just need a few more. First, we bring in `BlockControls`. It basically just acts a wrapper. In fact, [look at the source](https://github.com/WordPress/gutenberg/blob/master/packages/block-editor/src/components/block-controls/index.js), there’s hardly anything there. React is… interesting.

```js
const { BlockControls, MediaPlaceholder, MediaUpload } = wp.editor;
```

Next, we need the `Toolbar` and `IconButton` components. They’re coming in from `wp.components` rather than `wp.editor` like the other components.

```js
const { Toolbar, IconButton } = wp.components;
```

When I began doing block development, I was confused about all of this, and wondered why all of this stuff wasn’t already available. Well, friends, that is not the case. The computer will definitely be very angry if you do not specifically bring in what you need. Do not bring someone to the party if they were not first invited.

In the edit function, right above the JSX for the block, we’ll add the new `MediaUpload` component, amongst our new components. Like so.

```js
<BlockControls>
  <Toolbar>
    <MediaUpload
      onSelect={onSelectMedia}
      allowedTypes={['image']}
      value={mediaUrl}
      render={({ open }) => (
        <IconButton
          className="components-toolbar__control"
          label={__('Edit media')}
          icon="edit"
          onClick={open}
        />
      )}
    />
  </Toolbar>
</BlockControls>
```

Much of this is the same as what we did for the `MediaPlaceholder` above. Big difference here is that we have a value attribute with the `mediaURL` assigned to it.

Of note here is the `IconButton` component. This is what actually adds a user-interactive control to the toolbar. It needs a class of `components-toolbar__control` to match the style of other toolbar buttons, a requirement that I hope goes away at some point.

When a user engages the edit button, a media modal pops up, and then they are able to either upload a new image, or choose something else from the media library. Fancy!

## Wrapping up

Hate to say it, but this may have been more information than one article could handle. Unfortunately, media in Gutenberg is a tricky one! I didn’t even take this as far as I very well could or should have. Below, I’ve started a short list of things I hope to explore. Hopefully I’ll be back with answers one of these days.

**Questions or Improvements Remaining**

- How can we output responsive image markup?
- How much of the image metadata should we store in our attributes? Should we add alt text?
- I showed how to output the image as a background. How would this be different for an image tag?
- Getting back to my earlier question, can we handle image uploads without the Lodash dependency? Does it matter?
- What if Gutenberg just did all of this for us?
- How do I keep all of my other life memories in my brain if they are getting crowded out by React info?