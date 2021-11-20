---
title: How not to use React with Jekyll
date: 2018-06-24 00:00:00 Z
---

To lay the groundwork a little, this site uses Jekyll and is hosted on GitHub Pages. Whenever I make a new project that I want to include on the site, I just create a new page in markdown and build out from there. When I made my reading list app, I used Vue and included that without issue. React, on the other hand, has proven to be a little more complex. Which, typical. For this project, I wanted to display information about upcoming SpaceX launches.

The ever-popular Create React App makes it really easy to get started with React. It can be installed globally with `npm install -g create-react-app`. Then, to start this project, I ran `create-react-app next-spacex-launch` in the root of my site. This created a new directory and placed a very simple app in it, and then started up a development server. So, with my Jekyll site running, I had the site at `localhost:4000` and the React app running at `localhost:3000`. Neat, but I wanted React to be running at the subdirectory address. Instead, it was inside of a `/build` folder within that subdirectory. So, going to /next-space-launch was a 404.

At this point, I realized that maybe Create React App isn’t quite the right approach for this project. After doing a little digging, I’ve found that Create React App isn’t really meant for customization. This is fine for most projects, but I needed a little more control. Fortunately, Create React App has the capability to “eject” itself. Essentially, in order to stay simple, it tucks quite a bit of functionality away out of sight. This keeps things tidy, but how am I supposed to experiment like that? There’s a great explanation of the ejection process in the beginning of [this post on Medium](https://medium.com/@tuchk4/why-i-love-create-react-app-e63b1be689a3).

So, I ejected. *gasp!*

Reasons I ejected:

- I didn’t want the bundle to include a hash. This was making it difficult to include via Jekyll templates. I was able to work around this by renaming the file through `package.json`, but that unnecessarily slows the build down a little.
- I kept getting a 404 on the bundle’s .map file, and there was no way to skip that in the build process without deleting the file each time.
- I didn’t want to set up a service worker.
- Most importantly, I wanted to experiment and learn more about the internal mechanisms. That’s reason enough, after all.

After the ejection process is complete, quite a few files are made available in a `config` folder. In it, there is a webpack configuration file for both development and production. Through it, I was able to make all of the changes that I listed above.

Coming at the project from this direction helped give me a jump start. I would have had a lot to figure out if I had started from scratch, and it would have taken much longer to get to a place where I could actually start on the project itself. By ejecting the app after getting my bearings, I was able to get comfortable enough before digging deeper. That being said, Create React App really wasn’t meant to be used within another project. Which, I probably should’ve known. Now I do.

In the end, I was able to place `index.md` inside of the /next-spacex-launch directory, and then point to `main.js` inside of the build folder. I am including all of the styles as part of the Jekyll build process, so it’s just the script that is needed. I certainly have more to say about the app itself and how I’m displaying the data, but that’s for another day.
