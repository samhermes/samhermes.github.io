---
layout: home
---
<header class="home-header">
  {% include samhermes.svg %}
  <p>Web Developer</p>
</header>
<div class="post-list">
  <h2>Recently Posted</h2>
  <ul>
  {% for post in site.posts limit:6 %}
    <li>
      <span class="post-meta">{{ post.date | date: "%B %-d, %Y" }}</span>
      <h3><a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a></h3>
    </li>
  {% endfor %}
    <li class="see-all"><a href="/posts"><span>See All &rarr;</span></a></li>
  </ul>
</div>


