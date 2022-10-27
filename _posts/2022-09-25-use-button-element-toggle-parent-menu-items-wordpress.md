---
title: Use button element to toggle parent menu items in WordPress
date: 2022-09-25
tags:
- Accessibility
- WordPress
---

If you’re here for the code, skip to [Modifying the WordPress navigation markup](#modifying-the-wordpress-navigation-markup).

## The issues

Dropdowns are still ubiquitous across the web, and are still in various states of usability. One of the biggest possible issues is with the top level, or parent, menu item. Sometimes they are linked, and sometimes they act as a toggle. When linked, they can easily be missed, as the user is presented with the child items on hover, suggesting that they make a selection instead of starting with the parent.

Additionally, if the top level menu item is a link, and its hover state acts as a way to reveal the child menu items, we run into several issues:

- A user on a touchscreen device can end up being sent directly to the parent page, missing the child pages, and if those child pages aren’t linked to in the content of the parent page, they could be missed entirely. Someone may only get to them using search, at best.
- A keyboard user could tab to the parent menu item, and also have no way of toggling open the child menu items. Selecting the parent would go directly to the parent page, effectively replicating the touchscreen issue.

## What to do about it?

Enter the button element! If we are going to have a dropdown, we need to have a toggle button available to the user. We have two approaches we could take:

- The entire parent level item could be the toggle button. A user could press it, and the child pages are revealed. If we need to link to a “parent” page, this could be the first item in the dropdown, presented as something like “Overview.” This easily takes care of the problem. In some cases, this might free us from creating a landing page where it may not have even been necessary anyway. With this approach, we should place an arrow or chevron next to the text, to communicate how it works to the user, and help them differentiate between toggles and other menu items that are simply links without children.
- The parent level item could remain a link, and we could place the toggle button next to it. Again, similar to the previous approach, this could be presented as an arrow or chevron, but we would need to ensure that this is presented clearly enough that the user could understand that the parent is a link, and the button is a button. Visually, they’ll likely need some sort of separation, such as a border or background color.

## Modifying the WordPress navigation markup

Out of the box, WordPress doesn’t have a way to use a button element in the navigation functions. For this post, I’m using `wp_nav_menu()` to output a menu. This is a really easy function to use, but it has limited direct customization options for the markup. For that, we’ll need a filter.

In the following function, it goes through each navigation item, checks to see if it is a parent, and then, if so, modifies the output to wrap the item in a button element. It isn’t done here, but we could narrow this to a specific menu if we needed or wanted to using `$args->theme_location`.

```js
function projectname_parent_menu_item_buttons( $output, $item, $depth, $args ) {
  if ( in_array( 'menu-item-has-children', $item->classes, true ) ) {
		$output = '<button type="button" class="menu-item-toggle" aria-expanded="false" aria-controls="sub-menu-' . $item->ID . '">' . $item->title . '</button>';
	}
	return $output;
}
add_filter( 'walker_nav_menu_start_el', 'projectname_parent_menu_item_buttons', 10, 4 );
```

For this button to meet accessibility standards, we need to keep a couple of other items in mind. First, you’ll notice that there is an `aria-expanded` attribute that’s been added to the button element. This tracks the current status of the dropdown menu, so that a screen reader user will know whether or not a dropdown is open when they land on this button. In PHP, we set the initial value to `false`, but we’ll need to switch this to `true` when the user opens the dropdown, and back to `false` when they close it.

Next, you’ll see `aria-controls`. This needs to contain a unique ID, and tells a screen reader user which dropdown this button connects to. We apply the same ID to the dropdown element’s `id` attribute, and ensure that this ID is not used anywhere else in the markup. This will likely require a walker, but could also be applied with JavaScript. Using the navigation item’s ID that WordPress gives us is a good starting place, and keeps us from needing to set all of this up ourselves, but we’ll want to use caution that this is truly unique.