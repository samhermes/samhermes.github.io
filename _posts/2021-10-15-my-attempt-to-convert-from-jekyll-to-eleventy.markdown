---
title: My attempt to convert from Jekyll to Eleventy
date: 2021-10-15 11:30:00 Z
categories:
- JavaScript
- Jekyll
layout: post
---

Usually when I write something, it’s because I’ve figured something out, or done something for the first time. But, that’s like 1% of the things that happen. In this case, I thought I’d try out Eleventy, and see about converting my site from Jekyll. After getting stuck on all kinds of weird things, I gave up. I questioned my career choice. I stared longingly out of a window. I ate bread. So, this isn’t really a conversion guide, but more of a report? There are things here that are likely obvious to others, or there are things here that probably should be better documented.

## Installation & Layouts

This part was super easy! I’m familiar with node, and all that entails, so installing Eleventy and configuring it was very straightforward. It felt like a great fit. With that done, I began running into issues. The first was surrounding the templates. Eleventy expects them to be in a folder called `_includes`, but Jekyll wants them to be in a folder called `_layouts`. Thanks to [this article by Alex Pearce](https://alexpearce.me/2020/06/jekyll-to-eleventy/), I found I could just modify this with a setting in `.eleventy.js` (a file that must be created).

```other
module.exports = {
    dir: {
        layouts: "_layouts"
    }
};
```

Now that the layouts were looking in the right place, I stumbled around trying to get them to be applied appropriately until I found out ([from this article by Kitty Giraudel](https://kittygiraudel.com/2020/11/30/from-jekyll-to-11ty/)) that each “collection” in Eleventy uses a configuration file in their directory to apply this across the board. So, for my “posts” collection, I added a file called `_posts.json`, and added the following.

```other
{
    "layout": "post",
    "permalink": "/posts/{{ page.fileSlug }}/"
}
```

The only problem was, the posts were nowhere to be found. My homepage had an empty spot where they were supposed to be.

The next thing that I tried was explictly defining my collections in the configuration file. There, I added each of my collections, one for posts, categories, and projects. For example, here’s the posts definition:

```other
config.addCollection('posts', collection =>
	collection.getFilteredByGlob('_posts/*.md')
)
```

Now, projects and categories were showing up, but still no posts. The answer is actually in the code snippet above.

It was the file extension. Through my copy-pasting, I had set it up to look for files with the extension of `.md`. All of my posts were using the `.markdown` extension. Jekyll doesn't really mind which one you use, so this was a silly thing I didn’t think of right away.

I decided to update the extension. In Finder, if you select a bunch of items, and select “Rename…,” the default is to replace a string, so you can just type in the old extension, and then the new extension, and it’s that easy. Once I had completed this, the posts all began being processed by Eleventy.

A similar issue I faced with some of my pages was markup being output instead of actually rendering HTML. Previously, I had all of my pages using the `.md` extension, but converting them all to `.liquid` fixed this issue. This conversion made sense, as many of them are only liquid syntax, Jekyll was just sort of figuring it all out before.

Last, there was a small issue with the post date. Any place I was displaying the date, there was “%-d” where the day should have been. The complete liquid syntax I was using was this: `{{ post.date | date: "%B %-d, %Y" }}` Apparently this is a Ruby thing, and the proper liquid format is `%e`.

## Sass

Eleventy does not doing anything with Sass by default. This was a surprise to me, only because I’ve been so used to Jekyll having it built in by default. It makes total sense that Eleventy would leave this open-ended. Still, it required a little configuration to get it working as it was before.

I needed to install the `sass` package first.

```other
npm install sass --save-dev
```

Then, I needed to integrate it with the build. Before, I was just using the default `eleventy —serve` command, but with the additional step of building styles, I set up custom commands in `package.json`. I learned how to do all of this from [this article by John Kemp-Cruz](https://jkc.codes/blog/using-sass-with-eleventy/). Honestly, the most fun part of not knowing what you're doing is visiting all of these personal sites.

```other
"watch:eleventy": "eleventy --serve",
"watch:sass": "sass _sass:_site/css --watch",
"start": "npm run watch:eleventy & npm run watch:sass"
```

The last little bit was to connect updates to sass files to BrowserSync, so that it would reload the browser when any of the sass files changed. This works out of the box for everything else in Eleventy, and it’s easy to add files to the watch list. In `.eleventy.js`:

```other
config.setBrowserSyncConfig({
	files: './_site/css/**/*.css'
});
```

## Tags

This is really where everything came crashing down. Previously, through the front matter on my posts, I’d add in a list of strings for the post categories. For example, here’s the front matter for this post:

```other
---
title: My attempt to convert from Jekyll to Eleventy
date: 2021-10-15 11:30:00 Z
categories:
- JavaScript
- Jekyll
layout: post
---
```

Admittedly, the way that I’m handling categories in Jekyll is not super great. I created collection and a markdown file for each category that I wanted to make an archive for. 

Eleventy seems to be able to handle this in a much easier way, but I still haven’t been able to get it to work. In the front matter above, I updated “categories” to “tags,” to take advantage of the tagging system that is built in. I then created a template in the root of my project called `tags.njk` and used the same configuration as the [template file in the Eleventy base blog repo](https://github.com/11ty/eleventy-base-blog/blob/master/tags.njk). I assumed that this would just work, but I couldn't get any posts to show up. The tag pages would be created, but nothing would be on them.

At this point, it just felt like I was trying to do something that wasn’t meant to be. Looking at the Eleventy base blog repo, I considered attempting to start something “fresh,” and that would probably fix the issue, but would I know why?

## Deployment & Updates

Previously, with Jekyll, I could just push my changes to GitHub, and then it would build my site and deploy it to GitHub pages automatically. This was a super seamless process, only occasionally tripped up by the Jekyll version being different between my local and GitHub.

For Eleventy, I knew that it wasn’t going to be quite as easy, but I imagined that it had been done already. I searched around for some information. I didn’t find anything. I looked at the GitHub Pages information, but it mostly focuses on using Jekyll. I wondered if I could just change the publishing source to the `_site` folder, but couldn't find anything in the GitHub repo settings to do so. This is an overlap with Jekyll and Eleventy, so I wondered if it would just know to publish from that folder anyway?

Additionally, I have been using Siteleaf to make updates to my site. It’s just much quicker to launch a GUI, paste in the contents of a post, and then save. However, Siteleaf is also designed to work with Jekyll and doesn’t have a way to use anything else. It appears it [might happen in the future](https://github.com/siteleaf/community/discussions/14), but that’s likely a ways off.

With Siteleaf a dead end, I went on to explore Netlify, which I've experimented with in the past. They have a CMS product that allows you to make updates to your site, so I wondered about using it instead of Siteleaf. There, I found a template that would handle all of this, the [Eleventy + Netlify CMS Boilerplate](https://templates.netlify.com/template/eleventy-netlify-boilerplate/). They make it super easy to just press a button, and then press several other buttons. I left off here, though, as using this boilerplate would essentially require me to rebuild my site. Not a huge process, but it brought be back to where I left off with tags.

## And that’s where I am today.

I might be just on the precipice of bringing this all together, but I’m tired. I’m so, so tired. This is what everything in web development is like. I liked Jekyll in the beginning because it used markdown, and that felt like a good, fairly future-proof decision. It mostly is. I like using standard tooling, which Eleventy feels like. It also includes the joyously overfilled `node_modules` folder. I can't believe this is still how things work. Still, I know JavaScript, so it felt good to begin with. After that, as you can see above, it was just a lot of struggle. No individual thing is that big of a deal, but cumulatively, it's so much work.

Eleventy is great for a fresh project, and I don’t want to fault Eleventy specifically here. It just happens to be the latest thing I attempted to use. I generally don’t enjoy the wrestling phase of anything new, it’s really not what keeps me interested. I usually get down on myself and question everything. I like when things are working, running smoothly, and I understand them. When this wrestling phase is happening all of the time, I just feel so unsettled. That’s web development though. It’s exhausting.