---
layout: default
---
<div class="post-list">
	<ul>
	  {% for post in site.posts %}
	    <li>
	      <span class="post-meta">{{ post.date | date: "%B %-d, %Y" }}</span>
	      <h2>
	        <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
	      </h2>
	    </li>
	  {% endfor %}
	</ul>
</div>
