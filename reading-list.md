---
layout: page
title: Reading List
custom_js:
- vue
- reading-list
---
<div id="app">

<div class="status-toggle-wrap">
	<template v-for="status in statuses">
		<div class="status-toggle">
			<input type="radio"
			:id="status"
			:value="status"
			name="status"
			v-model="currentStatus">
			<label :for="status">Status: {{ status }}</label>
		</div>
	</template>
</div>

<ul class="book-list">
<template v-for="post in posts">
	<li>
		<p class="book-title" v-html="post.title.rendered"></p>
	</li>
</template>
</ul>

</div>

