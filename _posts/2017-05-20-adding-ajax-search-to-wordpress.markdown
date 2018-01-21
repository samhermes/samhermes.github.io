---
layout: post
title: Adding Ajax search to a WordPress theme
date: 2017-05-20
custom_js: prism
---

There are a few plugins that will add Ajax search for you, but what if you wanted to integrate it into your theme yourself for more control over functionality and appearance? Let’s see what we can do.

I’ve broken out the functionality into separate files, which keeps this feature modular. We’ll be creating `ajax-search.php` and `ajax-search.js`.

Before starting, there are a few things we need to do elsewhere first. The following will output the URL of the Ajax file that is part of WordPress core, and needs to be included in `functions.php`. We’ll use this in `ajax-search.js` to send requests for search results.

```php
wp_localize_script( 'ajax-search', 'ajaxurl', admin_url( 'admin-ajax.php' ) );
```

You’ll want to customize the `ajax-search` bit to work with your naming structure. You’ll be less likely to run into conflicts if you use `[theme-name]-ajax-search` instead.

Next, I’ve added a loading icon inside the search field to let users know that their request is being processed. I have a custom `search-form.php` defined in the theme that adds an animated SVG with a style property of `display: none;`. This ensures that the icon will only be show when we’re ready.

Now, for creating the files. I’m going to start with `ajax-search.php`. This is where the template will be stored for the search results. Here we can control what is returned, add a thumbnail, excerpt, date, author, or simply return the title. There’s just one function in this file, and it attaches to the `wp_ajax_` hook in WordPress.

```php
function ajax_search() {
  // Get search term from search field
  $search = sanitize_text_field( $_POST[ 'query' ] );
  
  // Set up query using search string, limit to 8 results
  $query = new WP_Query(
    array(
      'posts_per_page' => 8,
      's' => $search
    )
  );
  
  $output = '';
  
  // Run search query
  if ( $query->have_posts() ) {
    while ( $query->have_posts() ) : $query->the_post();
      
      /* Output a link to each result
         This is where the post thumbnail, excerpt, or anything else could be added */
      echo '&lt;a href="' . get_permalink() . '"&gt;' . get_the_title() . '&lt;/a&gt;';
    
    endwhile;        
    
    // If there is more than one page of results, add link to the full results page
    if ( $query->max_num_pages > 1 ) {
      // We use urlencode() here to handle any spaces or odd characters in the search string
      echo '&lt;a class="see-all-results" href="' . get_site_url() . '?s=' . urlencode( $search ) . '"&gt;View all results&lt;/a&gt;';
    }
    
  } else {
    
    // There are no results, output a message
    echo '&lt;p class="no-results"&gt;No results&lt;/p&gt;';
  
  }
  
  // Reset query
  wp_reset_query();
  
  die();
}

/* We need to hook into both wp_ajax and wp_ajax_nopriv_ in order for
   the search to work for both logged in and logged out users. */
add_action( 'wp_ajax_ajax_search', 'ajax_search' );
add_action( 'wp_ajax_nopriv_ajax_search', 'ajax_search' );
```

The contents of `ajax-search.php` could be included inside of `functions.php`, but keeping it separate makes `functions.php` cleaner and easier to understand.

Up next, let’s spend some time with the JavaScript to make it work. This example relies on jQuery, but could be reworked to use vanilla JavaScript. Essentially, we listen to the search field for changes. We’ll debounce the number of requests that can be made, but ensure that the user knows that we’re working nonetheless.

```js
jQuery(document).ready( function($) {

  // Set up variables for each of the pertinent elements
  var $searchWrap = $('.search-form'),
      $searchField = $('.search-form .search-field'),
      $loadingIcon = $('.search-form .loading'),
      termExists = "";
  
  // Debounce function from https://davidwalsh.name/javascript-debounce-function
  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };
  
  // Add results container and disable autocomplete on search field
  $searchWrap.append('&lt;div class="results"&gt;&lt;/div&gt;');
  var $searchResults = $('.search-form .results');
  $searchField.attr('autocomplete', 'off');
  
  // Perform search on keyup in search field, hide/show loading icon
  $searchField.keyup( function() {
    $loadingIcon.css('display', 'block');
    
    // If the search field is not empty, perform the search function
    if( $searchField.val() !== "" ) {
      termExists = true;
      doSearch();
    } else {
      termExists = false;
      $searchResults.empty();
      $loadingIcon.css('display', 'none');
    }
  });
  
  // Make search Ajax request every 200 milliseconds, output results
  var doSearch = debounce(function() {
    var query = $searchField.val();
    $.ajax({
      type: 'POST',
      url: ajaxurl, // ajaxurl comes from the localize_script we added to functions.php
      data: {
        action: 'ajax_search',
        query: query,
      },
      success: function(result) {
        if ( termExists ) {
          // `result` here is what we've specified in ajax-search.php
          $searchResults.html('<div class="results-list">' + result + '</div>');
        }
      },
      complete: function() {
        // Whether or not results are returned, hide the loading icon once the request is complete
        $loadingIcon.css('display', 'none');
      }
    });
  }, 200);
  
});
```

That just about does it. The last piece is styling for the results. You’re likely to have plenty of ideas of your own, so I'll close this up here. If there's anything I've missed or been a bit unclear about, direct a tweet to [@samhermes](https://twitter.com/samhermes).