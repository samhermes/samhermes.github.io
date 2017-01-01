---
layout: default
---
<div class="about-intro"></div>
<div class="post-list">
  <p class="post-list-heading">Recent Posts</p>
  <ul>
  {% for post in site.posts limit:3 %}
    <li>
      <span class="post-meta">{{ post.date | date: "%b %-d %Y" }}</span>
      <h2>
        <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
      </h2>
      <p>{{ post.excerpt }}</p>
    </li>
  {% endfor %}
  </ul>
  <div class="see-all">
    <a href="/posts">See All</a>
  </div>
</div>


