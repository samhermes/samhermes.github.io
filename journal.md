---
layout: default
---
<div class="journal-list">
	<ul>
	  {% for entry in site.journal %}
	    <li>
	      <div class="post-meta group"><span class="post-date">{{ entry.date | date: "%B %-d, %Y" }}</span><a class="post-link" href="{{ entry.url | prepend: site.baseurl }}">permalink</a></div>
	      
	     	{{ entry.content }}
	    </li>
	  {% endfor %}
	</ul>
</div>
