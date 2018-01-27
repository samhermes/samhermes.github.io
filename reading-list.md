---
layout: page
title: Reading List
custom_js:
- vue.min
- reading-list
---
<div id="app">

<div class="status-toggle-wrap">
	<template v-for="status in statuses">
		<div class="status-toggle" :class="{ active : currentStatus == status.id }">
			<input type="radio"
			:id="status.id"
			:value="status.id"
			:name="status.id"
			v-model="currentStatus">
			<label :for="status.id" v-html="status.title"></label>
		</div>
	</template>
</div>

<div class="loading" v-show="loading">
	{% include loading.svg %}
</div>

<ul class="book-list">
<template v-for="book in books">
	<li>
		<p class="book-title" v-html="book.title.rendered"></p>
		<p class="author" v-html="book.fields.author"></p>
	</li>
</template>
</ul>

</div>

