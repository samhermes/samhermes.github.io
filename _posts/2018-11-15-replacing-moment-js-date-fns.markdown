---
title: Replacing Moment.js with date-fns
date: 2018-11-15 00:00:00 Z
categories:
layout: post
custom_js: prism
---

In my [Next SpaceX Launch](https://samhermes.com/next-spacex-launch/) app, data is pulled from a [SpaceX API](https://github.com/r-spacex/SpaceX-API). It returns date and time information for each launch, which needs to be formatted before being displayed. When I started on this project, I quickly found Moment.js and determined that it could get the job done. It was easy to format a date with the following:

```js
<Moment format="MMMM DD, YYYY">{ mission.launch_date_local }</Moment>
```

This accepts the date and time string and returns a formatted date in `MMMM DD, YYYY` format. Using this for time is similar, just passing in `h:mm a` as the format.

The issue with using Moment.js for this is that it’s just simply overkill, as demonstrated by the [You-Dont-Need-Momentjs](https://github.com/you-dont-need/You-Dont-Need-Momentjs) repo. In my simple application, I’m merely wanting to format a handful of dates. Passing Moment.js off to the user means that they are loading extra code in the browser unnecessarily. Fortunately, there’s a simpler library, `date-fns` that gets the job done in much the same way.

I uninstalled `react-moment` and `moment` from my project, and then installed `date-fns`.

```markup
$ npm uninstall react-moment
$ npm uninstall moment
$ npm install date-fns
```

I then updated the import statement inside of each component.

```js
import format from 'date-fns/format'
```

Now, in the app, in the places where I was using `<Moment>`, I swapped it out for `format()`.

```js
{ format( mission.launch_date_local, 'MMMM DD, YYYY' ) }
```

Simple as that! In the end, the end user gets a completed page a little quicker, with the exact same functionality.