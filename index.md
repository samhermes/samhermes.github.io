---
layout: home
---
<header class="home-header">
  <img src="/img/samhermes.svg" alt="Sam Hermes">
  <p>Front-End Web Developer</p>
</header>
<div class="post-list">
  <ul>
  {% for post in site.posts limit:5 %}
    <li>
    <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">
      <span class="post-meta">{{ post.date | date: "%B %-d, %Y" }}</span>
      <h2>{{ post.title }}</h2>
    </a>
    </li>
  {% endfor %}
  </ul>
  <div class="see-all">
    <a href="/posts">See All</a>
  </div>
</div>


