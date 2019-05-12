---
layout: default
title: Lists
---
<div class="contain">
	<header class="page-header">
		<h1 class="page-title">Lists</h1>
	</header>
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
