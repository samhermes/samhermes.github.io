var apiURL = 'https://samhermes.co/reading-list/wp-json/wp/v2/posts?categories='

/**
 * Posts demo with ability to change author
 */

var posts = new Vue({

	el: '#app',

	data: {
		statuses: ['1', '2'],
		currentStatus: '1',
		posts: null
	},

	created: function() {
		this.fetchData()
	},

	watch: {
		currentStatus: 'fetchData'
	},

	methods: {
		fetchData: function() {
			var xhr = new XMLHttpRequest()
			var self = this
			xhr.open('GET', apiURL + self.currentStatus)
			xhr.onload = function() {
				self.posts = JSON.parse(xhr.responseText)
			}
			xhr.send()
		}
	}
})