---
title: The two worlds of web development
date: 2017-03-13 00:00:00 Z
tags:
- JavaScript
- CSS
selected: true
---

There’s a big divide in the web development community that doesn’t get discussed enough. It’s roughly the difference between those who develop sites for informational purposes and those who develop sites that are applications. In some ways, it’s the divide between front end and back end development. It’s a bit difficult to draw a line between the two worlds, but informational sites are usually those for organizations, businesses, government, etc., and applications are properties like Airbnb, Facebook, and Google Docs. Interactivity, such as filtering, liking, saving, editing, or sorting, is usually what takes it from informational to application. The way we talk about and teach web development often mixes these two or makes no distinction.

There are fundamental differences in the way we approach development in the two worlds. I’ve often gotten caught in this myself. Developing CSS for a web application is infinitely more complex than developing CSS for a static site mostly consisting of pages. Typically, if a project has a small team of developers working on it, CSS naming techniques such as BEM or OOCSS are not necessary. In fact, they are likely adding undue complexity and bloat to the site. In addition, a future developer would need to be briefed on how CSS works in that specific project.

The same problem exists with JavaScript frameworks. An informational site rarely calls for a framework, and only sometimes calls for jQuery or another library. To develop an informational site using React, we’ve introduced a great deal of complexity that will require a level of maintenance that likely outweighs the perceived benefits. React makes sense for those sites that absolutely call for it, where we need to break apart each and every piece of a page into small, maintainable components. In addition, for someone new to web development, it may seem like React is required knowledge. We talk about it often, making it seem like a core piece of the web. In reality, it’s not. It’s simply the thing that there is a lot to learn about at the moment.

Many of the foremost developers working in our industry are no longer solving problems for information-based sites. The pressing issues are how to handle a site when there are an innumerable amount of views and states, from all of the different ways to view a single post, photo, or conversation. And what about these views at each breakpoint? What if the user is not logged in? On top of that, how do we handle small updates with a team of 30 developers and keep everyone in sync? Many of the articles that get written and shared are answers to these big problems. While it’s fantastic to be aware of this work, it would be better if we had a bit of context before adapting it for ourselves. At the very least, we should take some time to consider whether or not the practices being put forth are appropriate for our world.
