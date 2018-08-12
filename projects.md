---
layout: default
title: Projects
---
<div class="post-list">
	<header class="page-header">
		<h1 class="page-title">Projects</h1>
	</header>
	<ul>
	  {% for project in site.projects reversed %}
	    <li>
	      <h2><a class="post-link" href="{{ project.permalink | prepend: site.baseurl }}">{{ project.title }}</a></h2>
      	<p class="project-description">{{ project.description }}</p>
      	{% if project.related_post %}
      	<h3 class="related-post-heading">Related Post</h3>
      	<p class="related-post-title"><a href="/posts/{{ project.related_post_slug }}">{{ project.related_post }}</a></p>
      	{% endif %}
	    </li>
	  {% endfor %}
	</ul>
</div>
