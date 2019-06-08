---
layout: default
title: Projects
---
<div class="contain">
	<header class="page-header">
		<h1 class="page-title">Projects</h1>
	</header>
	<ul class="post-list">
	  {% for project in site.projects reversed %}
		{% if project.external_url %}
			{% assign project_link = project.external_url %}
		{% else %}
			{% assign project_link = project.permalink | prepend: site.baseurl %}
		{% endif %}

	    <li>
	      <h2 class="project-title"><a class="post-link" href="{{ project_link }}">{{ project.title }}</a></h2>
      	<p class="project-description">{{ project.description }}</p>

				{% if project.links %}
				<ul class="project-links">
					{% for link in project.links %}
						<li class="project-link"><a href="{{ link.link }}">{{ link.title }}</a></li>
					{% endfor %}
				</ul>
      	{% endif %}

      	{% if project.related_post %}
				<div class="project-related-post">
					<h3 class="related-post-heading">Related Post</h3>
					<p class="related-post-title"><a href="/posts/{{ project.related_post_slug }}">{{ project.related_post }}</a></p>
				</div>
      	{% endif %}
	    </li>
	  {% endfor %}
	</ul>
</div>
