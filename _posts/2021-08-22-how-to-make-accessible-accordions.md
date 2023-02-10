---
title: How to make accessible accordions
date: 2021-08-22 20:29:00 Z
tags:
- Accessibility
- HTML
- CSS
---

The time has finally come. I'm going to try and make accessible accordions. This, I know, has been solved by literally so many people. They are in every design system. They litter CodePen. It’s a bit of a goldilocks problem, though. Some of them are too simple, some of them are too complicated. Some of them are, rightly so, very specific. I've made quite a few of them myself, and each time I go to make them, I start somewhere different.

The biggest concern with accordions is making them accessible, which is a baseline requirement. Sure, they should look good and preferrably have a nice animation, but they need to be accessible first. At their very core, they are simply a pairing of a heading and some content. Take away the accordion, and the hierarchy should still make sense.

## The markup

Whether it's through a CMS or hand-coded, accordions do require some special markup to start with. With Gutenberg in WordPress, or whatever building solution, it can be easy to make this super simple to set up for the first time, and then use anywhere. In fact, the more that that can happen, the better, as standards evolve, and making updates as easy as possible is a win for everyone.

```html
<div class="accordion">
	<div class="accordion-heading">
		<h3>Accordion heading</h3>
	</div>
	<div class="accordion-content">
		<p>Accordion content</p>
	</div>
</div>
```

Now, before we get carried away, we've already introduced a heading into this accordion, which is setting off accessibility alarms. Whether it's in HTML, or in editors like Gutenberg, it's important that accordion heading levels can be adjusted. We should never lock a heading level, or assume that we know what it will always be. It must be contextual. We'll add styles so that it always looks the same while in an accordion, no matter what level.

## Starting the script

As we don’t want to limit ourselves to a single accordion per page, we’ll want to keep multiple accordions in mind as we start the script. To keep this as simple as possible, I’ve used `querySelectorAll`. I'm also just using `.accordion`, which could run into conflicts if being used alongside other plugins or scripts, so it might be worth prefixing this for your specific project.

```js
const accordions = document.querySelectorAll('.accordion');

accordions.forEach((accordion, index) => {

});
```

This will give us an array of all of the accordions on the page, and we can loop through each of them with `forEach`, applying the same modifications to each.

Next, we want to grab the heading and content elements, to get those ready for modifications that we’ll need to make. We can take advantage of `accordion` to narrow our scope for `querySelector`, so it will only get the heading and content of the current accordion. I like to store this in an object to make it easier to reference later and understand.

```js
const elements = {
	heading: accordion.querySelector('.accordion-heading'),
	content: accordion.querySelector('.accordion-content'),
	headingChildren: accordion.querySelector('.accordion-heading > *')
}
```

## Wrapping the heading in a button

As we’ll only turn this markup into an accordion if JavaScript is enabled, it makes sense to modify the markup through JavaScript as well. Additionally, this prevents the user from needing to add them, so it enforces consistency.

First, we need to wrap the accordion heading in a button element. The easiest way that I’ve found to do this is to use `createElement` and then set attributes as needed. This is just a toggle button, so it needs a `type` of `button`. On the CSS side of this, you'll likely want to remove almost all of the default button styles, whether that's just the browser defaults, or global button styles inside of your project. It needs to act like a button, not necessarily look like it. As always, either leave the browser default outline styles in place, or be sure to add your own custom focus styles. The user should know where their focus state is at all times.

```js
const button = document.createElement('button')
button.setAttribute('type', 'button')

button.appendChild(elements.headingChildren)
elements.heading.appendChild(button)
```

## Adding accessibility attributes

Now that we have a button, it’s time to start setting the proper attributes. We need to tie the heading/button to the content, so we add `aria-controls` first, using the `index` provided by `forEach`. Next, we set `aria-expanded` to `false` to signify that the accordion is currently closed, but if it were to be open when the page loads, then the value should be set to `true`.

```js
button.setAttribute('aria-controls', 'accordion-' + index)
button.setAttribute('aria-expanded', 'false')
```

Next, for the heading content, we need to add the corresponding `aria-controlledby` that matches what we've set on the button.

```js
elements.content.setAttribute('aria-controlledby', 'accordion-' + index)
```

## Adding an event listener

