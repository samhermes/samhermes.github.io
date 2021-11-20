---
title: Migrate WordPress install from one DigitalOcean droplet to another
date: 2020-02-22 19:49:00 Z
---

Alternate title: “Upgrade” Ubuntu from 14.04 to 18.04 by just starting over with a fresh droplet because that’s far far easier than actually upgrading.

Gather ‘round kids, story time. We begin with my old droplet. There, I was running [Certbot](https://certbot.eff.org) to enable HTTPS. It worked beautifully, was really easy to set up, handled renewals quietly, it was great… until a couple of weeks ago when I received an email about ACMEv2. Apparently the version of Certbot that I had installed was running ACMEv1. And, apparently, the ACME protocol, [according to the Let’s Encrypt](https://letsencrypt.org/docs/client-options/) website, is the bit that it uses to “verify that you control a given domain name and to issue you a certificate.” Sounds important.

The problem, if you’re at all aware of Ubuntu versions, is that my old droplet was running a very, very out of date version. So out of date, in fact, that it reached its end of life [almost a year ago](https://www.omgubuntu.co.uk/2019/04/ubuntu-14-04-end-of-life). So, when I went to upgrade Certbot, it was stuck. I don’t blame it. In the Certbot documentation, it doesn’t even talk about Ubuntu 14.04.

As I started to investigate the possibility of upgrading Ubuntu, it became clear that this would be very messy and complicated, and way over my head. Sure, I could probably eventually get it figured out, but there’s actually a site running on the droplet that needed to remain available.

## Starting over

So, plan of attack was to create a new droplet, move the WordPress install, and then point the domain to the new droplet. Easy enough? I first started by using the WordPress image from the Marketplace. Makes is super easy. It had Ubuntu 18.04 on it, and all the stuff that WordPress needs (plus, Certbot!).

From there, I configured the WordPress install. This required accessing the site through an IP address, as I couldn’t use my domain yet. The old droplet was running a multisite install, so I made sure that the new instance was too.

## The migration

I have long struggled with migrations. To migrate the WordPress content from one server (or droplet, in this case) to another, there are two parts: the database and the wp-content folder. The wp-content part is easy, and at bare minimum, it could be copied via FTP (lots of people just closed out of this article 😓). The database is usually a little more mysterious to me. This time, though, I found a great article that helped me a lot:

[Using WP-CLI To Migrate WordPress to another server or your dev environment](https://medium.com/@devron/using-wp-cli-to-migrate-wordpress-to-another-server-or-your-dev-environment-bded1c78b9ee)

Skipping ahead to step 3, I did notice that the directory to the WordPress install was different between my two droplets. I wasn’t expecting them to be different, so something to watch for.

In step 4, the database migration takes place. The article does a pretty good job of explaining this, and the commands it suggests worked great for me. The first command in which it exports the database includes a `>`, which I wasn’t familiar with. Apparently it translates to “output to,” which is [part of a broader set of redirection commands](https://en.wikipedia.org/wiki/Redirection_%28computing%29). The article actually gets into this at the bottom. Essentially, the database is exported to an SQL file, copied to the new server, and then imported.

Next, I used `wp search-replace` as the article suggests to replace the domain with the IP address that I’d been using to access the site. This wasn’t necessary, as I could’ve just pointed the domain and gone from there. But, I wanted to get into the site and verify that everything had copied over correctly. I used this again after I’d pointed the domain to switch back.

Step 5 is where the migration of the wp-content folder takes place. The article suggests using `rsync` for this, and that was a new one for me. I hadn’t used it between servers before. This worked magically. I feel ridiculous for not having this in my toolkit already. It copied all of the files directly from one server to the other. Using FTP, I would’ve copied this all down from the older server to my machine and then back up to the new server. Like a caveman.

## Remaining issue

After I completed the migration, I noticed that there were some plugin updates. I normally just run these in the admin, but I kept getting an error message: “Update Failed: The update cannot be installed because we will be unable to copy some files. This is usually due to inconsistent file permissions.” I eventually just updated these manually on the server. Comparing the folder and file permissions, I’m not sure what is wrong, as they match. If you have any ideas... let me know.