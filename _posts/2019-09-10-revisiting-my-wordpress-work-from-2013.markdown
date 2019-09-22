---
title: Revisiting my WordPress work from 2013
excerpt: It’s pretty rare that you get to return to a project after six years, but that’s just what I’ve been up to! Even though I’d love to never tell anyone about the mistakes that I made, why not make them useful.
date: 2019-09-10 21:40:00 Z
categories:
- WordPress
Field name:
layout: post
---

It’s pretty rare that you get to return to a project after six years, but that’s just what I’ve been up to! Even though I’d love to never tell anyone about the mistakes that I made, why not make them useful.

Naturally, I’ve gotten much much better at my job since, but these were mistakes that I made when I was still very new. And there are new new people all the time! If you’re just starting out with WordPress development, these should be helpful. Or, if you’re an experienced WordPress professional, you can enjoy being incredibly uncomfortable. Get ready to cringe.

## Child themes should be child themes, or just their own theme

Mistake #1: I modified the parent theme at the same time that I was adding to the child theme. Starting out, if there was something that I wasn’t sure how to modify in the child theme, I just edited the parent theme. In this case, that theme was Twenty Twelve. You’re in actual pain, right?

Now, returning to this project after so much time has passed, I have no idea what it was that I changed in Twenty Twelve. What is specific to this project, and what is just part of Twenty Twelve? Hard to know at first glance.

So, what to do? First, I cloned the WordPress repository to my local machine (which takes a minute), and then I copy/pasted the modified version of Twenty Twelve over it. Now, Twenty Twelve has had some fixes and miscellaneous changes since 2012, so this isn’t a clean comparison. Security fixes and the like have been committed since then, but this helps piece apart what changes I made.

With this, I could see the functions and styles that I added or modified and copy them over to the new theme. It wasn’t a hopeless situation, and this is exactly why version control is super helpful to have in the toolkit.

Fun fact, Twenty Twelve has block styles for Gutenberg support! That’s a special kind of backwards compatibility.

## How to tell what styles are being used?

So, when you’re making a child theme, you have the parent theme stylesheet and the child theme stylesheet running together.  In my case, most of those parent styles weren’t being used. Again, this project should have just used a parent theme, as it was very custom. It would be nice to just remove the parent theme styles, but they were serving as the base upon which the child styles were built upon. Removing them broke the layout, among other things.

It would be nice to automate this in a way. See if we can determine which styles aren’t ever being used. Just include all of them and let the computer decide.

## Includes!

Don’t repeat yourself. I did this work before I truly understood how to make that happen. This theme was chock full of code that I copied to a couple dozen files. Not a huge performance win for users, but super critical to sort out for future maintenance.

## Rename functions that you copy from the internet

`my_cpt` is probably not a good function name that could conflict with a poorly written plugin or theme. Taking these straight from the internet or a plugin’s output (looking at you, Custom Post Type UI) can lead to trouble down the line. Much better to use `themename_add_post_types` or something to that effect.

## Client billing

Let’s talk about billing for a moment! Ooo, touchy subject. I did a lot of work on this project that the client did not ask for and will probably never feel. How do we bill? Well, I’m not. You could come at this in a couple of different ways.

Had a different person been the developer on this project initially, and I was cleaning up their work, I’d bill for that. Even then, though, there’s some gray area. There’s a certain amount of cleanup that is necessary to get the job done. A dysfunctional project will make it really difficult to ship code that you’re confident will work.

In this case, I was the previous developer, so I was cleaning up my own mess. I just took it as a chance to observe how much I had grown in the time since I worked on the project. In addition, there’s a certain satisfaction from making things orderly and applying best practices, laying the groundwork for the future.