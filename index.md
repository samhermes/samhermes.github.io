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
  <h2>Recently Posted <span class="see-all"><a href="/posts">See all &rarr;</a></span></h2>
  <ul>
  {% for post in site.posts limit:4 %}
    <li>
      <span class="post-meta">{{ post.date | date: "%B %-d, %Y" }}</span>
      <h3><a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a></h3>
    </li>
  {% endfor %}
  </ul>
  
</div>
<div class="project-list">
  <h2>Projects <span class="see-all"><a href="/projects">See all &rarr;</a></span></h2>
  <ul>
  {% assign projects = site.projects | reverse %}
  {% for project in projects limit:4 %}
    <li>
      <h3><a class="post-link" href="{{ project.permalink | prepend: site.baseurl }}">{{ project.title }}</a></h3>
      <p class="project-description">{{ project.description }}</p>
    </li>
  {% endfor %}
  </ul>
  
</div>