Now that we have all of the attributes added, we need to appropriately toggle them when the user clicks on the button. Additionally, I like to add a class to the containing element for styling purposes.

This relies on the `aria-expanded` attribute of the button to determine what to do. This entertwines the open and close actions with accessibility, ensuring that we aren't getting those out of sync at any time.

Here, we call an open and close function to handle both updating attributes as necessary and handling animation.

```js
button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded')
    expanded === 'true' ? button.setAttribute('aria-expanded', 'false') : button.setAttribute('aria-expanded', 'true')

    if (expanded === 'true') {
        closeAccordion(accordion, elements)
    } else {
        openAccordion(accordion, elements)   
    }
})
```

## Opening & closing the accordion

Accordion animation techniques seem to be the part that varies the most across implementations. Some animation the height using `max-height`, some use JavaScript to actually animate the exact height, some just have the content appear, and some will fade in using a transform and/or opacity. Like all of animation, it nice to be able to customize this to fit with the overall approach of a given project.

My preference is to use JavaScript to animate the exact height. This is a little heavier than a pure CSS approach, but offers the best experience. Someday, it would be lovely if this sort of thing was built into the browser, but given all of the different approaches, this is probably nearly impossible to pull off.

Of note, I took the core of the upcoming functions from [Brandon Smith](https://www.brandons.me), through his [CodePen](https://codepen.io/brundolf/pen/dvoGyw) and the [associated CSS-Tricks article](https://css-tricks.com/using-css-transitions-auto-dimensions/) discussing transitions on auto dimensions. I love a concise demonstration of a concept, it helped me easily understand how this could be accomplished, which then made it easier to adjust as needed. Thanks Brandon!

Starting with a function to open the accordion, we pass in the accordion element itself, along with the child elements we defined earlier in an object, `elements`. First, it gets the height of the accordion content, using `.scrollHeight`. This works even though the element is currently not visible. It then applies that height to the element. This gives us something to animate to.

```js
const openAccordion = (accordion, elements) => {
    const contentHeight = elements.content.scrollHeight
    
    elements.content.style.height = contentHeight + 'px'
    elements.content.addEventListener('transitionend', function(){
        elements.content.removeEventListener('transitionend', arguments.callee)
        elements.content.style.height = 'auto'
    })

    accordion.classList.add('is-active')
}
```

Next, it adds an event listener to fire when the transition has completed. When this happens, the height of the content is fully opened. It then removes itself and sets the height of the content to `auto`. This allows for the page to be resized without cutting off any content or causing side effects. Last, it applies a class of `is-active` to the accordion container for styling.

To accompany this, some styles are needed. The height needs to be set to `0` by default, with the overflow hidden, and a transition added for the open and close animation.

```css
.accordion-content {
	overflow: hidden;
	transition: height 0.3s cubic-bezier(0.65, 0.05, 0.36, 1);
	height: 0;
}
```

Finally, the close function, which will peform the same actions in reverse. The biggest difference here is the use of `requestAnimationFrame()`, which ensures that we get a smooth animation. First, all CSS transitions are disabled, then the height is once again set on the accordion content, and then it is transitioned to a height of zero.

Where we previously set the height to zero after the animation completed, this time we wait for it to complete before removing the active class. This prevents the closed state from appearing for the user before it has actually closed.

```js
const closeAccordion = (accordion, elements) => {
    const contentHeight = elements.content.scrollHeight
    const elementTransition = elements.content.style.transition
    elements.content.style.transition = ''

    requestAnimationFrame(() => {
        elements.content.style.height = contentHeight + 'px'
        elements.content.style.transition = elementTransition
        requestAnimationFrame(() => {
            elements.content.style.height = 0 + 'px'
        })
    })

    accordion.addEventListener('transitionend', function(){
        accordion.removeEventListener('transitionend', arguments.callee)
        accordion.classList.remove('is-active')
    })
}
```

----

And that’s it! Super simple! Okay, fine, not really. It’s difficult, and I worked on this for weeks. There are probably things I’m missing, or things I’ll change in a month or two, but it’s a good place to be for now. You can see this in action in the [accordion component of Alexander](https://samhermes.github.io/alexander/components/accordion), a front-end starter kit I created. There are some added styles there that illustrate the possible uses of the `is-active` class.
