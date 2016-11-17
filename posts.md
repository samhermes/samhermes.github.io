---
layout: default
---

<ul class="post-list home">
  {% for post in site.posts %}
    <li>
      <span class="post-meta">{{ post.date | date: "%-m/%-d/%Y" }}</span>
      <h2>
        <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
      </h2>
      <p>{{ post.excerpt }}</p>
    </li>
  {% endfor %}
</ul>