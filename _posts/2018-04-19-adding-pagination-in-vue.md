---
title: Adding pagination in Vue
date: 2018-04-19 00:00:00 Z
tags:
- JavaScript
---

So, I’ve been reading too much. The reading list that I’ve been maintaining has grown to an unwieldy length (I’m kind of making up problems to solve at this point…). To remedy this, we need pagination!

Much like when I was adding a loading state, searching Google for help in this project just brought back a lot of packages that I could add to Vue. Not so fetch. A little further down in the results, I found an [article by Denny Headrick](https://medium.com/@denny.headrick/pagination-in-vue-js-4bfce47e573b) that laid out a simple implementation. Like the loading state, I didn’t want to load in any superfluous code for something as (supposedly) simple as pagination, plus I wanted to be able to understand a little bit about what was going on.

The first update was to add a few more items to the `data` array. One for the current page number (starting at 0), and another for how many books to display per page. We’ll use these in just a bit.

```js
data: {
  ...
  pageNumber: 0,
  size: 5
}
```

Next, inside `methods`, we need to add two new functions that will take care of updating the `pageNumber` value. Since Vue is state based, we just need to update the value of `pageNumber` and that will cause the app to update as appropriate. Like, it feels like something is missing, but it just works.

```js
methods: {
  ...
  nextPage: function() {
    this.pageNumber++;
  },
  prevPage: function() {
    this.pageNumber--;
  }
}
```

Now we need to add a few functions inside of a new section of the app, computed properties. The first of these functions will give us a count of how many pages in total there are. The second will return a subset of the list of books, depending on which page the user is currently viewing.

```js
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
```

I took both of these functions almost verbatim from the article I mentioned above, and then adapted the variable references to work with my app. Thanks Denny!

One minor change that we need to make to the template before moving on is how we’re looping through the book list. Right now, the current book list is stored in `books`, but we want to get it from `paginatedData` going forward. It’s as simple as updating the for loop.

```markup
<template v-for="book in paginatedData">
```

The final bit is to add the previous and next page button to the template. This is where we can build in the logic to handle what happens when a user presses one of the buttons.

```markup
<nav v-if="pageCount >= 1" class="book-list-nav">
	<button type="button" :disabled="pageNumber === 0" v-on:click="prevPage">Previous</button>
	<button type="button" :disabled="pageNumber >= pageCount" v-on:click="nextPage">Next</button>
</nav>
```

There’s a lot going on here, so let’s break it down a little. On the `nav` containing element, we have a conditional statement. This will show/hide the buttons based on how many pages exist. On the reading list, the currently reading list is usually pretty short, so we don’t usually need pagination there.

For each button, we want to disable them as appropriate if we are on the first or last page. This is where the `:disabled` attribute comes in. For the previous button, we check to see if we’re on the first page (page 0), and on the next button, we check for the last page.

Next up, we hook up the functions that we added to `methods` earlier. To attach a click handler, we use `v-on:click`, and then insert the name of the function we want to use as the value.

And that’s it! So simple! So easy! Just kidding, this is pretty complicated. JavaScript is tricky. Once I figured this out, though, it feels pretty nice. The logic to show/hide the navigation as appropriate is pretty simple to follow, and all we had to do was add an attribute to the `nav` element.

To take this a little further, I’d like to add a way to communicate the current page. Ideally, there would be “1 of 4” between the previous and next buttons. Also, I’ve limited the list to 5 books, so that usually fits within the current viewport. If I were to extend that to 10 books, we’d really want to scroll the user back up to the top of the list any time they used the pagination. Always more to do!
