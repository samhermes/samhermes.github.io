---
layout: post
title:  What changes on hover should be actionable
date:   2016-08-07
categories:
excerpt: If an item has a hover state, that hover state should highlight the part of the item that an action can be taken on.
custom_css: 2016-08-08
---
This falls clearly in the realm of opinion, but I thought I’d share my thoughts anyway. If an item has a hover state, that hover state should highlight the part of the item that an action can be taken on. To illustrate this, I’ve created an example card. When hovering over the card, an outline appears. However, only the link at the bottom is actionable.

<div class="card-container">
  <div class="card">
    <h1>Porano Pasta</h1>
    <p>Fast Casual Italian</p>
    <a href="http://poranopasta.com">Visit Site</a>
    </a>
  </div>
</div>

Hover states are becoming less and less important, but I still feel that this requires some consideration. I think that anything that changes when you hover over it should be one link. If there are multiple links within the element, then there should be no hover effect applied. Again, the card example, but with the link covering the entire element.

<div class="card-container">
  <a href="http://poranopasta.com">
    <div class="card">
      <h1>Porano Pasta</h1>
      <p>Fast Casual Italian</p>
      <p class="action">Visit Site</p>
    </div>
  </a>
</div>

Usually, as a page is navigated, the hover states are what indicates that something is actionable, so keeping this behavior will provide a more cohesive experience.
