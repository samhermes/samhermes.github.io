---
title: Projects
layout: default
---

<header class="page-header">
  <h1 class="page-title">{{ page.title }}</h1>
</header>

<div class="contain">
	<ul class="project-list">
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
		</li>
		{% endfor %}
	</ul>
</div>
