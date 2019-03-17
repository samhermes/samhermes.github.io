---
layout: default
title: Posts
---
<div class="post-list">
	<header class="page-header">
		<h1 class="page-title">Posts</h1>
	</header>
	{% for post in site.posts %}
		{% capture this_year %}{{ post.date | date: "%Y" }}{% endcapture %}
		{% capture next_year %}{{ post.previous.date | date: "%Y" }}{% endcapture %}

		{% if forloop.first %}
		<div class="year-group">
		<h2 id="{{ this_year }}-ref">{{this_year}}</h2>
		<ul>
		{% endif %}

			<li>
				<span class="post-meta">{{ post.date | date: "%B %-d, %Y" }}</span>
				<h3>
					<a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
				</h3>
			</li>

		{% if forloop.last %}
    </ul>
		</div>
    {% else %}
        {% if this_year != next_year %}
        </ul>
				</div>
				<div class="year-group">
        <h2 id="{{ next_year }}-ref">{{next_year}}</h2>
        <ul>
        {% endif %}
    {% endif %}
{% endfor %}
</div>
