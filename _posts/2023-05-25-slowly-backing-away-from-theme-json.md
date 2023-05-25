---
title: Slowly backing away from theme.json
date: 2023-05-25
tags:
- WordPress
---

I was on board with theme.json. I wrote a [whole post about it](https://samhermes.com/posts/getting-to-know-theme-json/) last year. However, I think I was confused. I thought that it was the future, where all roads lead. I’ve realized that it’s primarily meant for block themes, even though it isn’t presented this way. The [top of the dev page about it](https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/) reads “WordPress 5.8 comes with a new mechanism to configure the editor.” I took it at its word, and it hasn’t quite played out.

## Injected styles

One of the first issues I ran into was with the styles that get added to the front end as soon as you add a theme.json file to your site (in a so-called “classic” theme). There are custom properties galore, but it also adds anything you set in the `styles` part of theme.json. Adding theme.json to your theme sets the block editor’s font to “serif” for some reason. So, I set the font in theme.json, only to find that it also applies it to the front end. Next, I wanted to add some spacing the right and left of the block editor, as it is up against the viewport on mobile, but found that these were being applied to the body element on the front end. Attempting to change *just* the editor is not possible, which is a shame when merely the presence of theme.json seems to cause issues.

There is a way to disable these “global” styles, using `wp_dequeue_style( 'global-styles' )`, but this is wholesale. This is the frustrating part of losing control of things, as I *do* want WordPress to manage some of these styles, because copying just what I want to my own theme is brittle.

## Styles in JSON

Watching the further development of the site editor, I’ve seen instructions on how to add styles to theme.json to tweak the appearance of different blocks. This makes me uneasy, as it’s basically CSS in JS, which was a bad idea to begin with, and is fading in popularity already.

There are quite a few issues here, the main one being the half-in half-out situation this leads to (as in some styles are coming from WordPress and some are coming from custom stylesheets in a theme). I see why it’s required for the block editor to work, and I see why they are putting equivalent styles on the front end, I just don’t see how someone might reasonably add their own styles on top. It feels too fragile to me. 

Specificity issues are already rampant since the block editor, and the constantly changing markup and class names only adds confusion and frustration.

## PHP equivalent settings

For some of what theme.json offers control over, there is a PHP equivalent. You can set a color palette in PHP, disable font size settings, and things of that nature. While theme.json development is spurring ahead, there are some things that are not able to be controlled in PHP. This makes sense if all signs point to block themes, but ignores those sites using “classic” themes with the block editor. The need to tweak one single setting that isn’t available through PHP requires the addition of a theme.json file, causing all of the repercussions I mentioned above.

[The short list of what is available through PHP is listed here.](https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/#backward-compatibility-with-add_theme_support)

## “Classic” themes

With the push towards the site editor and block themes, we have also been given the label of “classic” for all existing themes. Apparently everything that I’ve built for WordPress is now “classic.” Although this is just a label, it strongly suggests that everyone needs to be building block themes from here on out. The issue with this is that I haven’t seen a compelling reason to jump into block themes yet. It adds a huge amount of complexity with benefits that I don’t need. Not every user needs to be able to rearrange the site logo on a whim. I also do not want them to have that ability, as it makes styling that much harder.

It’s funny to me that they are “classic” themes, as the same approach was taken with the “classic” editor plugin, and it’s [still the fourth most popular plugin](https://wordpress.org/plugins/browse/popular/). Sometimes I wish that I was still holding on to it for dear life too.

Ideally, there would be separation between how theme.json works with block themes and how it works with classic themes. It's attempting to solve for two different use cases at the moment.

## Custom templates

Even in a classic theme, you can create a custom template? Using blocks? Even though you aren’t in a block theme? And then it overwrites the template from your theme just on that page? Bit of a loophole? I'm assuming that this was unintentional and will be changed, but points to how uneven this implementation has been.

## Developer relations

When Gutenberg came out, it was exciting and mysterious. There was so much to learn. It completely changed the way we build sites. It was also really bumpy. It changed all the time, it broke stuff, and, worst of all, it was poorly documented. We had to read the source code to figure out how it worked (and still do). A lot of the tension around the new editor was due to this, there was a lot to learn very quickly, and not too many ways to do it.

It feels like we’re repeating the past with the site editor and block themes. It’s full steam ahead, and everyone will just have to figure it out for themselves after the fact.

WordPress as a platform is a small slice of my stack. I use it heavily, but it’s not where I want to spend all my time. I just don’t have the space in the day to read every update or post about what has changed. Front-end developers are busy enough just trying to keep up with front-end things. The reality about the block editor and the site editor is that they both need a front-end developer to know them intimately to be able to use them successfully. It’s a lot to ask.