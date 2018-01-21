---
layout: post
title: Getting started with CSS grid
date: 2017-11-06
custom_js: prism
---
CSS grid has been out in the wild for a little while now, and though I still have a little hesitation about putting it into production, it’s worth studying up on it. For all of the complexity that CSS grid brings, it’s incredibly simple to get started. Many of the basic layout tasks that I’ve attempted so far have only required a few properties to be specified on the parent element. Let’s look at a run-of-the-mill example.

## Two Column Layout

One of the most common layouts, this used to require a pairing of floats and widths. Although `calc()` introduced new possibilities for how widths could be calculated, it still wasn’t powerful (or easy) enough.

We begin by enabling grid on the parent element with a new value for the display property.

```css
.two-column {
	display: grid;
}
```

From there, we need to decide the widths for each column. For a sidebar, we could set up a fixed or flexible width for it. Here, we give it a fixed width of `15em`.

{% highlight css %}
.two-column {
	display: grid;
	grid-template-columns: 15em 1fr;
}
{% endhighlight %}

As you probably noticed, we’ve got a new measurement in use here. CSS grid adds the `fr` unit, or fraction unit. It’s incredibly powerful, and here, using `1fr`, it fills up the remaining space.

We can use the fraction unit to develop our own grid system of sorts, and the possibilities are unlimited. To create a percentage-based layout similar to what we’ve already done, we use two values in fractions.

{% highlight css %}
.two-column {
	display: grid;
	grid-template-columns: 10fr 4fr;
}
{% endhighlight %}

If we’re on a fairly large screen, this layout probably looks great. However, we probably only want to apply it when the screen is wider than `600px`, or `37.5em`, or so.

{% highlight css %}
@media screen and (min-width: 37.5em) {
	.two-column {
		display: grid;
		grid-template-columns: 15em 1fr;
	}
}
{% endhighlight %}

This feels really familiar, and goes along with what we’ve been doing with flexbox. Using grid with media queries, we only apply the layout changes when we’d like them to take effect.

The last piece of this layout is the most exciting. Whereas we needed to perform quite a bit of management of the margin between elements with float layouts, this is no longer an issue. Grid gap takes care of this in a clean, simple way. Floats required adding margin to both sides, or removing it from the last child. Grid gap just gets to the point.

{% highlight css %}
.two-column {
	display: grid;
	grid-template-columns: 15em 1fr;
	grid-gap: 5em;
}
{% endhighlight %}

Here we’re telling grid to set the first column to `15em`, then add a blank `5em` gap, and then fill up the remaining space with the second element. A flexible or fixed value could be used here, just like with our column measurements.

It’s incredibly exciting to have such a powerful layout engine baked into browsers, and I can’t wait to use these properties in production. With the appropriate fallbacks, those who wish to live on the edge can use CSS grid in production today. I’ll be writing about how that can be done next.
