---
title: Links
layout: default
---

<header class="page-header">
	<h1 class="page-title">Links</h1>
</header>

<div class="contain">
	<ul class="post-list">
	  {% for link in site.links reversed %}
		{% if link.link %}
			{% assign link_url = link.link %}
		{% else %}
			{% assign link_url = link.permalink | prepend: site.baseurl %}
		{% endif %}

	    <li>
			<span class="post-meta">{{ link.date | date: "%B %-d, %Y" }}</span>
            <h2 class="post-title">
                <a class="post-link" href="{{ link_url }}">{{ link.title }}</a>
            </h2>
	    </li>
	  {% endfor %}
	</ul>
</div>
