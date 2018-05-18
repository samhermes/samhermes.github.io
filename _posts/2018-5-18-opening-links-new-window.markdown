---
layout: post
title: Opening links in a new window
date: 2018-05-18
custom_js: prism
---
Over the past year, I’ve seen a few people discussing the security dangers of using `target="_blank"` to open links in a new window. The issue is that the page you open in a new window has access to the `window` object of the originating page. Seems fairly harmless, but this means the site in the new window could potentially redirect the originating page or perform some other malicious action without permission. Depending on where you’re linking off to, you may not know if the site is secure (especially if it’s loaded with ad trackers).

The recommendation is to only open links in a new window if you absolutely have to, which is a good practice from a user experience perspective as well. However, if you do open in a new window, ensure that the anchor tag has the following `rel` attribute applied any time you use `target="_blank"`.

```html
<a href="https://example.com" target="_blank" rel="noopener">Example</a>
```

Further information about this issue can be found at [Jake Archibald’s site](https://jakearchibald.com/2016/performance-benefits-of-rel-noopener/), where he also goes into detail about the performance benefits (who’d have thought?) of `noopener`.
