---
title: Lists
layout: default
---
<header class="page-header">
	<h1 class="page-title">{{ page.title }}</h1>
</header>

<div class="contain">
	<ul class="list">
	  {% for post in site.lists %}
	    <li>
	      <h2>
	        <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
	      </h2>
	    </li>
	  {% endfor %}
	</ul>
</div>
