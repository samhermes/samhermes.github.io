---
title: Excluding Uncategorized when listing categories in WordPress
date: 2019-02-15 00:00:00 Z
layout: post
custom_js: prism
---

Ah, the eternal dilemma. What’s the best way to show a list of categories without including the “Uncategorized” category that WordPress generates by default? I feel like I re-solve this issue each time that it comes up. The issue is that categories can be listed in a couple different contexts, so the solution differs. Sometimes we’re listing all of them on the site or sometimes we’re listing them for the current post. Let’s solve this once and for all!

## For the current post

Whether displayed in an archive or in the single post template, this is when we’re listing categories for a specific post.

The best way to list post categories is `get_the_category()`. It actually returns all categories, despite what its name may imply. Normally, you could use `get_the_category_list()`, but we need to do a little modification before outputting.

Place this function in your `functions.php` file, or in the commonly-used `template-tags.php`.

```php
function custom_get_the_category_list() {
    $categories = get_the_category();
    $uncategorized_id = get_cat_ID( 'Uncategorized' );
    $categories_list = '';

    foreach ( $categories as $category ) {
        if ( $category->category_parent == $uncategorized_id
                || $category->cat_ID == $uncategorized_id ) {
            continue;
        }
        $categories_list .=
            '<li><a href="' . get_category_link( $category->cat_ID ) . '">' .
            $category->name .
            '</a></li>';
    }

    return '<ul class="post-categories">' . $categories_list . '</ul>';
}
```

One thing to call out about this function is that it checks for both Uncategorized itself and any children of Uncategorized. This may vary in your project, but it seems a safe assumption to make.

Now you can just use `custom_get_the_category_list()` anywhere that you would use `get_the_category_list()`. Note for the beginner, it’s best to substitute the name of your project for `custom`.

## For all posts

Listing all of the categories on a site is very similar to listing them for a single post. Instead of `get_the_category()`, we use `get_categories()`. The naming makes a little more sense this time. Again, normally you could just use `wp_list_categories()`, and you’d get an unordered list of categories that included Uncategorized.

Place this function in your `functions.php` file, or in the commonly-used `template-tags.php`.

```php
function custom_list_categories() {
    $categories = get_categories();
    $uncategorized_id = get_cat_ID( 'Uncategorized' );
    $categories_list = '';

    foreach ( $categories as $category ) {
        if ( $category->category_parent == $uncategorized_id
                || $category->cat_ID == $uncategorized_id ) {
            continue;
        }
        $categories_list .=
            '<li><a href="' . get_category_link( $category->cat_ID ) . '">' .
            $category->name .
            '</a></li>';
    }

    return '<ul class="site-categories">' . $categories_list . '</ul>';
}
```

Now you can just use `custom_list_categories()` anywhere that you would use `wp_list_categories()`. Note for the beginner, it’s best to substitute the name of your project for `custom`.