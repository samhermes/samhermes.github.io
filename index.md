---
title: Home
layout: default
---

<div class="intro">
  <div class="intro-text">
    <p>Hello! I'm Sam, a front-end developer in St. Louis. Here, I write as I learn about CSS, WordPress, JavaScript, accessibility, and more.</p>
    <a class="cta" href="/about">About Me</a>
  </div>
</div>

<div class="home-posts">
  <h2>Recent Posts</h2>

  <ul class="post-list">
  {% for post in site.posts limit:5 %}
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
