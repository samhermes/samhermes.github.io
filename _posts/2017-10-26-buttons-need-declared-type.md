---
title: Buttons need a declared type
date: 2017-10-26 00:00:00 Z
---

When using a `<button>` element, the default type is `submit`. So, if you’re just going for a toggle button or other interactive functionality, `type="button"` should be added.

I was reading through [an article in CSS Tricks](https://css-tricks.com/random-interesting-facts-htmlsvg-usage/#article-header-id-12) from last November about HTML/SVG usage, and it notes that in their study of sites in the wild, about 30% of buttons did not have any attribute at all. Hate to admit, I think I've contributed to that figure.

Of additional interest, buttons do not need `role="button"` as it is implied. This is according to the [HTML specification on buttons](https://w3c.github.io/html/sec-forms.html#the-button-element), where it notes that ARIA roles that match the implicit role of the element are not recommended. Further reading about this can be found at [w3c.github.io/html/dom.html](https://w3c.github.io/html/dom.html#aria-authoring-requirements)
