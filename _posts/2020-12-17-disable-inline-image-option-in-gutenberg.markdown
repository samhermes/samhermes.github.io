---
title: Disable inline image option in Gutenberg
date: 2020-12-17 04:53:00 Z
categories:
- WordPress
layout: post
custom_js: prism
---

In Gutenberg, several core blocks include the option to insert an inline image. This is not an image float, but rather an image, literally, inline. It works anywhere that RichText is used, so headings, paragraphs, lists, buttons, all include this ability. If used properly, this is fine. It's valid HTML. However, it is an aesthetic disaster.

Confusingly, this inline image option is called a "format" in the Gutenberg code, which only makes sense when you see that it's grouped with bold, italic, etc. RichText includes a RichTextToolbar, where these options are presented to the user. All of this makes it rather difficult to search and find a proper solution, so it took me a while to unearth this.

To disable any of the formats available in the RichTextToolbar, like so:

```js
wp.richText.unregisterFormatType('core/image');
```

I wish that options like these were easier to disable, or just easier to learn how to disable. The option above applies to all blocks, which is unfortunate, as the most ideal situation here would be the ability to disable block-by-block. Now, if we could just get rid of the block radius setting.