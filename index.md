---
title: Home
layout: home
---

{% include arrow.svg %}
<div class="contain">
	<div class="intro">
		<p>Front-end developer focused on CSS, accessibility, and UX.</p>
		<a class="more" href="/about">About<svg class="more-icon"><use xlink:href="#arrow"></use></svg></a>
	</div>
	<div class="home-posts">
		<h2>{% include icons/posts.svg %}Latest Posts</h2>
		<ul class="post-list">
			{% for post in site.posts limit:5 %}
			<li>
				<span class="post-meta">{{ post.date | date: "%B %-d, %Y" }}</span>
				<h3 class="post-title">
					<a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
				</h3>
			</li>
			{% endfor %}
		</ul>
		<a class="more" href="/posts">All Posts<svg class="more-icon"><use xlink:href="#arrow"></use></svg></a>
	</div>
	<div class="home-categories">
		<h2>{% include icons/category.svg %}Posts by Category</h2>
		<ul class="categories-list">
			{% for category in site.categories %}
			<li><a href="/category/{{ category[0] | downcase }}">{{ category[0] }} <span class="category-count"><span class="screen-reader-text">Count: </span>{{ category | last | size }}</span></a></li>
			{% endfor %}
		</ul>
	</div>
	<div class="home-projects">
		<h2>{% include icons/projects.svg %}Projects</h2>
		<ul class="project-list">
			{% for project in site.projects limit:5 %}
			<li>
				<img class="project-image" src="img/projects/{{ project.icon }}" alt="{{ project.title }}">
				<div class="project-info">
					<h3 class="project-title">
						<a class="project-link" href="{{ project.external_url | prepend: site.baseurl }}">{{ project.title }}</a>
					</h3>
					<p class="project-desc">{{ project.description }}</p>
				</div>
			</li>
			{% endfor %}
		</ul>
	</div>
</div>