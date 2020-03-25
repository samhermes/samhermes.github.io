---
title: Using a single stylesheet for both block and classic editor
date: 2020-03-25 17:58:00 Z
categories:
- WordPress
custom_js: prism
layout: post
---

When I first started working with the block editor, my assumption was that I would need to define a separate set of styles just for the block editor. While this has never been the guidance from core, I was resistant to the idea that I could enqueue my existing editor stylesheet (from the classic editor) and everything would just work. However, now that I’ve revisited this, I may have been wrong!

Previously, I had maintained an existing `editor-style.css` and added a new `block-editor-style.css` file. This made sense and kept everything siloed and simple. I used `enqueue_block_editor_assets` to enqueue the block editor stylesheet in just the block editor, which worked great.

The cracks began to show with this when the block editor [swapped out many of its existing class names](https://make.wordpress.org/core/2020/03/02/markup-and-style-related-changes/). In order to ensure that my styles in `block-editor-style.css` would override the block editor’s own styles, I wrapped everything in `body.block-editor-page` and used `.edit-post-layout__content` to further increase specificity. Essentially, in WP 5.4, this meant that most of the styles were no longer being applied.

## Merging two stylesheets

The way that a single stylesheet works is that the block editor transforms some of the editor stylesheet classes. In the [theme support documentation on this](https://developer.wordpress.org/block-editor/developers/themes/theme-support/#editor-styles), it states:


> “To make sure your styles are applied only to the content of the editor, we automatically transform your editor styles by selectively rewriting or adjusting certain CSS selectors.”
    

As someone who enjoys having control over things, this is a little spooky. “automatically” and “selectively” send shivers down my spine. But, it seems to work pretty well!

For me, I took all of my `block-editor-style.css` styles and copied them into `editor-style.css`. I removed `.block-editor-page` from the `body` selector. I had existing `body` styles in my `editor-style.css` file, so I merged the two. This didn’t work great. I had previously applied a `max-width`, to restrict the width of the content in the classic editor, and that was now messing up the block editor layout.

To make this work, I added a new style block using the `#tinymce` selector. This effectively acted like the previous `editor-style.css` stylesheet, and only applied to the classic editor.

With these changes, I did have to keep some of the “hacking” (as it appears to be) I had done on some of the editor elements. The page/post title, for instance, is still being targeted using the `.editor-post-title__input` class name. Will this continue to work? Probably not. Again, the class names [just keep changing](https://make.wordpress.org/core/2020/03/02/markup-and-style-related-changes/).

## Enqueuing the new stylesheet

Figuring out just this part was a little confusing. I was using `after_setup_theme` to enqueue the editor stylesheet and a Google font in the classic editor, and then using `enqueue_block_editor_assets` to enqueue the block editor stylesheet and, again, a Google font. Turns out, I could just drop the `enqueue_block_editor_assets` bit, as the Google font was now being included through `after_setup_theme`. This wasn’t working for me previously, so I’m not sure what changed there.

Now, my editor styles enqueue looks like this:

```php
function theme_editor_styles() {
    add_editor_style( 'https://fonts.googleapis.com/css?family=Work+Sans:400,500,700' );
    add_editor_style();
}
add_action( 'after_setup_theme', 'theme_editor_styles' );
```

There is only one last thing to make this work, probably the most important. You have to tell the block editor that you want to use the editor stylesheet in this way. Again, as someone who likes control, I am glad that this is not automatic.

```php
function theme_setup() {
    add_theme_support( 'editor-styles' );
add_action( 'after_setup_theme', 'theme_setup' );
```

Beautiful! Simple! Elegant! Both the classic editor and the block editor are now appropriately styled by the same stylesheet. Now, the only question that remains is, why didn’t I set it up this way to begin with? (the answer is documentation)
