---
title: Omitting optional HTML tags
date: 2017-07-24 00:00:00 Z
---

Someone mentioned somewhere at some point (life moves too fast) that the [Google HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html#Optional_Tags) suggests that any unnecessary HTML tags can be omitted, such as the `<head>` and `<body>`. This was rather interesting to me, and so quintessential of the web. Even the things you think are so foundational may not be.

I updated my Jekyll layout to remove optional tags, which means the page you’re currently viewing does not have a `<head>` tag or a `<body>` tag. The page source goes from the document type declaration right to a meta tag. The RSS link is followed immediately by the `<header>` tag.

Of course, Google isn’t suggesting something new here, they’re simply following the HTML standard. The standard allows for the omission of quite a few other tags, such as the closing tag for `<li>` and `<p>`, among others. There are some conditionals around when this will work, though in most cases it seems feasible. Always good to [check the spec](https://html.spec.whatwg.org/multipage/syntax.html#syntax-tag-omission).

Since I’m using Jekyll to generate my site, I don’t have total control over the markup generated within the content of the site, but omitting a simple `</li>` is neither here nor there. Still, interesting to consider that you can ship HTML without some of the most foundational tags.