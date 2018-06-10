Vue.component('book', {
  props: ['book'],
  template: `
  	<li>
  		<p class="book-title">{{ book.title.rendered }}</p>
  		<p class="author">{{ book.fields.author }}</p>
  	</li>
  `
})

var apiURL = 'https://samhermes.co/content/wp-json/wp/v2/posts?per_page=99&categories='

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
		pageNumber: 0,
		size: 5,
	},

	created: function() {
		this.fetchData()
	},

	watch: {
		currentStatus: 'fetchData'
	},

	methods: {
		fetchData: function() {
			this.loading = true
			var xhr = new XMLHttpRequest()
			var self = this
			xhr.open('GET', apiURL + self.currentStatus)
			xhr.onload = function() {
				this.loading = false
				self.books = JSON.parse(xhr.responseText)
			}.bind(this)
			xhr.send()
		},
		nextPage: function() {
			this.pageNumber++;
		},
		prevPage: function() {
			this.pageNumber--;
		}
	},

	computed: {
		pageCount() {
			let l = this.books.length,
			s = this.size;
			return Math.floor(l/s);
		},

		paginatedData() {
			const start = this.pageNumber * this.size,
			end = start + this.size;
			return this.books.slice(start, end);
		}
	}
})