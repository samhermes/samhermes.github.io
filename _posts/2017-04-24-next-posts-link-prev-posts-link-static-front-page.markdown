---
layout: post
title: Using next_posts_link() and prev_posts_link() on static front page
date: 2017-04-24
categories: [WordPress]
custom_js: prism
---
If you have a custom query of posts on a static front page in WordPress, adding pagination can be a confusing experience. The answer is fairly simple, if you’ve done it before. Prior to last week, I had not done it before, and I was very lost. Search results were driving me all kinds of places. Fortunately, you’ve landed here.

The issue is that the `paged` query variable isn’t called `paged` on the homepage, but rather `page`. Both `next_posts_link()` and `prev_posts_link()` utilize the query variable, and a custom query is looking for the `paged` variable. To remedy this, you need to alter your query. In my specific case, the template partial could be used on a static front page or on any other page. Because of that, the following checks to see which is appropriate to use:

```php
global $paged;

if ( get_query_var( 'paged' ) ) {
	$paged = get_query_var( 'paged' );
} elseif ( get_query_var( 'page' ) ) {
	$paged = get_query_var( 'page' );
} else {
	$paged = 1;
}
```

Once the `$paged` variable has been properly set, both `next_posts_link()` and `prev_posts_link()` will work as expected.

I’ll note that `paginate_links()` works without making the modification I’ve outlined, if that’s the pagination structure you’re looking for. In my case, it was a bit more than I needed.
