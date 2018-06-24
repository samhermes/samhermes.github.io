---
layout: default
title: Photos
custom_js: js/lazyload
---
<div class="photo-list">
	<header class="post-header">
		<h1 class="post-title">Photos</h1>
	</header>
	<ul>
	  {% for photo in site.photos reversed %}
	  {% assign loopindex = forloop.index %}
	    <li>
	    	{% if loopindex < 3 %}
	    		<img src="/img/photos/{{ photo.image }}" alt="">
	    	{% else %}
	    		<img class="lazyload" data-src="/img/photos/{{ photo.image }}" alt="">
		    	<noscript>
		    		<img src="/img/photos/{{ photo.image }}" alt="">
		    	</noscript>
	    	{% endif %}
	    	<p class="photo-caption">{{ photo.title }}</p>
	    </li>
	  {% endfor %}
	</ul>
</div>