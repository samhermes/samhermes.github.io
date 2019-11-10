---
title: How to improve the accessibility of tabs
date: 2018-06-04 00:00:00 Z
categories:
- JavaScript
- Accessibility
layout: post
custom_js: prism
---

For quite a few components on the web, there is an accessible way to implement them. For tabs, it’s a little more complicated. With a few attributes, however, we can get pretty close.

The elements for tabs are very simple. Just an unordered list, links, and `divs`.

```html
<ul>
	<li><a id="tab-1" href="#tab-1">Tab 1</a></li>
	<li><a id="tab-2" href="#tab-2">Tab 2</a></li>
	<li><a id="tab-3" href="#tab-3">Tab 3</a></li>
</ul>
<div id="tab-1-panel"></div>
<div id="tab-2-panel"></div>
<div id="tab-3-panel"></div>
```

With added JavaScript to toggle the visibility of the proper `div` at the proper time, this is all that’s needed to get tabs working for sighted users. Unfortunately, this is where many stop. However, vast improvements can be made with a few attributes, starting with `role`s.

For the unordered list and links, there are `tablist` and `tab` roles. In addition, each list item gets a role of `presentation` to remove semantic meaning.

```html
<ul role="tablist">
	<li role="presentation">
		<a id="tab-1" href="tab-1" role="tab">Tab 1</a>
	</li>
	...
```

For each `div`, there is the `tabpanel` role.

```html
<div id="tab-1" role="tabpanel"></div>
```

With this, there is a `tab` for each `tabpanel`, which begins to create a link between two elements that are otherwise unrelated.

Next, in a similar way, there are `aria-*` attributes that need to be added to tabs and tab panels. Going back to the tab list, there is an `aria-controls` attribute that points to the `id` of its corresponding tab panel.

```html
<ul role="tablist">
	<li role="presentation">
		<a id="tab-1" href="tab-1" role="tab" aria-controls="tab-1-panel">Tab 1</a>
	</li>
	...
```

As with `tab` and `tabpanel`, there is a corresponding attribute that goes with `aria-controls`. This is the `aria-labelledby` attribute, which needs to be added to each tab panel. The value of the attribute is the `id` of the corresponding tab.

```html
<div id="tab-1" role="tabpanel" aria-labelledby="tab-1"></div>
```

At this point, we established the proper identity of all the elements we wish to represent tabs. The last piece of this is to communicate the current state of the tabs. We need to communicate to the user which tab is currently selected, and accordingly, which tab panel is currently visible.

On each tab, there is `aria-selected` that can either be true or false. Using JavaScript, the current tab can be set to `true`, and the rest remain `false`.

```html
<ul role="tablist">
	<li role="presentation">
		<a id="tab-1" href="tab-1" role="tab" aria-controls="tab-1-panel" aria-selected="true">Tab 1</a>
	</li>
	...
```

Again, much like the `roles` and other ARIA attributes, there is a corresponding attribute for the tab panels. This one is slightly different, which is confusing at first. Each tab panel needs an `aria-hidden` attribute, which is set to `true` by default, and `false` on the currently active tab. It’s the reverse of the `aria-selected` attribute on the tabs, so this tripped me up.

```html
<div id="tab-1" role="tabpanel" aria-labelledby="tab-1" aria-hidden="false"></div>
```

Using JavaScript, these attributes can be updated as the user navigates from tab to tab. The currently selected tab needs to have `aria-selected` set to `true`, and the corresponding tab panel needs to have `aria-hidden` set to `false`.

For these tabs to remain accessible, JavaScript needs to be in working order. Fortunately, without JavaScript, the `href` attribute of each tab links directly to the proper tab. The tabs sort of become a table of contents that links down the page. For this reason, it’s good to test the tabs with JavaScript disabled to ensure that users navigating by keyboard still land in the proper place.
