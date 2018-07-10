Vue.component('books', {
    template: `
    <ul class="book-list">
        <slot></slot>
    </ul>
    `
});

Vue.component('book', {
  props: ['book'],
  template: `
  	<li>
  		<p class="book-title">{{ book.title.rendered }}</p>
  		<p class="author">{{ book.fields.author }}</p>
  	</li>
  `
})

var apiURL = 'https://samhermes.co/content/wp-json/wp/v2/posts?per_page=10'

var books = new Vue({

	el: '#app',

	data: {
		statuses: [
			{ id: 1, title: 'Currently' },
			{ id: 2, title: 'Completed' }
		],
		currentStatus: '1',
		books: null,
		loading: false,
		pageNumber: 1,
		pageCount: 0,
		size: 10,
	},

	created: function() {
		this.fetchData()
	},

	watch: {
		currentStatus: function () {
			this.pageNumber = 1
			this.fetchData()
		},
		pageNumber: 'fetchData'
	},

	methods: {
		fetchData: function() {
			this.loading = true
			var xhr = new XMLHttpRequest()
			var self = this
			var page = ''

			let category = '&categories=' + self.currentStatus
			if ( this.pageNumber > 1 ) {
				var page = '&page=' + this.pageNumber
			}

			xhr.open('GET', apiURL + category + page)
			xhr.onload = function() {
				this.loading = false
				self.books = JSON.parse(xhr.responseText)
				self.pageCount = xhr.getResponseHeader('X-WP-TotalPages')
			}.bind(this)
			xhr.send()
		},
		nextPage: function() {
			this.pageNumber++;
			this.scrollTop()
		},
		prevPage: function() {
			this.pageNumber--;
			this.scrollTop()
		},
		scrollTop: function() {
			var element = document.getElementById('app')
			var top = element.offsetTop
			window.scrollTo(0, top)
		}
	}
})