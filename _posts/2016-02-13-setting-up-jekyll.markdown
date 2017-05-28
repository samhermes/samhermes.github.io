---
layout: post
title:  "Setting up Jekyll"
date:   2016-02-13 01:15:00 -0600
custom_js: prism
---
I recently switched this site to Jekyll, and I thought I'd share the setup process. Jekyll was a bit slow the last time I used it, so I was excited to find that the 3.0.0 update included speed improvements that make updates available in the browser almost immediately. Here are some of the configuration changes I made outside of the defaults:

- Changed the permalink structure to `/posts/:title/`. I made this update in config.yml, refreshed the site, and nothing changed. A little digging, and I found out that changes to config.yml will not be processed while `jekyll serve` is running. You’ll need to ctrl-c and `jekyll serve` again.
- I was using m/d/Y to display dates, and so in looking at how to set that up in Jekyll, I found an [article from Allan W. Smith](http://alanwsmith.com/jekyll-liquid-date-formatting-examples) that detailed all of the possibilities. It can be accomplished with {% raw %}`{{ post.date | date: "%-m/%-d/%Y" }}`{% endraw %}.
- I display excerpts from posts on the homepage, and in order to specify those manually, you can add an `excerpt:` declaration to the YAML front matter on each post and specify the excerpt there. It can then be output with {% raw %}`{{ post.excerpt }}`{% endraw %}. Jekyll will automatically give you an excerpt, but for posts that start with a code snippet, that was not ideal.
- For posts that include code snippets, I use [prism.js](http://prismjs.com/) for formatting. To include the file only on posts that use it, I add `custom_js: prism`  to the front matter. In footer.html, I've added the following, which takes care of outputting the script tag:
    <pre><code class="language-markup">{% raw %}{% if page.custom_js %}
    {% for js_file in page.custom_js %}</code>
      <code class="language-javascript">&lt;script src='/js/{{ js_file }}.js' type="text/javascript"&gt;&lt;/script&gt;</code>
    <code class="language-markup">{% endfor %}
  {% endif %}{% endraw %}</code></pre>
  This also allows for the possibility of additional js files, so I can just add the name of a file I'd like to include to the `custom_js` declaration. Learned this trick on [Matt Gemmell's site](http://mattgemmell.com/page-specific-assets-with-jekyll/).
- I wanted my 404 page to live at /404.html. By default, Jekyll takes that and moves it to /404/index.html. To change that, I added `permalink: /404.html` to the YAML front matter on the page.

Phew. That was more that I thought. Hope this helps speed things up for you.
