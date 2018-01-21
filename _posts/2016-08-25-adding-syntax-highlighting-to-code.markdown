---
layout: post
title:  Adding syntax highlighting to code
date:   2016-08-25
custom_js: prism
---
When I started working on the last iteration of my site, I knew I was going to need to figure out how to display code snippets. I considered using Github Gists or Codepen, but they both seemed to be a bit overkill. Also, I wanted control over the appearance and formatting.

If I wasn’t going to be embedding the code, that meant I would need to add it directly to the post, wrap it in `<pre>` tags, and style it. I could handle the first two steps, but needed help styling it. There are a number of JavaScript libraries that will apply syntax highlighting to your code, but I landed on [Prism.js](http://prismjs.com). It was the lightest option, and was the easiest to tweak the styles of. I am using the Okaidia theme and added PHP to the list of default languages.

Since I’m using Jekyll to build my site, I wasn’t sure how to conditionally include Prism only on the posts I’m using code snippets in. Using an [article by Matt Gemmell](http://mattgemmell.com/page-specific-assets-with-jekyll/), I added YAML front matter that specified the name of the JavaScript file to include.

```
custom_js: prism
```

Then, in the footer, I added a `for` loop that added a script tag for each javascript file included.

```
{% raw %}{% if page.custom_js %}
  {% for js_file in page.custom_js %}
&lt;script src='/js/{{ js_file }}.js' type="text/javascript"&gt;&lt;/script&gt;
  {% endfor %}
{% endif %}{% endraw %}
```

Prism comes with the appropriate styles bundled with it, which I just copied and included in my main stylesheet, tweaking them slightly.

With Prism running on the page, all that’s needed to properly activate it is the appropriate class for the language of the code snippet. For the above snippet, I added `class="language-markup"` to the `<code>`  element to add the appropriate highlighting. Now when making a new post, I just need to include the YAML front matter and add a class, and that's it!
