---
layout: post
title:  How to properly configure a sticky header
date:   2016-11-10
categories:
excerpt: As I’ve been out browsing the web lately, as I always am, I’ve come across so many sticky headers that are implemented in a way that causes the page to jump up as scrolling begins.
custom_js: prism
---
As I’ve been out browsing the web lately, as I always am, I’ve come across so many sticky headers that are implemented in a way that causes the page to jump up as scrolling begins. They are statically positioned at the top of the page, and then convert to fixed position when the page is scrolled down. That works well, except removing an element from its position in the page leaves a gap, and that gap will close immediately after the element is removed. So the page jumps, giving us the reason to be gathered here today.

Fortunately, the fix is simple and straightforward. We must simply fill the gap left by a sticky header. We can fill it in a number of ways, a few of which I will detail now.

### Apply padding to the top or bottom of the nearest element
This works well if you have an stable environment in which to do it. If the header is the same across the entire site, you can be certain that this will always give you the expected outcome. Right next to the JavaScript that you are using to change the positioning of the header, just grab a calculation of the current height of the sticky element and apply that value as padding to the nearest element. *dusts off hands, walks away*

<pre><code class="language-javascript">var navHeight = document.getElementById('site-header').offsetHeight,
	page = document.getElementById('page');

page.style.paddingTop = navHeight + 'px';</code></pre>

Keep in mind that `.offsetHeight` will include padding and border, but not margin.

### Add an empty `<div>` after the sticky header
This method is used by Stickyfill, which I’ve posted about before. This method is a little more flexible if you’re looking to make multiple items sticky or if you aren’t sure what elements will be reliably above or below the header. Rather than reinventing a wheel that has been so beautifully invented, just add Stickyfill to your project and follow its implementation. It does an excellent job.

### Fill it with your header
A fantastic third option is to not have a sticky header. Life will go on, people will still click on your site navigation, all will be fine.
