---
layout: default
---
<div class="post-list project-list">
	<header class="post-header">
		<h1 class="post-title">Projects</h1>
	</header>
	<ul>
	  {% for project in site.projects reversed %}
	    <li>
	      <h2><a class="post-link" href="{{ project.permalink | prepend: site.baseurl }}">{{ project.title }}</a></h2>
      	<p class="project-description">{{ project.description }}</p>
	    </li>
	  {% endfor %}
	</ul>
</div>
