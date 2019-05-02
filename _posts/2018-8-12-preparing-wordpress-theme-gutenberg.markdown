---
layout: post
title: Preparing a WordPress theme for Gutenberg
date: 2018-08-12
categories: [WordPress]
custom_js: prism
---
As the launch of Gutenberg gets closer and closer, now is as good a time as any to make preparations. My theme that is live in the theme directory, [Halle](https://wordpress.org/themes/halle/), works fairly well with Gutenberg without any changes, but there are some small modifications that I’d like to make to improve the overall experience and to take full advantage of what Gutenberg offers.

## Matching editor styles to the front end

Gutenberg is fantastic for the way it allows the back end editing experience to mirror the front end display, if you desire. With some slight modifications, it’s really easy to bring the styles into alignment. Just to start, you can register the same Google Fonts in the editor.

This is fairly similar to the `wp_enqueue_scripts` action that is typically used for front end styles, the difference is that `enqueue_block_editor_assets` just enqueues the styles in the Gutenberg editor.

```php
function halle_block_editor_styles() {
    wp_enqueue_style( 'halle-editor-fonts', 'https://fonts.googleapis.com/css?family=Work+Sans:400,500,700|Poly:400,400i' );
}
add_action( 'enqueue_block_editor_assets', 'halle_block_editor_styles' );
```

Previously, I was adding Google fonts to the editor using `add_editor_style( )` and passing in the stylesheet URL. As some users will still be using the classic editor, and some will use Gutenberg, I’ll leave both of these in place. I’m not sure when I’ll be able to remove the old `add_editor_style()` declaration, but I’d say that I would leave it in for a year or so as users upgrade and transition.

Now that the fonts are enqueued, we need to use them for the post/page title and other text blocks. I created a new Sass file called `block-editor-styles.scss` in the theme, and enqueued it inside of the `halle_block_editor_styles()` function that I used above.

Taking a cue from the [Gutenberg Handbook](https://wordpress.org/gutenberg/handbook/extensibility/theme-support/#editor-styles), I started with a parent selector of `body.block-editor-page`, and then nested all of the following styles within.

```css
.edit-post-visual-editor {
    font-family: 'Poly', serif;
}
```

The `.edit-post-visual-editor` class is a parent class for the editor, so this font family declaration cascades down into most elements in the editor. Gutenberg’s styles are taking the same approach, so overriding using this method is easy.

Although the cascade works fairly well, both the post title and paragraphs need just a bit more specificity to override. Again, these are both nested inside of `body.block-editor-page`.

```css
.editor-post-title__input,
p {
    font-family: 'Poly', serif;
}
```

I could go further with these styles, but your theme will likely differ from mine. The next item that I addressed was the `max-width` of each block. You can see how I accomplished this and some other modifications [in the Halle repo on GitHub](https://github.com/samhermes/halle/blob/gutenberg/sass/block-editor-style.scss).

## Customizing block styles

Out of the box, Gutenberg provides a range of blocks. By default, Gutenberg serves a new core blocks stylesheet to the front of your site to properly style each block. At the moment, the handbook states that these styles are an opt-in feature, but that doesn’t seem to be the case, as they are being served up without any additional action.

At the moment, blocks will generally look the same in both the editor and the front end, but they likely will not fit with the style of your theme. Handling this will vary by instance. I am going to start with what Gutenberg offers and slightly modify from there. Fortunately, Gutenberg has block-specific classes that it applies to each element, so any styles that I add will not interfere with anyone who does not yet have Gutenberg in use.

For now, I am just modifying a few blocks, as these seem to be the most opinionated (as far as styles go) of the core blocks.

### Button

The button block has a number of options associated with it, but I primarily wanted to reduce the border radius (everything is so round now?!). This was accomplished by using `.wp-block-button.wp-block-button__link`.

### Block Quote

The `blockquote` styles provided by Gutenberg aren’t too specific, but in my case, I needed to add support for the `blockquote` citation that is now available. Previously, I was relying on the bottom margin of the `blockquote` paragraph element, and needed to shift that to the `blockquote` element itself.

### Horizontal Rule

Gutenberg offers three `<hr>` styles: short line, wide line, and dots. Previously, I was using a background color to provide the rule, but this interferes with how Gutenberg styles rules. I transitioned my styles from `background: #ccc` to `border-top: 1px solid #ccc`.

The confusing part here is that Gutenberg defaults to the short line style, but currently doesn’t serve styles for it to the front end, only for the wide line and dots styles. So, if nothing is done, the short and wide lines look the same on the front end. I’ve added styles to Halle’s stylesheet to remedy this.

## Enabling wide images

Wide images are the biggest reason to revisit the layout of your theme. In Halle, individual posts have a sidebar when the screen is wide enough to accommodate it. This is not conducive to wide images. This led me to question whether or not I could make the layout an option, so that the user could choose the sidebar layout, or a centered layout.

To enable wide images, all that is required is the following, added to `after_setup_theme`.

```php
add_theme_support( 'align-wide' );
```

There are several approaches to take to support wide images on the front end. You could make the parent element of the post content 100% width, and then place a `max-width` on everything except for wide images. Or, instead, you could break the wide images out of the container. This method is described in [this article from Bill Erickson](https://www.billerickson.net/getting-your-theme-ready-for-gutenberg/). I prefer the former approach.

I haven’t implemented wide images in Halle yet, as this will involve much deeper changes to the foundational layout of the theme, and there’s already enough change happening. I’ll come back to this at a later time.

## Color palettes

If your theme contains a specific color palette, or you are working with brand colors, customizing the color palette available to users is a great way to encourage consistency. I won’t go into how to accomplish this specifically, but it’s worth noting that this is available. More information is detailed in the [Gutenberg Handbook](https://wordpress.org/gutenberg/handbook/extensibility/theme-support/#block-color-palettes).