---
title: Fade in and out element with CSS transition
date: 2021-11-05 11:15:00 Z
custom_js: prism
layout: post
---

Here we have an element that is using `position: absolute`, and is not visible when the page loads or by default. In this case, we can rely on `visibility` to control whether or not the element is visible. As the element is using `position: absolute`, it doesn't matter if it continues to take up space when its hidden, one of the gotchas of using `visibility: hidden`. Here, we transition opacity to give the fade in/out effect.

```sass
.class-name {
	opacity: 0;
	visibility: hidden;
	transition: opacity 0.5s cubic-bezier(0.2, 1, 0.3, 1), visibility 0s 0.5s;

	&.is-active { /* This could be :hover on a parent element additionally or instead */
		opacity: 1;
		visibility: visible;
		transition: opacity 0.5s cubic-bezier(0.2, 1, 0.3, 1);
	}
}
```

So, what’s the trick here? It’s the delay on visibility on fade out. For the transition back to the default state only, we add a transition to visibility with a duration of 0s and a delay of 0.5s, matching the duration of the opacity transition. This allows us to see the opacity being transitioned before the visibility is set to hidden. There is no transition that could be applied to visibility, so we’re really just taking advantage of the ability to delay it.
