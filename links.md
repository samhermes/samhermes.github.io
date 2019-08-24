---
title: Links
layout: default
---

<div class="contain">
	<header class="page-header">
		<h1 class="page-title">Links</h1>
	</header>
	<ul class="post-list">
	  {% for link in site.links reversed %}
		{% if link.link %}
			{% assign link_url = link.link %}
		{% else %}
			{% assign link_url = link.permalink | prepend: site.baseurl %}
		{% endif %}

	    <li>
            <h2 class="link-title">
                <a class="post-link" href="{{ link_url }}">{{ link.title }}</a>
            </h2>
      	    <p class="link-description">{{ link.description }}</p>
	    </li>
	  {% endfor %}
	</ul>
</div>
