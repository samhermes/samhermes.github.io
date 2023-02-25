---
title: Giving the dialog element a whirl
date: 2023-02-25
tags:
- Accessibility
- HTML
- JavaScript
---

After [Scott O’Hara’s suggestion to use the dialog element](https://www.scottohara.me/blog/2023/01/26/use-the-dialog-element.html), I thought that it was time to try it out, see how it works, and what’s different or improved from the way I was approaching dialogs previously. To get yourself acquainted, here’s [the MDN docs article about it](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog). Additionally, if you’re looking for a quick, simplified demo, see [this demo from Google](https://googlechrome.github.io/dialog-polyfill/).

## Styling

My first reaction, naturally, was to the browser default styles. They are mostly the same across browsers. There’s a black border, a bit of padding, and positioning to center the element in the viewport. All of them are easy to adjust or remove, but it’s a little strange to have so much browser-default styling. It really suggests a more specific use of the element than is typical.

For the display/hide functionality of the dialog, it uses the display property, and toggles it between `none` and `block`. This works, but means that we are limited on the amount of animation that we can use. `transition` won’t work, so keyframe animations are needed, and we’re only able to animate the dialog in, not out, as `display: none` will hide it immediately. 

Notably, if we attempt to handle the display state ourselves, such as by setting `display: block` all of the time and replacing it with `visibility`, we lose all of the accessibility features that are inherent in the element. So, that’s a bummer. [Maybe that will be a non-issue soon?](https://css-tricks.com/so-youd-like-to-animate-the-display-property/) 🤞 If you’re interested in getting around this in the meantime, I found [this web.dev article](https://web.dev/building-a-dialog-component/) to be a good example of how to approach that (though the author gets quite distracted by his CSS variable library).

Additionally, when using the dialog in its modal state (more on that in a moment), it comes with a backdrop pseudo element that also comes with some browser-default styles. These are easy to adjust as well, though there is [apparently a quirk where it doesn’t currently inherit anything](https://kilianvalkhof.com/2023/css-html/backdrop-doesnt-inherit-from-anywhere/), rendering your custom properties useless in its context.

## Functionality

I had assumed that all of the functionality required to hide and show the dialog would need to be managed through JavaScript. As it turns out, not all of it does. It would be so cool if none of it did.

If you insert a `<form>` element into the dialog, with a `method` attribute of `dialog`, it will use the submit button of that form to close the dialog. If the form has only one button, it will use that one, or if it has multiple buttons, it will use the submit button. Again, this heavily suggests a specific use-case for the dialog element, where you’re collecting info from the user.

```html
<dialog>
	<form method="dialog">
		<button type="button">Close</button>
	</form>
</dialog>
```

To open the dialog, some JavaScript is required. There are two methods that can be called, `.show()` and `.showModal()`. I wrongly assumed that these were the same, but they are not. `.show()` will open the dialog in “non-modal” mode, whereas `.showModal()` will open it in “modal” mode. [Read more about showModal on MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal). And, to learn about the differences between modal and non-modal dialogs, [Nielsen Norman has a great explainer](https://www.nngroup.com/articles/modal-nonmodal-dialog/).

If you need to customize the close functionality of the dialog, there is a `.close()` method. This could be used for a “Cancel” button if you’ve got both a “Submit” and “Cancel” button.

One thing that you get for free with the dialog element is that the escape key will close the dialog, no hooking up necessary. Absolutely delightful.

Relatedly, a common pattern that people like to implement is the ability to close a dialog by clicking anywhere else on the page. This isn’t natively supported by the dialog element. There is no event listener for the backdrop element (as it’s a pseudo element and has the same limitations), so it would require an approach of [listening for clicks on anything that isn’t the dialog itself](https://stackoverflow.com/questions/25864259/how-to-close-the-new-html-dialog-tag-by-clicking-on-its-backdrop).

## Managing focus

A great perk of the dialog element is that it manages focus for you. When the dialog is opened, the first focusable element will receive focus, and then when the dialog is closed, focus will be returned to the element used to open the dialog. This is always tricky to manage, especially in cases where the context may change, the contents of the dialog may change, and all of that. Having it work out of a box is a great time saver.

## Focus trap behavior

A second great perk of the dialog element is the browser-provided focus trap behavior. If you’re unfamiliar, this is what keeps your tab stops locked inside of an element when it’s active. In this case, when the dialog is open in its modal state, you can only tab to focusable elements in the dialog. The rest of the page is inaccessible.

As previously mentioned, there is a modal and a non-modal version of the dialog. In the non-modal version, there is no focus trap, so this is another important difference between the two.

Back to the modal version, one issue that seems a little strange to me is that the focus trap includes the address bar as a tab stop. This adds an extra step to get back around to the top of a dialog. However, a dialog is meant to represent a separate document (heading hierarchy should start over at h1 again), so I suppose that this sort of makes sense in that context.  Apparently this has been debated, as [Nolan Lawson details about halfway down in this article](https://nolanlawson.com/2022/06/14/dialogs-and-shadow-dom-can-we-make-it-accessible/).

## Conclusion

It definitely feels like this element is ready for use, based on what I’ve read and noodled around with here. It’s not without its quirks, but it seems like those quirks are less than the quirks of the current manual approach, which is our benchmark here in the front-end world. [Browser support is really good](https://caniuse.com/?search=dialog), but I’d really like to know more about how the element performs in different screen readers, and if screen reader users have any trouble with it before making it my default approach.