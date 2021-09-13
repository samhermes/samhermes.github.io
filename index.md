---
title: Home
layout: home
---

{% include arrow.svg %}
<div class="contain">
	<div class="intro">
		<div class="blob-container">
			{% include blob.svg %}
		</div>
		<p>Front-end developer focused on CSS, accessibility, and UX.</p>
		<a class="more" href="/about">About<svg class="more-icon"><use xlink:href="#arrow"></use></svg></a>
	</div>
	<div class="home-posts">
		<h2>{% include icons/posts.svg %}Latest Posts</h2>
		<div class="home-post-list">
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
	</div>
	<div class="home-projects">
		<h2>{% include icons/projects.svg %}Projects</h2>
		<div class="home-project-list">
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
</div>