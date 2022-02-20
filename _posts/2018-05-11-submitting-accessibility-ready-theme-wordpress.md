---
title: Submitting an accessibility-ready theme to WordPress
date: 2018-05-11 00:00:00 Z
tags:
- WordPress
- Accessibility
- CSS
- Design
---

*This post goes with my talk at WordCamp St. Louis.*

About 2 years ago, I got the idea that I would create and submit my own theme to the official WordPress theme directory. I was curious about the process, and what I could learn from having a theme reviewed.

I started the theme by forking the [Underscores repository](https://github.com/automattic/_s). I’ve started many projects with Underscores, and it remains a great foundation for getting off the ground quickly. I worked on the theme in my free time for about a year and a half. Finally, this past November, I got to a point where I thought that it was ready to be uploaded.

In preparation, I ran through the [list of requirements](https://make.wordpress.org/themes/handbook/review/required/) on the theme review team page. I ran the [Theme Check](https://wordpress.org/plugins/theme-check/) plugin on my site and fixed the errors that it found. With both of those in good shape, I zipped up the theme and went to the [theme upload page](https://wordpress.org/themes/upload/). I very quickly discovered that my preparation had missed one big issue. My theme name was already taken.

I learned that WordPress looks at all active installations of a theme, so if there is a substantial installation base of a theme, it blocks you from uploading one by the same name. I had only searched for the theme in the WordPress theme directory. Having been rejected, I did a Google search for a WordPress theme by the name of “Harper” and [found one available through ThemeForest](https://themeforest.net/item/harper-a-feminine-blog-theme-for-wordpress/15946880).

After this discovery, I wasn’t sure what to do, but eventually gave into finding a new name for the theme. This time, I search the WordPress directory, I did a Google search, and looked for anything that could possibly conflict. I settled on the name “Halle” and went through the theme to make the update, a slightly tedious process. After this, I attempted another upload to the theme directory, and it was accepted.

Upon successful upload, [a ticket is created for the theme](https://themes.trac.wordpress.org/ticket/48322). This is where the theme review takes place, essentially in a comment thread. After a theme reviewer is assigned (which took about a couple of months in my case), they will provide a list of the changes that need to be made to the theme. Here are some of the most relevant changes I had to make.

## Accessibility fixes

### Color contrast

I was a little disappointed to find that I had not checked some of the text colors in my theme for proper contrast. With each post, the entry meta was using a color of #808080, which gives a color contrast of 3.95:1 on a white background. I adjusted these colors to #595959, which has a 7:1 ratio, passing both WCAG AA and AAA. This is easy to test using the [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).

### Screen reader text

In the header of the theme, there is a search icon that opens the search overlay. This icon has no text to accompany it, so it needs something for the screen reader to read out. When I submitted the theme, I was just using the `alt` text of the image. This worked, but wasn’t ideal. Instead, I needed to update the `alt` attribute to be blank, and then place a `span` with the text inside of it immediately following the `img` tag. The markup for the span looks like this:

```html
<span class="screen-reader-text">Search</span>
```

### Keeping focus inside search modal

When the search overlay is open, it covers the entire contents of the page. For a sighted user, we’re locking them into the context of the search field until they close the overlay. We need to duplicate that experience for a user navigating the page by keyboard. In order to do this, we need to make sure that only elements within the search overlay can receive focus while it is open.

Using a little JavaScript, we gather up any focusable elements (`input`, `button`, links) and place them in an array. When a user gives focus to any of those elements, we watch for them to reach the last element in the overlay, and then return them to the first element. In the case of my theme, when a user reaches the close button, the next element is the search input field. This means that they are stuck in a loop until the search overlay is closed, which is just what we want.

### Cross-browser focus states

Typically, I will use the browser default for focus states, but this became an issue in Firefox. While Safari and Chrome will show a blue outline around buttons, Firefox shows nothing. From a little bit of testing, I discovered that this was caused by the background and border styles that I was applying to the button. Removing the styles would bring back the browser default focus styles. The fix for this was to manually apply a focus style, which both works in all browsers and looks the same.

### Focus state on image and text combined link

On the homepage of the theme, there is a grouping of three stories that display in a vertical layout. In this case, because the title comes immediately after the image, I wrapped both of them in the same anchor tag. This is better for accessibility, because there is only one link. However, the focus state on those links collapses with the two elements. The fix for this was to apply `display: inline-block` to the link.

### Proper heading structure across posts and pages

For the most part, the heading structure in the theme was sound. The only issue was the comment form that can be displayed below both post and page content. The heading “Leave a reply” uses an `h3` in Underscores by default. For me, this worked great on posts, where there is a sidebar of the latest posts that uses an `h2` for its heading. On pages, the sidebar does not display, which means that the comment form heading needed to be dynamic.

When setting up the arguments for the comment form, we check to see if we’re currently on a page, and if so, modify the markup for the comment form title.

```php
$comment_args = array();
if ( is_page() ) {
  $comment_args = array(
    'title_reply_before' => '<h2 id="reply-title" class="comment-reply-title">',
    'title_reply_after' => '</h2>',
  );
}
comment_form( $comment_args );
```

### Repetitive link text
On any page where there are a whole list of “Read more” links, it can be confusing for a screen reader user to know exactly which “more” is being linked to. Using screen reader text, we can append the title of the post to the end of the link, making each specific to the post that it is associated with. Inside of the link, following the “Read more” text, we add the following markup.

```php
<span class="screen-reader-text"> <?php get_the_title( get_the_ID() ); ?></span>
```

## General fixes

### Making text in JavaScript translatable
In my theme, there are only a few places where I’m modifying the text on the page with JavaScript. For comments, there is a toggle to show/hide them, which changes from saying “Show Comments” to “Hide Comments” when the user engages with it. In addition, the mobile menu changes from “Menu” to “Close” when it is toggled. The problem is that text in JavaScript can’t be translated, and so it needs to reside in PHP. `wp_localize_script` takes care of this nicely.

```php
wp_localize_script( 'halle-scripts', 'halleL10n', array(
  'menu'  => esc_html__( 'Menu', 'halle' ),
  'close' => esc_html__( 'Close', 'halle' ),
  'comments_show' => esc_html__( 'Show Comments', 'halle' ),
  'comments_hide' => esc_html__( 'Hide Comments', 'halle' ),
) );
```

Now, in JavaScript, we just reference `halleL10n.menu` to get the “Menu” text, or `halleL10n.comments_hide` to get “Hide Comments” and update the page.

### Only need to support WordPress 3 versions back

I was initially check to see if the custom logo function existed before outputting my code, but the custom logo has been part of WordPress since 4.5. With the theme review standards, this means that I did not need to have that check in place. A simple `has_custom_logo()` conditional was all that was required.

### Screenshot image licensing

I’m not going to get too deep into licensing, because I don’t understand it all. I was initially using images from Unsplash, and had to swap them out for images that were using the [CC0 license](https://creativecommons.org/share-your-work/public-domain/cc0/). This essentially means that the images needed to be absolutely free with no restrictions at all. I found that there are many images available from [Pixabay](https://pixabay.com/) that have the CC0 license, so I was able to use those.

---

There’s one last item that I want to mention, and that is a plugin I found out about pretty late in the theme review process. The theme review team has a [Theme Sniffer plugin](https://github.com/WPTRT/theme-sniffer) that they use, and it checks your theme for any errors based on the WordPress coding standards. I had only been using the Theme Checker plugin, as it is what is listed in the theme review documentation. I recommend using the sniffer plugin on any project you’re using, it’s gives you a great deal of feedback.
