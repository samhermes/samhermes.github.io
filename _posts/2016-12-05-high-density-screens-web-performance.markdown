---
layout: post
title:  High density screens and web performance
date:   2016-12-05
categories:
excerpt: High density screens and the web are at odds. On one side, we want sites to look as crisp as possible, no matter where they are being viewed, but on the other hand, performance is incredibly important.
---
High density screens and the web are at odds. On one side, we want sites to look as crisp as possible, no matter where they are being viewed, but on the other hand, performance is incredibly important. Actually, most important.

Say that we begin preparing images for 2x devices. We serve up images that are four times bigger in file size, and they look great on a Retina MacBook Pro. That's great. But, look at it on a 5K iMac, and we're essentially back to square one. Also, we forgot to ask, but did that MacBook Pro user want to download an image that was four times bigger? Maybe they were on a slow connection and did not really care to. Should we be making those decisions for them at this point? I think we should be waiting for browsers to get smarter about this.

Currently, my goal is to prepare everything, except for photos, for any pixel density. I think that by leaving photos at or slightly above their display size, it optimizes for web performance. Photos are the hardest to tell if they are not at the correct pixel density. If there is text in an image, it should be served up in higher density. Otherwise, 1x is good enough for now.

I think sites are in good shape if they convert all remaining graphical elements to vector, including interface controls. If you can do it in a vector graphic, it's ready for the future. Right now, the support for SVG is fantastic, and they are fairly performant. I think they are what I am most excited about on the web at the moment.
