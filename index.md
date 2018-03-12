---
layout: home
---
<header class="home-header">
  <h1>
    {% include samhermes.svg %}
    <span class="screen-reader-text">Sam Hermes</span>
  </h1>
  <p>Front End Developer</p>
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
    <li class="see-all"><a href="/posts"><span>All Posts &rarr;</span></a></li>
  </ul>
</div>
<div class="project-list">
  <h2>Projects</h2>
  <ul>
  {% for project in site.projects reversed %}
    <li>
      <h3><a class="post-link" href="{{ project.permalink | prepend: site.baseurl }}">{{ project.title }}</a></h3>
      <p class="project-description">{{ project.description }}</p>
    </li>
  {% endfor %}
  </ul>
</div>

