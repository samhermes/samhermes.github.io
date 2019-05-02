---
layout: post
title:  Output featured image caption in WordPress
date:   2016-01-30 12:00:00 -0600
categories: [WordPress]
custom_js: prism
---
It's relatively easy and well documented to output a featured image, but getting the caption is a little trickier. Here's the code I use:

```php
$post_thumbnail_caption = get_post( get_post_thumbnail_id() )->post_excerpt;

if ( ! empty( $post_thumbnail_caption ) ) {
    echo '<p class="featured-image-caption">' . esc_html( $post_thumbnail_caption ) . '</p>';
}
```

Note: If you are expecting to output HTML inside captions, use `wp_kses_post()` in place of `esc_html()`. While not as performant, it allows the same tags that are allowed inside post content, such as links, italics, bolding, etc.

<p class="last-updated">Last Updated: 2/3/2016</p>
