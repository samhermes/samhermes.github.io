---
layout: default
title: Home
---
<div class="intro">
  <div class="intro-text">
    <p>Holy cabooses, you're here! I'm Sam, a front end web developer. I write as I learn about CSS, JavaScript, accessibility, WordPress, and more. I also have a few side projects that allow me to explore new ways of working.</p>
    <a class="cta" href="/about">More About Me</a>
  </div>
</div>

<div class="post-list">
  <h2>Recent Posts</h2>
  <ul>
  {% for post in site.posts limit:4 %}
    <li>
      <span class="post-meta">{{ post.date | date: "%B %-d, %Y" }}</span>
      <h3><a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a></h3>
    </li>
  {% endfor %}
  </ul>
  <div class="view-all">
    <a href="/posts">All Posts</a>
  </div>
</div>

<div class="project-list">
  <h2>Selected Projects</h2>
  <ul>
    <li>
      <h3><a class="post-link" href="/halle">Halle</a></h3>
      <p class="project-description">WordPress theme</p>
    </li>
    <li>
      <h3><a class="post-link" href="https://wordpress.org/plugins/map-block-for-mapbox/">Map Block for Mapbox</a></h3>
      <p class="project-description">WordPress plugin</p>
    </li>
    <li>
      <h3><a class="post-link" href="/reading-list">Reading List</a></h3>
      <p class="project-description">Vue app</p>
    </li>
    <li>
      <h3><a class="post-link" href="https://github.com/samhermes/bathbomb">Bath Bomb</a></h3>
      <p class="project-description">Front end framework</p>
    </li>
  </ul>
  <div class="view-all">
    <a href="/projects">All Projects</a>
  </div>
</div>
