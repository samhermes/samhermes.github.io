---
title: How to use CSS container queries
date: 2023-07-30
tags:
- CSS
---

Of all the exciting things happening with CSS, I think container queries are at the top of the list for me. [Browser support](https://caniuse.com/css-container-queries) is really strong at this point, so while I'd still exercise a bit of caution based on project context, we're entering the phase where we can seriously consider them without fallbacks.

## What are they?

At a high level, container queries make it possible to create totally modularized, responsive components. The styles do not need to be aware of the current viewport width. We can define how we'd like components to display or rearrange solely based on their container (as the name implies).

The perfect example for this is a card component. With media queries, we have to tie the card's layout to the viewport width, which isn't very flexible if we want to use it in a variety of different places. With container queries, we could place the card in a two column layout, or in a sidebar, or at full width, and use the exact same markup and styles for it.

## How do they relate to media queries?

In many cases, container queries can neatly replace media queries. Media queries become much more useful for overall page layout changes, and container queries are most powerful on a smaller scale.

## How to use them

To start, container queries require that you define a "containment context." Basically what you're doing is flipping the switch on an element to say that it is a container. By default, no element is a container, and this gives you control over which element is truly the outer element (or "container") of a component. In an element with several nested elements, it would get complicated really quickly without the ability to specify which is the container.

### Inline size vs size

When you define a containment context, you use the `container-type` property and give it a value of either `inline-size` or `size`. This was confusing to me at first, as they seem really similar. What I've found is that in most cases, `inline-size` is what I would want to use. The default value for this property is `normal`, in the event that you need to turn off a container.

```CSS
.container-element {
	container-type: inline-size;
}
```

### Default usage

Once you've set the containment context, you can use the new `@container` on any of the elements inside of the container.

```CSS
@container (min-width: 30em) {
	.child-element {
		font-size: 2rem;
	}
}
```

### Named containers

If you've got a lot of containers, naming them is a nice way to clearly specify which container you're referring to. This isn't absolutely required, as it will target the nearest ancestor container by default. That could get confusing pretty quickly, so naming containers seems like a sensible default.

```CSS
.container-element {
	container-type: inline-size;
	container-name: card;
}
```

This could be shorthanded as `container: card / inline-size`.

Once you've got it named, you can reference it directly in the query.

```CSS
@container card (min-width: 50em) {
	.child-element {
		font-size: 3rem;
	}
}
```

### Container query length units

That rolls right off the tongue, doesn't it? These are really just some [new units](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries#container_query_length_units) that conceptually pair with the viewport units that we've had for a little while. Instead of using the viewport to calculate their values, they use the current container. Helpful for font sizing and other dynamic sizing. I've never gotten into using viewport units at a component level, as it's always felt a little too disconnected to me, but they make a lot more sense in the context of a container query.

## Where to use them

The possibilities are really endless. It's obvious that these have been developed with the intention of maximum flexibility. I could see them taking over most media queries in any given project, from global components like navigation to small in-content components like callouts. I feel like this is bringing an end to the practice of having a defined list of breakpoints for a project and instead making definitions on a component level. As mentioned before, card components feel like the most immediately useful context for this, and the place I'll start.
