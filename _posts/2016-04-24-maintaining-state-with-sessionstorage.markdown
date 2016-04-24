---
layout: post
title:  Maintaining state with sessionStorage
date:   2016-04-24
categories:
excerpt: When a multi-level menu is collapsed on a small screen, it can difficult to communicate a sense of place as someone is navigating between pages. One way to manage this is to let the browser remember your location with sessionStorage.
custom_js: prism
---
When a multi-level menu is collapsed on a small screen, it can difficult to communicate a sense of place as someone is navigating between pages. If the page is several levels deep in the hierarchy, it is really frustrating to dig back down to it if you’d like to view a sibling page. One way to manage this is to let the browser remember your location with sessionStorage.

To start, you need to give a unique ID to each menu item that has children. If you’re working with WordPress, you could use the built in page ID, since you know that it will be unique.

We only need to keep one ID in sessionStorage at a time, so we listen for a click event on all of the elements serving as a toggle and update sessionStorage each time.

<pre><code class="language-javascript">$('.main-menu li').click(function() {
  var menu_state = $(this).prop('class').match(/page-([0-9]+)/)[1];
  sessionStorage.setItem('menu_state', menu_state);
}</code></pre>

This sets the name of the sessionStorage item to be ‘menu_state’, and then stores the ID as the value. As a submenu is toggled, this value is updated. Move to another page, and the last value is still remembered by the browser.

You can view all of the sessionStorage items that have been set in your browser in the web inspector. In Chrome, go to the Resources tab. In Safari and Firefox, go to the Storage tab. A nice feature of sessionStorage is that the browser clears it as soon as you close the page.

Retrieving a value from sessionStorage is very similar to setting it. We perform this action when the document is ready instead of waiting for a click event.

<pre><code class="language-javascript">var menu_state = sessionStorage.getItem('menu_state');
if( menu_state ) {
  $('.page-' + menu_state).addClass('open');
}</code></pre>

This applies a class of `open` to the menu that was open on the last page. Now, given that `open` has a bit of CSS behind it, when someone opens the mobile menu, they’ll still be in the same place where they were. Magic.
