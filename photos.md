---
layout: default
---
<div class="photo-list">
	<ul>
	  {% for photo in site.photos %}
	    <li>
	    	<img src="/img/photos/{{ photo.image }}" alt="">
	    	<p class="photo-caption">{{ photo.title }}</p>
	    </li>
	  {% endfor %}
	</ul>
</div>
