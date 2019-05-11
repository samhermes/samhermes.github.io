---
layout: post
title:  What changes on hover should be actionable
date:   2016-08-07
categories: [CSS, Components]
---
This falls clearly in the realm of opinion, but I thought I’d share my thoughts anyway. If an item has a hover state, that hover state should highlight the part of the item that an action can be taken on. To illustrate this, I’ve created an example card. When hovering over the card, an outline appears. However, only the link at the bottom is actionable.

<div class="card-container">
  <div class="card">
    <h1>Porano Pasta</h1>
    <p>Fast Casual Italian</p>
    <a href="http://poranopasta.com">Visit Site</a>
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

<style>.card-container {
  background: #f3f3f3;
  padding: 25px;
  margin-bottom: 30px;
}

.card {
  margin: 0 auto;
  max-width: 250px;
  padding: 15px;
  transition: 0.2s;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid transparent;
}

.card:hover {
  border: 1px solid tomato;
}

.card h1 {
  margin: 0 0 15px;
  font-size: 1.75em;
  line-height: 1;
}

.card p {
  margin: 0 0 35px;
  font-size: 1em;
}

.card a,
.card .action {
  color: tomato;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 14px;
  margin: 0;
  border: 0;
}

.card-container > a {
  display: block;
  margin: 0 auto;
  max-width: 280px;
  border: 0;
  color: #1D1D1D;
  text-decoration: none;
}

.card-container > a:hover {
  text-decoration: none;
}</style>