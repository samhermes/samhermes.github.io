---
layout: post
title:  "Caching a menu in a transient in WordPress"
date:   2016-03-30 15:38:00 -0600
categories:
excerpt: Menus in WordPress are expensive to generate, in terms of site performance. What if we stored the menu in a transient, and applied the current page classes on the front end using JavaScript?
custom_js: prism
---
Menus in WordPress are expensive to generate, in terms of site performance. On every page load, the site is rebuilding almost the exact same thing, and it gets more expensive as the number of menu items increases. The only difference between pages is the current page classes that get applied. What if we stored the menu in a transient, and applied the current page classes on the front end using JavaScript?

The first thing we do is check to see if the transient doesn’t exist with a conditional (which it doesn’t, yet), using get_transient and passing in the name of the transient, which we’ll specify later.

<pre><code class="language-php">if ( ! get_transient( 'header-menu' ) ) {</code></pre>

Next, if the transient doesn’t exist (which it doesn’t, yet), we generate the menu, and store the result in a variable.

<pre><code class="language-php">$menu = wp_nav_menu( array(
  'theme_location' => 'header-menu',
  'echo' => 0
) );</code></pre>

We need to disable echo here, as we don’t want to print it to the page just yet.

Once we have the menu stored in a variable, we can set a transient. This part of the process is relatively simple. You give the transient a name, pass in the menu variable, and tell it how long to keep it before clearing it.

<pre><code class="language-php">set_transient( 'header-menu', $menu, 60*60*24 );</code></pre>

In this example, I’ve named the transient “header-menu”, and told it to save it for 1 day (60 seconds times 60 times 24). I’m not sure what the ideal transient lifetime is, but if the menu will rarely change, you could set it for much longer than a day.

Next, continuing with the conditional, if the transient does exist, we just need to retrieve it and set it to the menu variable. And, after that, we echo out the menu variable.

<pre><code class="language-php">} else {
  $menu = get_transient( 'header-menu' );
}
echo $menu;</code></pre>

The last piece of the transient is clearing it whenever an update is made to the menu. This function can be added to functions.php. This function looks for a menu in the ‘header-menu’ menu location.

<pre><code class="language-php">function site_nav_clear_transient( $menu_id ) {
  $theme_locations = get_nav_menu_locations();
  $term = get_term( $theme_locations['header-menu'], 'nav_menu' );
  $id = $term->term_id;
  if ( $menu_id = $id ) {
    delete_transient( 'header-menu' );
  }
}
add_action( 'wp_update_nav_menu', 'site_nav_clear_transient' );</code></pre>

That’s it for the transient, but now we need to reapply the class for the current page. We accomplish that with a little jQuery.

This approach is fairly simple. On page load, we get the URL of the current page using <code>window.location.href</code>, store the result in a variable, and then use that variable to find a matching <code>href</code> attribute. It’s as simple as:

<pre><code class="language-javascript">var url = window.location.href;
$('.header-menu a[href="' + url + '"]').addClass('current-page');</code></pre>

The jQuery selector looks for an anchor tag inside of an element with the class of ‘header-menu’, matches the url variable we passed in, and then adds a class of ‘current-page’.
