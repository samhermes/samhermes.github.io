---
title: Unregistering widgets in WordPress
date: 2017-06-03 00:00:00 Z
---

If you’ve ever installed Jetpack, you’re probably familiar with widget overload. Sometimes it’s better to cut down on the number of widgets available to your users, both for the benefit of their cognitive load and just for the fact that they may never use some of them. Meta widget, anyone?

Unregistering a widget is a fairly small bit of code, but getting all of the information you need can sometimes be the tricky part.

Here is a function that hooks into the `widgets_init` action in WordPress, and in the function it calls `unregister_widget()` on the widget to remove, the meta widget in this case.

```php
function unregister_widgets() {
  unregister_widget( 'WP_Meta' );
}
add_action( 'widgets_init', 'unregister_widgets' );
```

Where do we know to get the class of the widget though? For all of the WordPress core widgets, you can [reference the codex](https://codex.wordpress.org/Function_Reference/unregister_widget), where all of the widget names are listed. Each starts with `WP_`.

What about widgets that come from other sources, such as a plugin or theme? That can take a little more work. The first and easiest way is to search the source code, and see if you can find where `register_widget()` is being called. In Sublime Text or Atom, you could perform a Find in Files for anywhere that `register_widget` appears in the project and grab the class name from there.

If you don’t have the plugin or theme locally, you could also search the repository on GitHub. Opening the [Jetpack repository](https://github.com/Automattic/Jetpack), the search field in the header will perform searches only within the current repository, so a search for `register_widget` there will return the same results as if we had searched in a text editor.

One last piece is adding a conditional to only unregister widgets if the plugin is actually active. It appears that `unregister_widget` fails gracefully if it can’t find the widget class, but it would be better to just ignore it entirely if the plugin or theme isn’t active. This might take a little investigation as well, but you can check to see if the main class of the plugin exists.

```php
if ( class_exists( 'Jetpack' ) ) {
  unregister_widget( 'Jetpack_Gallery_Widget' );
}
```

If you’re unregistering a group of Jetpack widgets, adding this conditional will be much faster than checking for each widget individually.