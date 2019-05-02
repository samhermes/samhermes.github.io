---
layout: post
title: Append theme version to stylesheet
date: 2017-09-25
categories: [WordPress]
custom_js: prism
---
With browsers getting more aggressive about holding on to local cache, it can be aggravating to hear that an end user doesn’t see updates, or they see something quite broken because a few styles are missing. This can be improved by appending a version number to the end of any stylesheet in your project.

In WordPress, the version number can come straight from the theme. To get the theme’s current version, make a call to `wp_get_theme()`:

```php
$theme_version = wp_get_theme()->get( 'Version' );
```

This returns the theme’s current version and stores it in a variable. To use the `$theme_version` variable when enqueuing styles, add it like so:

```php
wp_enqueue_style( 'theme-style', get_stylesheet_uri(), array(), $theme_version );
```

Of course, for this to be effective, you’ll want to bump your theme’s version any time you have a new release. Now, whether you’re developing or publicly releasing a new feature, you can rest easier knowing that your end users are seeing what you’re seeing.
