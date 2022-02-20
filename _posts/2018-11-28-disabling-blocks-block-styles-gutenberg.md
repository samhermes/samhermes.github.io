---
title: Disabling blocks and block styles in Gutenberg
date: 2018-11-28 00:00:00 Z
tags:
- WordPress
- JavaScript
---

As with most things involving Gutenberg, this could change, and may not be best practice later on, but it's what I've found to work for the time being. Both blocks and block styles can be disabled through JavaScript, using `wp.domReady()`.

First things first, a JavaScript file needs to be enqueued in the Gutenberg editor, which can be accomplished by hooking into `enqueue_block_editor_assets`.

```php
function namespace_block_editor_scripts() {
    wp_enqueue_script( 'namespace-core-blocks', 'core-blocks.js', array( 'wp-blocks' ), '', true );
}
add_action( 'enqueue_block_editor_assets', 'namespace_block_editor_scripts' );
```

Inside of `core-blocks.js`, it's fairly simple to disable blocks and block styles. The tricky part is knowing how they are named, which can take some digging. My example only disables the Verse and Cover blocks, and the "Dots" option in the Separator block. Take note of the two `unregisterBlockType` and `unregisterBlockStyle`.

```js
wp.domReady(() => {
    wp.blocks.unregisterBlockType('core/verse');
    wp.blocks.unregisterBlockType('core/cover');

    wp.blocks.unregisterBlockStyle('core/separator', 'dots');
}
```

Based on the discussion happening in [issue #11338](https://github.com/WordPress/gutenberg/issues/11338) on Github, `wp.domReady()` seems to be the best place to unregister block types and styles at the moment, though it may not be necessary in the future. It would also be nice to control this in PHP, which may eventually be an option as well.

Like I said before, things with Gutenberg are actively changing. I'll be keeping this post updated with the latest information as I learn it. If you know of a better, more official way, do [let me know](https://samhermes.typeform.com/to/d4C4FT)!