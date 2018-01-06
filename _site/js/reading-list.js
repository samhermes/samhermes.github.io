var apiURL = 'https://samhermes.co/reading-list/wp-json/wp/v2/posts?categories='

var books = new Vue({

	el: '#app',

	data: {
		statuses: [
			{
				id: 1,
				title: 'Currently',
			},
			{
				id: 2,
				title: 'Completed',
			}
		],
		currentStatus: '1',
		books: null,
		loading: false
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
		}
	}
})