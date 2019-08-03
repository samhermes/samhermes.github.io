---
title: Home
layout: default
---

<div class="intro">
  <div class="intro-text">
    <p>Front-End Developer</p>
    <p class="city">Saint Louis</p>
  </div>
</div>

<div class="home-posts">
  <div class="home-posts-contain">
    <h2 class="screen-reader-text">Recent Posts</h2>

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
</div>
