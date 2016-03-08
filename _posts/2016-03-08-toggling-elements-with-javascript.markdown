---
layout: post
title:  "Toggling elements with JavaScript"
date:   2016-03-08 14:20:00 -0600
categories:
excerpt: One of the most performant ways to toggle an element with JavaScript is to apply and remove a class.
custom_js: prism
---
One of the most performant ways to toggle an element with JavaScript is to apply and remove a class. Paul Irish pointed out last year that using jQuery’s .hide(), .show(), and .toggle() methods are very costly. I’ve used/am currently using each of these, as they are really easy to understand and implement. However, you’ll see that a plain JavaScript approach isn’t too difficult.

For my site, I needed a toggle for the menu on small screens. I used the following to add and remove a class named ‘open’, which has the proper styles to show the menu. In this case, it is performed when an element with the class of ‘toggle’ is clicked.

<pre><code class="language-javascript">&lt;script&gt;
  var menu = document.querySelector('.toggle');
  menu.onclick = function(){
    menu.classList.toggle('open');
  }
&lt;/script&gt;</code></pre>
