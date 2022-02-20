---
title: Adding dark mode support
date: 2019-06-06 00:00:00 Z
tags:
- CSS
- Design
---

I just pushed an update to my site to add support for dark mode. If a user visits the site while their device is set to prefer a dark color scheme, they'll receive a specially designed version of the site. I was inspired to dig into this after viewing a WWDC video about [dark mode and web content](https://developer.apple.com/videos/play/wwdc2019/511/).

It's a super easy to add styles for dark mode using `prefers-color-scheme`. A rule set in Sass would look like this:

```css
.project-link {
    background: #282a36;

    @media (prefers-color-scheme: dark) {
        background: #fff;
    }
}
```

At the moment, the [support isn't great](https://caniuse.com/#search=prefers-color-scheme). The latest versions of Safari and Firefox have it included. On the horizon, however, it appears that Chrome will be adding support. With other browsers, like Edge, taking advantage of the Chromium rendering engine, support will spread rapidly.

Although the `prefers-color-scheme` media feature (PS, [just learned that that's what these things are called](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#Media_features)) is the best way to adapt styles for dark mode, there is also a `color-scheme` style property. By adding it to the `:root` selector, you could communicate that your entire site supports (or doesn't support) dark mode. One advantage of communicating this is that browser-based elements like form controls will adapt accordingly.

The rule set for `color-scheme` would look like this, [thank you webkit.org](https://webkit.org/blog/8840/dark-mode-support-in-webkit/):

```css
:root {
    color-scheme: light dark;
}
```

The `color-scheme` property is [still in a draft](https://drafts.csswg.org/css-color-adjust-1/#color-scheme-prop), so I'm not sure when we'll see it widely adopted. It's good to know that it's coming though, as it helps to provide full dark mode control.