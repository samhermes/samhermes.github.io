---
title: Home
layout: default
---

<div class="intro">
  <div class="intro-text">
    <p>Front-End Developer</p>
    <p class="city">Saint Louis, USA</p>
  </div>
</div>

<div class="home-contain">
  <div class="home-posts">
    <div class="home-posts-contain">
      <h2>Latest Posts</h2>
      <ul class="post-list">
      {% for post in site.posts limit:5 %}
        <li>
          <span class="post-meta">{{ post.date | date: "%B %-d, %Y" }}</span>
          <h3 class="post-title"><a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a></h3>
          <p>{% if post.excerpt %}{{ post.excerpt | strip_html | strip_newlines | truncatewords: 50 }}{% endif %}</p>
        </li>
      {% endfor %}
      </ul>
      <div class="view-all">
        <a href="/posts">All Posts</a>
      </div>
    </div>
  </div>

  <div class="home-sidebar">
    <div class="sidebar-group">
      <h3>Projects</h3>
      <ul class="sidebar-list">
        {% assign projects = site.projects | reverse %}
        {% for project in projects limit:3 %}
        {% if project.external_url %}
          {% assign project_link = project.external_url %}
        {% else %}
          {% assign project_link = project.permalink | prepend: site.baseurl %}
        {% endif %}
          <li>
            <p class="sidebar-title"><a class="sidebar-link" href="{{ project_link }}">{{ project.title }}</a></p>
            <p class="project-description">{{ project.label }}</p>
          </li>
        {% endfor %}
      </ul>
      <div class="view-all">
        <a href="/projects">All Projects</a>
      </div>
    </div>
    <div class="sidebar-group">
      <h3>Lists</h3>
      <ul class="sidebar-list list-list">
        {% for list in site.lists limit:4 %}
          <li>
            <p class="sidebar-title"><a class="sidebar-link" href="{{ list.url | prepend: site.baseurl }}">{{ list.title }}</a></p>
          </li>
        {% endfor %}
      </ul>
      <div class="view-all">
        <a href="/lists">All Lists</a>
      </div>
    </div>
  </div>
</div>