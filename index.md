---
layout: default
title: Home
---
<div class="intro">
  <div class="intro-text">
    <img class="headshot" src="/img/samhermes.jpg" alt="Sam Hermes headshot">
    <p>I'm Sam, a front-end web developer. Here, I write as I learn about CSS, JavaScript, accessibility, WordPress, and more. You'll also find a few side projects that I use to explore new ways of working.</p>
    <a class="cta" href="/about">More About Me</a>
  </div>
</div>

<div class="home-posts">
  <h2>Recent Posts</h2>
  <ul class="post-list">
  {% for post in site.posts limit:4 %}
    <li>
      <span class="post-meta">{{ post.date | date: "%B %-d, %Y" }}</span>
      <h3 class="post-title"><a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a></h3>
    </li>
  {% endfor %}
  </ul>
  <div class="view-all">
    <a href="/posts">All Posts</a>
  </div>
</div>

<div class="home-categories">
  <h2 class="categories-heading">Posts by Category</h2>
  <ul class="categories-list">
    {% for category in site.categories %}
      <li><a href="/category/{{ category[0] | downcase | url_escape | strip | replace: ' ', '-' }}">{{ category[0] | camelcase }}</a></li>
    {% endfor %}
  </ul>
</div>
