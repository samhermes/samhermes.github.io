---
title: Getting to know theme.json
date: 2022-05-14
tags:
- WordPress
---

When developing a custom WordPress theme for usage with the block editor, there can be an overwhelming amount of possibilities to account for. Countless settings, combinations, and layout conundrums can make it difficult to apply a consistent look and feel, whether it’s to match a brand, or just a casual blog. At its release, the block editor offered few ways of controlling these possibilities. Theme.json aims to address this, allowing theme authors to dramatically scale back the options and settings offered out of the box.

There is thorough documentation on [how to use theme.json on wordpress.org](https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/), so I won’t go into too much specific detail. I’d like to give context, look at what’s still missing, and give just enough info on how to get started.

## What does theme.json do?

theme.json provides a way to disable controls in the block editor, both in the block toolbar (immediately above a block when it’s selected) and in the inspector controls (right sidebar, gear icon). So, think of font sizes, color selectors, button radius. In addition, it provides a mechanism for tweaking the default styles used by the block editor in the admin and on the front end. This could be global typography styles, or something as simple as the space between columns in the column block.

On a more “experimental” or “beta” note, theme.json provides controls for [block themes](https://developer.wordpress.org/block-editor/how-to-guides/themes/block-theme-overview/), but that’s a topic for another day. It appears that the styles control provided by theme.json is also geared heavily towards block themes as well.

### Opt-in controls

By and large, theme.json exists to disable controls, but there is a small subset of “opt-in” controls, which can be enabled via theme.json, either individually or wholesale using `appearanceTools` set to `true`. Documentation on what these are is [available on wordpress.org](https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/#opt-in-into-ui-controls). 

Most interesting of them is the `spacing` control, which seems to be quite limited at this time, but holds potential. It would be nice if we could move away from the core spacer block.

Included in the list is also `border` controls, which seems to be in a strange state, as there are border controls on a few different blocks by default. I’m not sure what opting in to border controls adds. I did find that I had to disable border controls on a block-by-block basis, attempting to disable globally didn’t have any effect. See the example at the bottom of this post.

### Looking down the road

For better or worse, applying changes to theme.json does not update any block retroactively. So, disabling the font size control will not revert the font size to the default on any existing block that has a custom font size. Depending on your circumstances, this could be good. It does suggest to me that it might be best to start a project with almost everything disabled, and then enable features as needed to avoid content from getting away from you, especially in those cases where many people could be editing the content of the site.

On the flip side, removing a color from a color palette does, in fact, remove it from any block currently using it. There is the possibility of continuing to support a color, however, by defining styles to match the appropriate class names in your theme stylesheet.

## What does this replace?

For those who are already familiar with theme development in a block editor world, theme.json seeks to replace the accumulating list of formatting-related `add_theme_support()` options that have cropped up since the block editor’s inception. As these were getting to be unwieldy, theme.json seeks to provide a more extensible approach. The theme.json documentation provides a [list of equivalents](https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/#backward-compatibility-with-add_theme_support). In short, theme.json takes precedence, so any `add_theme_support()` calls related to the block editor that you’re making in functions.php should be migrated over.

Fortunately, theme.json expands the possibilities compared to what is available via `add_theme_support()`, so, while it’s a bit of work to get spun up, this is a better long term approach.

For those of us who were scrambling to tamp down the block editor soon after it was merged into core, this also hopefully replaces any of the hacky CSS that was required to hide any control that did not have a matching `add_theme_support()` for it. Which, at the time, was most controls.

### Custom color palette

Part of the conversion from `add_theme_support()` to theme.json, is, of course, color palettes. I’m certainly in favor of this, as it is now as simple as defining the color names and values in theme.json, and letting WordPress do the rest. Previously, as you may know, you needed to define all of the colors using `add_theme_support()`, and then additionally define them in your own stylesheet (with all the appropriate class names) to get them to actually work on the front end.

In general, it’s nice to see WordPress moving more into custom properties, as it makes modifications much easier from a theme development standpoint. Custom properties ftw!

### Block editor width

Previously, to adjust the max-width of the block editor, it would require an `editor-style.css` stylesheet to be enqueued, and a style selector of `.wp-block { max-width: 750px; }`, as an example. Now, this can be handled through theme.json.

```json
"layout": {
	"contentSize": "750px",
	"wideSize": "1200px"
},
```

This still does not address the issue of differing content widths on different post types. Wide pages and narrow posts, anyone? Is that so rare? Please tell me I’m missing something?

## What doesn’t theme.json do?

You could read this heading quite optimistically, but I’m afraid that that isn’t the case. To disable any of the following, it appears to still [require a little JS in the editor](https://samhermes.com/posts/disabling-blocks-block-styles-gutenberg/).

- Disable core blocks completely with `wp.blocks.unregisterBlockType()`
- Disable style options associated with core blocks with `wp.blocks.unregisterBlockStyle()`
- Disable inline formatting options with `wp.richText.unregisterFormatType()`

## How to get started

It should be noted that theme.json is on version 2 already, so caution should be applied when using examples floating around. They could be out of date and not work as expected. The best documentation remains on [wordpress.org](https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/).

To start, create a file called `theme.json` in the root of your theme. WordPress will automatically pick this file up, so its very existence is enough.

The contents of the theme have to be in JSON format. There are a lot of possibilities, so a schema was created to assist. In Visual Studio Code, it will use the schema to suggest supported options, and fill the default value when a suggestion is selected. It will also let you know of any misspellings.

The very basic structure:

```json
{
	"$schema": "https://schemas.wp.org/trunk/theme.json",
	"version": 2,
	"settings": {},
	"styles": {},
}
```

Most of the action takes place under `settings`. There, it’s broken down into global settings and block-level settings. You can define a global setting, and then override it on specific blocks. For example, you could disable custom font sizes across the board, and then re-enable them on just the heading block. You can see [examples of this on wordpress.org](https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/#settings-examples).

## Sample theme.json starter

This is what I’m currently using to start my projects with. It disables some of the more freeform controls, while leaving some of the basics in tact. It disables the default color palette, with the assumption that this will be set on a project-by-project basis.

```json
{
    "$schema": "https://schemas.wp.org/trunk/theme.json",
    "version": 2,
    "settings": {
        "color": {
            "custom": false,
            "customDuotone": false,
            "customGradient": false,
            "defaultGradients": false,
            "defaultPalette": true
        },
        "layout": {
            "contentSize": "750px",
            "wideSize": "1200px"
        },
        "typography": {
            "customFontSize": true,
            "dropCap": false,
            "fontStyle": false,
            "fontWeight": false,
            "letterSpacing": false,
            "textDecoration": false,
            "textTransform": false
        },
        "blocks": {
            "core/button": {
                "border": {
                    "radius": false
                }
            },
            "core/pullquote": {
                "border": {
                    "color": false,
                    "radius": false,
                    "style": false,
                    "width": false
                }
            }
        }
    }
}
```