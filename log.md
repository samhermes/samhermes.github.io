---
layout: default
---
<div class="log-list">
	<p><em>Personal musings.</em></p>
	<ul>
	  {% for entry in site.log %}
	    <li>
	      <div class="post-meta group"><span class="post-date">{{ entry.date | date: "%B %-d, %Y" }}</span><a class="post-link" href="{{ entry.url | prepend: site.baseurl }}">permalink</a></div>
	      
	     	{{ entry.content }}
	    </li>
	  {% endfor %}
	</ul>
</div>
