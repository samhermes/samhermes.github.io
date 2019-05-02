---
layout: post
title: Using pagination with the WordPress API in Vue
date: 2018-07-25
categories: [WordPress, Vue]
custom_js: prism
---
This is a continuation of my [previous Vue pagination post](https://samhermes.com/posts/adding-pagination-in-vue/) in which I added pagination to the list of books that I’m reading or have read. In that post, I fetched all of the books from a specific category using the WordPress REST API, and then stored them in state. This worked great, but wasn’t a great long-term solution. The problem lies in the fact that the [API limits queries to 100](https://developer.wordpress.org/rest-api/using-the-rest-api/pagination/) posts at a time by default. This means that as soon as I read more than a hundred books, the end of the list will get chopped off.

To solve this issue, we need to do a separate API call for each page of books, fetching only 10 at a time. This means more API calls, but less data that needs to be held in state at any given time. There are just a few minor modifications to be made. In order to get the correct 10 books, we need to add a `&page=` parameter to the API call. We pass in the page that we’d like to retrieve. In my case, I just needed to adjust the `pageNumber` attribute that I was using previously.

```js
pageNumber: 1,
```

Where this variable was previously set to 0, it now starts out at 1. The WordPress REST API, logically, starts pagination out at page 1.

The next modification is of the `fetchData()` method. Previously, we were only passing the current category along with the request. Now, both the category and the current page number are dynamic variables that we need to pass along. After prepping the variables to reference the current state, we open the API call with the following:

```js
xhr.open('GET', apiURL + category + page)
```

Now that only the currently visible books are being held in state, pagination has far greater control over how actions are occurring. Hitting either of the pagination buttons should produce a new call to the API. In order to achieve this, we need to watch for changes to the `pageNumber` variable, and then fetch new books. This means that we need to make an addition to `watch`:

```js
watch: {
    ...
    pageNumber: 'fetchData'
}
```

Now, anytime the `pageNumber` variable changes, new books will be fetched using the `fetchData` method.

A small hiccup that I encountered was that I needed to reset `pageNumber` to 1 whenever the category was changed. Doing so inside of `fetchData` would improperly set the page number, as it would be starting over each time. To solve this, a small modification to the status watcher was required.

```js
currentStatus: function () {
    this.pageNumber = 1
    this.fetchData()
},
```

Instead of fetching the data right away, adding a function allows for the page number to be reset any time that `currentStatus` changes. Afterwards, `fetchData()` can be properly called.

The last piece of this update is with the template. Before, all of the books were contained within state, so getting a count of the total books was pretty easy. Now, we need to check the total number of books with each API call that we make. This data is passed along with the response, so checking it and storing the value in state only requires `self.pageCount = xhr.getResponseHeader('X-WP-TotalPages')`. Further documentation can be found in the [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/using-the-rest-api/pagination/).

All of these changes can be viewed in the larger context of the app by viewing [the diff on GitHub](https://github.com/samhermes/samhermes.github.io/commit/f3d0fd783e915a0df69c312b9ef8203f1042c663).
