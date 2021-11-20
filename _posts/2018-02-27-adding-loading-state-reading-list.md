---
title: Adding a loading state to Reading List
date: 2018-02-27 00:00:00 Z
---

This is a continuation of my [previous post about a Vue app](https://samhermes.com/posts/small-vue-app-reading-list/) I created for the reading list on this site.

After I got the books displaying, the first thing I felt was missing was a loading state. It takes a second (or more, depending on connection speed) for the books to load in, and in the meantime, there’s just a white screen. Even on this super simple app, that’s not a great experience.

Naturally, I went looking for information. I found quite a few collections of loading spinners, which seems like overkill. I mean, I made a list of books into a Vue app, so everything is overkill, but it just seems crazy to add this whole collection of spinners just to use one of them. Plus, I wanted to make my own spinner, that’s the fun part.

What we need is for Vue to communicate out when it’s fetching data, and when it’s not. Once we have that information, we can toggle the display of the loading spinner. So, let’s do a little state management. We start by setting the default loading state to `false` in the initial data set.

```js
data: {
  statuses: [
    { id: 1, title: 'Currently' },
    { id: 2, title: 'Completed' }
  ],
  currentStatus: '1',
  books: null,
  loading: false
},
```

Vue doesn’t fetch data right away, even though it can seem that way, so we don’t want the loading state to be true until Vue has actually reached out to request data. We set the initial state to `false`, and later update that value as soon as a request has been started.

```js
methods: {
  fetchData: function() {
    this.loading = true
...
```

Now that `fetchData` has started, the loading value is set to `true`. Now, the last piece to complete this is to set the loading value back to `false` once we get some data back from our request. This comes inside the `onload` function. Continuing on from above:

```js
xhr.onload = function() {
  this.loading = false
  self.books = JSON.parse(xhr.responseText)
}.bind(this)
```

One bit to note about the code above is that we need to add `.bind(this)` to the end of the `onload` function. Pardon me if I don’t get this exactly right, but doing this allows us to access and update the value of `loading` outside the current function. Otherwise, `this.loading` is undefined, and we would never be able to communicate that loading has finished.

The full `reading-list.js` is [available on GitHub](https://github.com/samhermes/samhermes.github.io/blob/master/js/reading-list.js) for a full picture of this implementation.

Now, we have a little work to do in our template and styles. We need to add the loading animation to our template and control its display using the `loading` variable. Here, I have added a `div` with a class of `loading`, and used `v-show` to toggle an inline style attribute. `loading`, when used inside of `v-show` is a reference to the variable we’ve been working with.

```markup
<div class="loading" v-show="loading">
  {% raw %}{% include loading.svg %}{% endraw %}
</div>
```

I won’t get into the SVG I used except to say that I’ve added it to my `_includes` folder. My site is in Jekyll, so that’s where it is looking for when `include` is used.

I also won’t get into the styles I used for the loading spinner, because that will depend on specific cases. Essentially, I’ve absolutely positioned mine so that it will display centered over the content area where the book list will show. One bit that I will touch on is the animation of the spinner. We can use a pretty simple CSS animation to keep the spinner spinning indefinitely. We first set up the keyframe animation, and here I’ve given it the very accurate name of `rotate`.

```css
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

Next, on the styles for SVG itself, we can add on `animation: rotate 1.8s linear infinite;`, and we’re all set. Now, it will smoothly rotate.

With a loading state, the user will always know what is happening with our application. On the reading list, when someone toggles between books I am currently reading and books I’ve completed, they know exactly when data has been requested, and when it has arrived. Or, hasn’t arrived. It’s a small UX improvement that goes a long way.
