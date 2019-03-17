---
layout: post
title: Notes from WordCamp US
date: 2018-12-13
custom_js: prism
---
<h2 class="margin-bottom-zero">Thinking Like a Front-End Developer</h2>

*Chris Coyier*

During Chris’s talk, I pushed a [very small commit](https://github.com/samhermes/samhermes.github.io/commit/d6a66519092adee0376a1f748f27964551846e0a) to my website to change “front end” to “front-end.” I agreed with [his explanation](https://twitter.com/WordCampUS/status/1071065672313118720) of when to use which, even though it was different from the convention that I’d been using for a while.

I found his talk very fun to listen to, and appreciated how he acknowledged the vast amount of responsibility that we all have to shoulder in our jobs. There was a feeling of togetherness in the room.

One intriguing idea that Chris spoke about was the idea of "front of the front end" vs "back of the front end." He got this from [speaking with Brad Frost on the ShopTalk Show](https://shoptalkshow.com/episodes/334/), and I think that it points to a natural divide that is happening. With React, working on the front end can actually end up looking a little like working on the back end. I’ve traditionally been more of a “front of the front” kind of developer.

<h2 class="margin-bottom-zero">Holy Blockamole: Tips On Learning Block Development</h2>

*Andrew Taylor*

Andrew’s lightning talk gave a high-level overview of the ways that developers can work with Gutenberg, from creating templates to block development.

When working in a custom post type, it’s easy to set a pre-defined set of blocks and prevent a user from adding or removing them. This can be done by setting `'template_lock' => 'all'`. You can set the specific blocks fairly simply using `template`:

```php
'template' => array (
    array( 'core/heading', array(
        'placeholder' => __( 'Title...', 'my-plugin' ),
        'level' => 4,
    ) ),
    array( 'core/image', array(
        // Any block atribute can be set as the default.
        'align' => 'wide',
    ) ),
    array( 'core/paragraph', array(
        'placeholder' => __( 'Bio...', 'my-plugin' ),
    ) ),
),
```

I took this code directly from [Andrew’s slides](https://drive.google.com/file/d/1nX3xwOeH9Q5v9y-KDKEgffHRdzJRvoLG/view).

The question that this posed, for me, was how would we set this up if our blocks were coming from a separate plugin. So, if it was possible that the blocks weren’t available, would this fall back gracefully?

In general, as more of the content in our sites becomes dependent on an array of plugins, how can we be sure that it all meshes well? Likely less of an issue than I think it is, but it will be interesting to see how it plays out in real life.

<h2 class="margin-bottom-zero">Investigating Regressions Quickly using Git Bisect</h2>

*John Blackbourn*

John explained very succinctly how to use `git bisect`, a tool for finding the place in your commit history where an issue was introduced. By cutting the number of commits in half each time, you can get down to the issue very quickly, even if there are a hundred or so commits.

Getting this started looks like this:<br>
`git bisect start`<br>
`git bisect good "2.6.10"` - commit where it worked<br>
`git bisect bad HEAD` - where it was broken (likely the latest commit)

It then guides you through until you find the bad commit. [John’s slides](https://speakerdeck.com/johnbillion/investigating-regressions-quickly-using-git-bisect) go into more detail about this. Like he said, I hope I never need to use this, but it’s nice to know that it’s there to help.

<h2 class="margin-bottom-zero">Gutenberg, GraphQL and Government: Building Blocks</h2>

*Jason Bahl*

Jason [answered a question](https://docs.google.com/presentation/d/1PwXjxpqbZcWBKD2xTPmuJlScJiiuOHZurVyB9vR-BH4/edit#slide=id.g4846d628b1_0_566) that had popped up during Andrew’s talk earlier. Andrew had spoken about how to limit blocks in a custom post type, but I wondered how this would be done for pages or posts. With a filter!

This checks to see if the current page template is `home.php`, and then only allows the `homepage-hero`, `curated-posts`, and `curated-staff` blocks.

Last but not least, it locks down the blocks using `template_lock`, like Andrew had demonstrated. So, the user can only use the three blocks specified.

```php
add_filter( 'allowed_block_types', function( $allowed ) {
    global $wp_post_types, $post;
    if ( 'templates/home.php' === get_page_template_slug( $post->ID ) ) {
        $wp_post_types[ $post->post_type ]->template = [
            [ 'wcus/homepage-hero' ],
            [ 'wcus/curated-posts' ],
            [ 'wcus/curated-staff' ],
        ];
        $wp_post_types[ $post->post_type ]->template_lock = 'all';
    }
});
```

<h2 class="margin-bottom-zero">Who’s afraid of ARIA?</h2>

*Rian Rietveld*

I feel like I could make an entire post just about this talk. I love a good code demo, and this talk had lots of them. Rian made everything seem very simple and straightforward, which is refreshing when you’re talking about accessibility. In practice, I know that things get a little more complicated, but I learned a lot, nonetheless.

`aria-expanded`<br>
This attribute is useful for menus or accordions, so that you can communicate that the following element is either hidden or visible. You would then toggle `aria-expanded` and the hidden attribute with JavaScript when the user opens or closes the menu or accordion.

`aria-live`<br>
This was the most interesting bit, as I think that this is difficult to get right. `aria-live` is used to tell the user about what’s changing on the screen. So, if they hit a button to save changes, we should tell them when the changes have been successfully saved.

Initially, the element with the message in it would have `aria-live="polite"` applied to it. Using JavaScript, we would update that to `aria-live="assertive"`, triggering the screen reader to read it out.

Similarly, if we have an ajax search feature, we could use this method to announce when new search results arrive with a message such as "There are 24 search results.”

WordPress has functionality built into it that handles this for you. `wp.a11y.speak()` will add two `div`s to the bottom of the page, one with `aria-live="polite"` and one with `aria-live="assertive"` and update them as appropriate.

I highly recommend watching Rian’s talk when it becomes available.

<h2 class="margin-bottom-zero">Product Design Through Stories</h2>

*Tammie Lister*

Just a few select quotes to share from [Tammie’s talk](https://speakerdeck.com/tammielis/product-design-through-stories), which may or may not be paraphrased. Life moves fast.

“We are, as a species, addicted to story. Even when the body goes to sleep, the mind stays up all night, telling itself stories.” —Jonathan Gottschall<br>
“Products with stories are powerful. When the story is good, the bond with the product is strong.”<br>
“It’s important that everyone creating the product is involved in telling the story.”

Tammie made the point that a product has several different stories surrounding it. There are those people who use the product, the people who make the product, and the effect the product has by existing. Not only do you want to be aware of the story that the product is telling others, you also want to maintain the story internally.

"Being too fast can be as bad as being too slow.”

This was an idea that caught my attention. Sometimes, a process can happen so quickly that it overwhelms a user. Maybe they miss what happened because you gave them too much information at once, or you used too many channels to communicate.

I’d recently learned about the idea of setting a minimum loading time on an ajax request, so that it doesn’t come back too quickly, and I think this connects to Tammie’s point. If something is too quick, you lose a little trust. Like, maybe it didn’t try hard enough. For human speed, maybe inflating the loading time just a touch will actually make the experience feel more robust.

If you happen to be using a poor connection, this is likely the opposite of a problem, but still worth thinking about for those users with speedy connections.

Last, but not least:

“The details are not the details. They make the design.” —Charles Eames