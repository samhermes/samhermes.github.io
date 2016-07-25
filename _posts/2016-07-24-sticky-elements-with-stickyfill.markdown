---
layout: post
title:  Sticky elements with Stickyfill
date:   2016-07-24
categories:
excerpt: There are many ways to implement sticky behavior, but as support comes to browsers natively, the best way right now is to use a polyfill.
custom_js: prism
---
Sticky elements seem to be everywhere, following you wherever you scroll. There are many ways to implement sticky positioning, but as support comes to browsers natively, the best way right now is to use a polyfill. This is where Stickyfill comes in. If `position: sticky` is not supported, it mimics the behavior. As soon as support comes to all major browsers, the polyfill can be removed. At the moment, it is supported in Firefox and Safari, and is behind a flag in Chrome and Opera. Considering that it is most commonly used on larger screens, the support is strong.

You can [download Stickyfill on Github](https://github.com/wilddeer/stickyfill). There is a demo and a few use cases provided. I’m sure there are some cases where this isn’t the best option, but I think the polyfill approach is best in most implementations.

Taken directly from the readme, you can hook Stickyfill up with the following JavaScript:

<pre><code class="language-javascript">var stickyElements = document.getElementsByClassName('sticky');
for (var i = stickyElements.length - 1; i >= 0; i--) {
  Stickyfill.add(stickyElements[i]);
}</code></pre>

I have been using Stickyfill with a WordPress site, so I have changed the class to simply `stick` so that it will not interfere with sticky posts.

While your implementation may be much more complex, applying the following styles to a sidebar would be all you would need to get started.

<pre><code class="language-css">.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}</code></pre>

In my project, I set the value of top to `15px` to give a little room above the element. Also, I added an additional selector that would account for the WordPress admin bar, so the value of top is `47px` when the `.admin-bar` class is present. This makes sure that even users who are signed in see a properly formatted site.
