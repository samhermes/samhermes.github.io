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
  {% assign projects = site.projects | reverse %}
  {% for project in projects limit:6 %}
    <li>
      <h3><a class="post-link" href="{{ project.permalink | prepend: site.baseurl }}">{{ project.title }}</a></h3>
      <p class="project-description">{{ project.label }}</p>
    </li>
  {% endfor %}
  </ul>
  <div class="view-all">
    <a href="/projects">All Projects</a>
  </div>
</div>
