---
layout: post
title: Defining a new project - Reading List Admin React App
date: 2019-04-02
---
I’m starting on a new project, and I’ll be working on it in the open. This post is the first in a series where I’ll be chronicling my experience. So, to get started, like any project, I need to define exactly what I’ll be doing. Right now, I have a reading list on my site, and I handle updates to the list through a WordPress dashboard. What I’d like to have is a custom admin panel that I could log in to separately from WordPress. The WordPress admin has a lot of other things going on, and I’d like to just focus on my books.

The main point of this project is to learn more about the ins and outs of React. I could build this admin without React, but this is just the sort of project that React was made for. I’ve never completed a React project of this size, or seen it from start to finish.

In the app, I’ll need to pull in a list of all of the books that are currently in the database, both the ones that I’m currently reading and the ones I’ve completed. I’ll want to be able to make updates to existing books, as well as add new books as I begin reading them. I’ll be able to pull in these books through the WordPress REST API.

An interesting component of this project will be authentication. I’ll only want to be able to access the app if I’m logged in, so I’ll need to develop a login form and ensure that what I’ve developed isn’t accessible to the outside world. I’ll use my existing WordPress account, and that will keep me from having to manage two accounts. With that, I’ll need to interface with the WordPress API to maintain my logged in status.

The last part of the project that I want to pay special attention to is how it behaves on mobile vs. desktop. I want it to work anywhere, but I am imagining slightly different behavior in the two cases. In general, it will be a big UI project, as I’ll be starting from the ground up to build all of the views and components.

The next post in this series will be about getting the project started. I’ll use Create React App to jump start the project and begin configuring from there. I’ve done this part before, so hopefully it’s smooth sailing for now. It won’t last long though!