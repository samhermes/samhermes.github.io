---
title: Customize default wp-scripts config
date: 2023-12-28
tags:
  - WordPress
  - JavaScript
---
[`wp-scripts`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/) is a great package for building WordPress blocks, as it takes care of the basic build tooling out of the box, getting block development going quickly. However, while using it, I quickly found myself needing to customize the default configuration. For a while, I used some custom commands in the `scripts` property of package.json, adding additional arguments, but eventually found that changing the config would offer more control.

Fortunately, `wp-scripts` is using webpack under the hood, and so this allows for modifications to be made using a project-specific webpack config. You can either wholesale replace the default config file, or selectively add on top of it. The approach that I took was to add on top of it.

In my case, I wanted to add an additional [entry](https://webpack.js.org/concepts/#entry) for a slotfills file. In some cases, this could be handled in the default webpack config, but I needed to scope the slotfills to a specific post type, while leaving the blocks I'd already created available to any post type.

In order to add a custom config, I created a `webpack.config.js` file in my project. In order to maintain the default config, you import it into your file from the `wp-scripts` package, and then use that variable to apply the default as needed. In mine, I used it to first bring in the defaults for everything, and then brought in the default entries inside of the `entry` object. The [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) before the variable name brings in all elements of the default config.

Once the default config is coming in, I added a new entry called `slotfills`. Here's the entirety of the file from my project:

```js
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const { resolve } = require('path');

module.exports = {
	...defaultConfig,
	entry: {
		...defaultConfig.entry(),
		'slotfills': resolve(
			process.cwd(),
			'src/js/slotfills',
			'index.js'
		),
	}
};
```

The great part of this is that I didn't need to do anything else. `wp-scripts` immediately began picking up the new config, as webpack will check for a project level config file.

For better visibility into exactly what this is adding to, you can view the [full default wp-scripts webpack config on GitHub](https://github.com/WordPress/gutenberg/blob/trunk/packages/scripts/config/webpack.config.js). You can see why you might not want to do a wholesale replacement, as there's a lot there, and you likely want to be able to automatically receive updates with future versions.

For more about setting up `wp-scripts`, [see this article on the WordPress dev site](https://developer.wordpress.org/block-editor/getting-started/devenv/get-started-with-wp-scripts/).