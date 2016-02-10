---
layout: post
title:  "Using vertical height media queries with fixed headers"
date:   2016-01-03 12:00:00 -0600
categories:
excerpt: On a site with tall pages, setting up a fixed header can make a lot of sense. Why not use that extra screen real estate? The philosophies of responsive design can and should apply to this as well.
custom_js: prism
---
On a site with tall pages, setting up a fixed header can make a lot of sense. Why not use that extra screen real estate? The philosophies of responsive design can and should apply to this as well. Screen height should be taken into account, and fixed headers should be disabled if there is not enough height for them to be useful (although, I would argue that they are never useful).

Let's say that the fixed header on a site is 80px tall. Nothing too unruly, but it might get in the way of someone on a smaller laptop as they are browsing your site. In this example, you could set the header to fixed if the viewport is at least 800px tall. Any shorter and let that header scroll away out of sight.

<pre><code class="language-css">@media screen and (min-height: 800px) {
    header {
        position: fixed;
        top: 0;
        left: 0;
    }
    body {
        margin-top: 80px;
    }
}</code></pre>

You’ll want to replace the space you’re creating when the header is fixed by applying the height of the header as margin-top of the body element.

To take this a bit further, you could combine this with a max-width media query so that the header would not be fixed below a specified width, something like 600px. In that way, you are only applying a fixed header when there is plenty of room.
