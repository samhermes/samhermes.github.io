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

<div v-if="books">
<books>
	<book
		v-for="book in paginatedData"
		v-bind:book="book"
	></book>
</books>

<nav v-if="pageCount >= 1" class="book-list-nav">
	<button type="button" :disabled="pageNumber === 0" v-on:click="prevPage">&larr;<span class="screen-reader-text"> Previous</span></button>
	<button type="button" :disabled="pageNumber >= pageCount" v-on:click="nextPage"><span class="screen-reader-text">Next </span> &rarr;</button>
</nav>
</div>

</div>
