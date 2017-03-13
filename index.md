---
layout: home
---
<header class="home-header">
  {% include samhermes.svg %}
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
    <li class="see-all"><a href="/posts"><span>See All</span></a></li>
  </ul>
</div>


