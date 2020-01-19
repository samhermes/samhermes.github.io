---
title: Using Docker for local WordPress development
date: 2020-01-19 23:32:00 Z
---

I definitely knew about Docker before this, but I’d never really started from the beginning. Fair warning, most of this is going to essentially be a stream of consciousness as I attempt to set up Docker for local WordPress development. There are better guides out there, but I wanted to capture some of the questions or uncertainty that I had throughout, possibly that others haven’t answered or addressed previously. You know, noob stuff.

***If you’d like to skip to the part where I’ve got it all figured out,*** [***come with me to the bottom of this article***](#putting-it-all-together)***.***

## Docker Desktop app

I started by downloading the Docker app from their website. I like a GUI, so it seemed like a good place to start. It installed, I opened it, and now it says that “Docker Desktop is running” in the menu bar dropdown. Okay, cool, so the app that I opened is running... Like with most new software, it’s hard to know what it all means. Usually when an app is running, it’s running. So.

Apparently, Docker Desktop installs Docker “Engine” on your machine as part of the installation process, which is basically the main bit of software that makes Docker work. [According to their documentation site](https://docs.docker.com/docker-for-mac/install/), you also get Docker CLI client, Docker Compose, Docker Machine, and Kitematic as part of the installation. So, we have a lot of stuff. Cool.

## Docker Hub

During the installation process, it has you go through some steps to create a Docker account, create a sample repository, and pull it down to your machine. It’s supposed to teach you how it works, I assume, but it mostly just made me more confused.

First, didn’t know that Docker had repositories. With a Docker Hub account, you can store your “containers” in repositories. I was thrown off by the use of the word “repository” in this context. Is a repository just a container? To confuse this further, if you go to the Explore page in Docker Hub, it lists containers that you can use. Each of these is an “image.” Listen, I went to college. I’m not dumb. I’ve been using computers for a long, long time. Why is each new thing so confusing?

For now, let’s move on.

## Installing WordPress

While exploring the available images in Docker Hub, I found one for WordPress. It’s near the top of the popular list, which makes sense. I clicked through to it, and just had a lot of questions really quickly. The main action, it appears, is to pull the image. It suggests `docker pull wordpress` at the top of the page. Further down, there’s a section called “How to use this image” and instructions to run `docker run --name some-wordpress --network some-network -d wordpress`. So, wait, which one do I want? I can pull the image down, or seemingly just run it? Do I pull it down first, or just run it?

So, from here, I just Googled “local wordpress development docker” and read through the first few results. On [this ThemeIsle article](https://themeisle.com/blog/local-wordpress-development-using-docker/) from 2018, I was with it until it wanted me to create a configuration file. So, step 2. So, now I’m more confused. Do I need to do a manual configuration, or can I just use the WordPress image from Docker? Why isn’t this article just starting me out with the very basics?

Okay, I have **got** to start answering some of these questions.

I started at the top. I ran `docker pull wordpress` in my terminal and watched as it downloaded the image. It took like 10 seconds or so and then it was done. That was it. So, now I have it on my machine. Where? Do not know. How do I use it? Do not know.

Next, I created a new directory in my user directory called “Docker” and inside of it, I created another directory called “wp,” just for testing purposes. In my terminal, I `cd`’d to that directory and went to the next command, `docker run --name some-wordpress --network some-network -d wordpress`. First, name seems pretty easy. I changed it from `some-wordpress` to `wp` to match my directory. Network, though, was a little puzzling. Can it be anything? No, of course not!

I ran the command just the way it was to see what would happen. `docker: Error response from daemon: network some-network not found.` was the response. Well, figures. Didn’t expect it would find it. Back to the image page. There, a little bit further under the “How to use this image” section, it suggests that “standard port mappings can be used,” and then repeats the command with them in place: `docker run --name some-wordpress -p 8080:80 -d wordpress`. I modified my initial command to use `-p 8080:80` instead. It did something very quick and then gave me a really long hash! Great… what does it mean?

From the docs, I learned that I could run `docker ps` for a list of the currently running containers. I ran that, and could see that the container I created was there. So, I opened my browser, and visited `localhost:80`. Nothing found. Isn’t that where it would be? Back to the WordPress image page, it states that the site is available at `http://localhost:8080`. Ah, right. So, I opened that up, and it’s the WordPress startup page! Woohoo!

The excitement was short-lived, though. On the database connection page, I was again lost. What’s the name of the database? What’s the username/password? Is there a database? Of course there is, right? That super quick command I ran that took about 1 second to give me a random hash surely spun up a database! Right…?

Maybe `root` is the username? But what is the database name? It was pre-filled with “wordpress” but that didn’t seem likely.

## Maybe this isn’t for me

At this point, I’m close to giving up. This is a sysadmin tool and I’m not a sysadmin. Back at Google, I just search for “docker” and read “Learn how Docker helps developers bring their ideas to life by conquering the complexity of app development” under the result for the official Docker site. Oh no, I haven’t conquered anything.

I’ve been using VVV for my local WordPress development for over four years now, maybe five? My assumption was that Docker would be better than Vagrant, or easier to understand.

## Finally, breakthrough

I returned to my “local development wordpress docker” search and came across [this article](https://neliosoftware.com/blog/local-wordpress-development-with-docker/). In it, in speaking about the WordPress image I had used, it states, “this image doesn’t include the database system.” Ah, I see. So it’s a WordPress container, with *just* WordPress in it. Now I know why I was at a loss for the database credentials. It didn’t even exist.

As part of further Googling, I came across [10up’s WP Local Docker](https://github.com/10up/wp-local-docker-v2). Okay, now we’re really getting somewhere. This is what I assumed the Docker Hub image was. In fact, the reason most of the articles suggest starting with a configuration file is that it’s necessary to bring the database and WordPress together. Fortunately, WP Local Docker takes care of this piece.

By the way, the [documentation on 10up’s site for WP Local Docker](https://10up.github.io/wp-local-docker-docs/) is great, except every time I land on one of their documentation sites, I assume that the top navigation is global for 10up itself, so I have a bit of a blind spot. In this case, the navigation is for WP Local Docker specifically. The 10up logo will take you to the WP Local Docker homepage, not the 10up site itself. I… have some feedback.

## Putting it all together

First, install [Docker Desktop](https://www.docker.com/products/docker-desktop) on your machine. This will get all of the necessary components installed, like the Docker Engine, Docker CLI, and Docker Compose.

Next, globally install the NPM package for WP Local Docker from 10up using `npm install -g wp-local-docker`.

To create your first site, run `10updocker create`. It will prompt you with questions.

The first time I ran this, I received an error message:

```BASH
ERROR: for mysql  Cannot start service mysql: b'Mounts denied: The path /usr/local/lib/node_modules/wp-local-docker/global/config/mysql/config.cnf is not shared from OS X and is not known to Docker.
```

To remedy this, I added `/usr/local/lib/node_modules/wp-local-docker/global/config/mysql` to the File Sharing preferences in Docker Desktop. It worked. I assume that this is a bug with WP Local Docker, and may be fixed? I’m not sure why just mysql had trouble and not the others.

Now, the new site is up and running at the address you specified during setup. Run `docker ps` and you’ll see all of the containers involved in bringing the site together. Quite a few more than I was trying to start with.

## Finishing up

Going back to the articles that I started with, it’s easy to see how starting with a configuration file makes the most sense. You can say exactly what you want. However, this often seems to leave out the networking part. Using custom domains like `wordpress.test` is hard to do when you’re starting out with a custom configuration. It seems like using WP Local Docker at least solves this issue more quickly than someone could on their own.

This was really similar to how I started with VVV. I didn’t know what Vagrant or VirtualBox were, and even VVV was kind of complicated to get the hang of. I used a tool called Variable VVV (gosh, what a confusing name) that walked through questions similar to WP Local Docker, just to simplify the process. It was good, as it got me going quickly, but I was unfamiliar with what it had actually done.

Now, I’d like to more deeply understand how to set up my own Docker configuration file. It seems like I can find good examples of the database and WordPress pieces, but getting it all set up to work with custom domains is a little more involved. Something to keep plugging away at!

## Goodbye VVV?

Eh… I don’t think so. I think it works just fine for now. So yeah, maybe this was all just a learning exercise. 😭