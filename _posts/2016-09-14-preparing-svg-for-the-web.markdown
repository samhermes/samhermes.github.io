---
layout: post
title:  Preparing SVG for the web
date:   2016-09-14
categories:
excerpt: I’ve been working with SVG for a while now, and I’ve come to rest on what I’ve found to be the best way to prepare them for the web.
---
I used to be really scared of using SVG, and now I’m just a little bit scared. I think the scary part is that you can easily see the mess inside. It’s all right there, open to edit and optimize. I’ve been working with SVG for a while now, and I’ve come to rest on what I’ve found to be the best way to prepare them for the web. As they are complex, these may not be the best in each and every case, but this is what works for me.

## Saving from Illustrator

I followed the save dialog example given in the [CSS Tricks article on using SVG](https://css-tricks.com/using-svg/) for a while before I got comfortable with it. The article doesn't get into details of the options, so let me step through those. You’ll have to toggle the ‘More Options’ button to get to all of these.

- **SVG Profile**<br>
  Set this to SVG 1.1, which is the current supported version in modern browsers.
- **CSS Properties**<br>
  There’s not a big difference between using a style element, or applying presentation attributes, but I like to use presentation attributes. It makes the resulting document cleaner, and doesn’t muddy it up with classes. We already have enough classes. If you’re going to inline the SVG and use CSS to add additional styles, then classes are the way to go. For static images, presentation attributes make the most sense to me.
- **Decimal Places**<br>
  You’ll want to adjust the amount of decimals on an image by image basis, as some images will break down if you use too few, but it’s always better for performance if you use fewer. I like to get down to about 1 or 2 if possible.
- **Checkboxes**<br>
  I hate to generalize, but if there’s a checkbox with a check in it, uncheck it. We don’t want to preserve editing capabilities, include slicing data or XMP, or make it responsive.

Much of this I was able to verify using an [incredibly helpful answer given on Stack Overflow](http://stackoverflow.com/questions/13236365/optimal-settings-for-exporting-svgs-for-the-web-from-illustrator). It details even further the reasons behind settings, and talks about fonts and images, both of which don’t really seem to belong inside of an SVG.

Once the SVG has been saved from Illustrator, further optimization is necessary. Illustrator includes a generator comment inside the SVG, and does not do any minimization.

## Optimizing for the web

Illustrator gives you a big glob of stuff that you do not need, or want to send down the pipe. SVG is already a little heavier than a PNG anyway, depending, so it’s important to make it as slim as possible.

I use SVGO on the command line to optimize all SVGs. It works great, and I’ll give it credit for warming me up to the command line in general. You just type `svgo`, a space, drag and drop the file onto the terminal window, and hit enter. Done. It will tell you what percentage it has shaved off, which always feels awesome. There is also a web interface, created by Jake Archibald, that will perform the same tasks. It’s accessible at [https://jakearchibald.github.io/svgomg](https://jakearchibald.github.io/svgomg).

A few things you’ll want to look out for:

- Make sure that the height and width are set inside the SVG, not just in CSS. This improves compatibility across browsers. Can I use reports an issue in IE 9–11 where SVGs don’t scale properly without height, width, viewBox, and CSS rules specified, and I’ve had an SVG without height and width collapse to about 3px tall on an older Android device.
- It’s best if the viewBox attribute starts with `0 0`, followed by the width and height of the graphic. This puts the origin of the graphic at the natural origin and matches the viewport to the height and width. A fantastic, thorough explanation of this has been written by Sara Soueidan at [https://sarasoueidan.com/blog/svg-coordinate-systems](https://sarasoueidan.com/blog/svg-coordinate-systems).
