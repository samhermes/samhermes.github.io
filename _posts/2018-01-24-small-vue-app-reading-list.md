---
title: A small Vue app - Reading List
date: 2018-01-24 00:00:00 Z
---

Getting into new JavaScript is difficult when you don’t have something useful to build with it, so I was excited when I put it together that I could add Vue to my existing reading list. I’ve had it as static content for a little while now. Making updates is manual, and ends up with lots of repeated code. So, my idea was to move the listings to a WordPress install, and then bring them into the page and display them using Vue. Here’s how I did that.

## Starting somewhere

It’s always good to have somewhere to start, and I got over the initial hump by looking over Brian Krogsgard’s example Vue project on CodePen. He’s pulling in posts from Post Status and displaying them on the page. Fairly simple, but it also includes a toggle to switch between authors. This translated well to the distinction on my reading list between books I’ve completed and ones I’m currently reading. I was pretty excited to see that the amount of code to get going was minimal.

## Prepping WordPress

I have a WordPress environment that runs on samhermes.co, and so I fired up a new site there. It is just using a default theme, since all I need to use is a REST API endpoint. I wonder what you’d do if all you wanted was the endpoints from your site? Could you remove everything else from public view? These are questions for another day. After I had loaded in the books, I added them to two categories, one for current and one for completed. Then, I wanted to add the author of each book, so I activated ACF and created a field called “Author” and loaded in the data.

Before the REST API endpoint is totally ready to go, the custom field needs to be added. By default, anything you add with ACF isn’t going to show up in the response. The following function will add all fields to the response.

```php
function acf_rest_api() {
  register_rest_field( 'post',
    'fields',
    array(
      'get_callback' => function( $data, $field, $request, $type ) {
        if ( function_exists( 'get_fields' ) ) {
          return get_fields( $data['id'] );
        }
        return [];
      },
      'update_callback' => null,
      'schema' => null,
    )
  );
}
add_action( 'rest_api_init', 'acf_rest_api' );
```

I was surprised to find that I didn’t have to add each field individually. I found a method that this could be done, but in my case it was easiest to just have all fields added, which will be especially helpful if I choose to add additional information in the future.

## Setting up Vue

After adding the minified version of Vue to the page, the next step is to create a Vue instance. The entirety of this piece is as follows:

```js
var apiURL = 'https://samhermes.co/reading-list/wp-json/wp/v2/posts?categories='

var books = new Vue({
  el: '#app',
  data: {
    statuses: [
      { id: 1, title: 'Currently' },
      { id: 2, title: 'Completed' }
    ],
    currentStatus: '1',
    books: null
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
        self.books = JSON.parse(xhr.responseText)
      }
      xhr.send()
    }
  }
})
```

The first part we see here is the URL for the API. You’ll see that it ends sort of abruptly, allowing us to tack on an ID as we make the request. The default ID is 1, which matches the ID of the “Currently” category in WordPress. We set that as the default, so that as the page loads, it uses it for the initial request. When the user changes the current status (either “Currently” or “Completed”), we send the new ID along with the new request.

The methods section contains a function to fetch new data, and it is a fairly simple Ajax request. Vue watches for a change in `currentStatus` and performs a `fetchData` when it does.

## Page Markup

Vue needs a container to target, and it needs to match the ID in the `el` attribute that we’ve already created. It’s just a simple `<div id="app"></div>` that we’ll place all of the following code inside of.

This next part is what I’ve been poking around on still. The template that Vue uses to actually create the markup on the page can live in a couple of different places. Currently, I have it inside a couple of `<template>` tags on the page itself.

First, you can use a for loop in Vue to create a list of the possible statuses. For my example, I wanted two radio buttons that are labeled as “Currently” and “Completed.”

```markup
<template v-for="status in statuses">
  <input type="radio"
  :id="status.id"
  :value="status.id"
  :name="status.id"
  v-model="currentStatus">
  <label :for="status.id" v-html="status.title"></label>
</template>
```

It’s a little weird to be writing a for loop using markup, but it feels sort of familiar and it was pretty easy to understand what was going on. In this example, we just get a list of two radio buttons with corresponding labels. Here, attributes that have a “:” before them are dynamic, and they pull their value from the current `status` object. The attributes that have “v-” before them aren’t exactly dynamic, but they’re more like instructions for Vue. `v-model` hooks the inputs into Vue and gives them their interactivity. It communicates the current value of `currentStatus` to the Vue instance. `v-html` takes the status title and outputs it as text inside the label element.

As for the markup for the actual book list, it’s a fairly simple setup, and even easier to understand than the radio button markup. We wrap it in an unordered list tag and then create a for loop to iterate over each of the books, listing the title and author for each.

```markup
<ul class="book-list">
<template v-for="book in books">
  <li>
    <p class="book-title" v-html="book.title.rendered"></p>
    <p class="author" v-html="book.fields.author"></p>
  </li>
</template>
</ul>
```

In this part, we’re referencing the author field that we added to the WP REST API by looking for the `fields` attribute of the current book. The field we created, named “author,” is available to us there.

## Performance Concerns

Using Vue is absolutely overkill for displaying a list of books. This specific project was definitely just a proof-of-concept so that I could dig into Vue. The Vue file minified is 90k on the server. My site uses CloudFlare, so I’m benefiting from their compression (I think, it's magic), which gets it down to 30k when loaded in the browser. Not terrible by any means, but it was 0k of JavaScript when it was just a static list.

Aside from loading Vue, there’s also the small performance enhancement we could make of caching the responses. Since my reading list is fairly static, we could cache the response locally and just look for it in cache instead of going back out to the API. As it currently stands, toggling the current status back and forth results in a bunch of needless requests.
