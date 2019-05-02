---
layout: post
title: Explaining accessible modals
date: 2017-08-18
categories: [JavaScript, Components, Accessibility]
custom_js: prism
---
Accessibility on the web is tricky, and modals are even trickier. Fortunately, there seem to be quite a few resources for getting there, one being [Frend](https://frend.co). It includes a component for an accessible modal that provides a small JavaScript library that hooks up to a modal and takes care of the rest. Only problem is that it’s a little too component-ized to understand what’s going on under the hood. The documentation says that you can just call `var myModal = Frdialogmodal();` and you’re good to go. But what’s really happening, and how might we adapt it for our own use?

Before I dig into this, I think it’s worth pointing out that “modal” is sort of a loose definition of what this will work for. In my current project, it’s less of a modal and more of a change of focus. In the Frend component, the main work that the JavaScript is doing is keeping the focus within the modal content while it is open and then putting the focus back where it was when the modal is closed. Someone who is tabbing through the site should be able to enter the context of the modal and then get back out of it when they’re ready. This works for modals or any event where you might be shifting context based on user input.

## Event binding

First things first, the display of a modal has to be triggered by an action taken by the user. Likely, that’s a click on a button. When a click event occurs, we want to attach an event listener that will listen for `keydown` events like so: `document.addEventListener('keydown', modalTab);`

## Collecting all focusable elements

Next up, if we’re going to be using the tab key, we need to find all of the elements that we want to be tabbed through. Essentially, we want to begin restricting focus states to a select group of elements that are inside the modal, and then loop through them as if the modal were a miniature webpage.

We’re going to pass an array of all possible types of focusable elements into a function that will perform a `querySelectorAll()` within the context of the modal. Then we’ll end up with all of the elements to be tabbed through.

Here’s an array containing all possible focusable elements:

```js
var focusableSelectors = ['a[href]', 'area[href]', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', 'button:not([disabled])', 'iframe', 'object', 'embed', '[contenteditable]', '[tabindex]:not([tabindex^="-"])'];
```

Those are some pretty tricky selectors! For the most part, this will take care of just about anything you’d put in a modal, but you’ll want to make sure that this list matches up with reality.

Once we know what types of elements could be focusable, we need to look inside of the modal content and gather up any element that matches. We can do that with the following:

```js
var modal = document.querySelector('.modal');
var focusableElements = function() {
  return [].slice.call( modal.querySelectorAll( focusableSelectors.join() ) );
}
```

With this function, if there are two anchor tags and a close button in the modal, an array with the two anchor links and button will be returned. This function will be used in the next step anytime the tab key is pressed.

## Handling tab keydown

Now that the event listener is waiting for `keydown` events and we've got a list of all focusable elements, we can check to see if the user is using the tab key. This will be done within the `modalTab()` function, so let’s get that started.

```js
function modalTab(event) {
```

It’s important to pass the `event` in to the function so that we can capture which key is being used. Our first check will be just that, through the following check:

```js
if (event.keyCode === 9) {
```

The magic key code for the tab key is `9`. When I first learned that keys were mapped to numbers, it seemed like something that could fall apart pretty easily, but it holds up! Tech!

## Creating a focus loop

We now move into controlling what happens when the first or last element is tabbed past. We want to drop the user’s focus state back on the first element if they get to the end of the modal and hit tab, and this should work in the inverse as well.

The following code is still inside the `modalTab()` function, and inside the conditional tag we created above that’s checking to make sure the `keyCode` is `9`.

```js
// Get the index of the currently focused element within the modal
var focusedIndex = focusableElements.indexOf(document.activeElement);

// If the shift key is not in use, check to see if we're on the last element
if (!e.shiftKey && focusedIndex === focusableElements.length - 1) {
  // Focus first item within modal
  focusableElements[0].focus();
  e.preventDefault();
// If the shift key is in use, we're going backwards, so check to see if we're on the first element
} else if (e.shiftKey && (focusedIndex === 0 || focusedIndex === -1)) {
  // Focus last item within modal
  focusableElements[focusableElements.length - 1].focus();
  e.preventDefault();
}
```

We really don’t need to know what’s happening on the elements between the first and last element of the modal, their focus state can remain untouched by our script. We’re just waiting for the first or last.

## Removing event listener on close

We really only want to listen for keydown events while the modal is open, so we’ll want to remove this event listener when the modal is closed. Since this could unexpectedly cause issues with other elements on the page, it’s safest to restrict our functions to just the modal. We’d remove the event listener like so: `document.removeEventListener('keydown', modalTab);`

## Additional considerations

Beyond handling the focus state, we’ll also want to manage state on a few other items. By default, the container of the modal should receive `role="dialog"` as well as `aria-hidden="true"`. When the modal is opened, the `aria-hidden` attribute should be updated to `false`, and then set back to `true`  on close. This could be done with the following: `modal.setAttribute('aria-hidden', true);`

This will vary based on what content is contained within the modal, but the first element should receive focus when the modal is opened. Whether this is just the first anchor tag or the modal container itself, the focus should be added to get the user started off properly.

To learn more about how this works, the JS file for the Frend modal component is a great place to start. Much of what I went over in this post is contained within. [View it on Github](https://github.com/frend/frend.co/blob/gh-pages/_components/dialogmodal/dialogmodal.js)