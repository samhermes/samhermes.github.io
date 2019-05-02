---
layout: post
title: Upgrading from Gulp 3 to 4
date: 2018-11-11
categories: [JavaScript]
custom_js: prism
---
We love when things just keep getting better! Gulp 4 has many new features, and with just a few changes to `gulpfile.js`, it’s easy to make the upgrade. Gulp 4 was officially released on December 31, 2017.

The biggest change is in how tasks are ordered. Previously, if there was a list of tasks that you wanted to complete, they would happen sequentially. Now, with a mixture of `gulp.series()` and `gulp.parallel()`, you can be a little more specific. `gulp.series()` will complete tasks sequentially, like before, and `gulp.parallel()` will complete them at the same time.

Let’s look at a 1 to 1 conversion. These are the changes I needed to make to my watch task, just to get things working like they were in Gulp 3.

For my watch task, I had:

```js
gulp.task('watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});
```

The change that needs to be made here is with the `['sass']` array. This defines which tasks should run when the watch tasks detects a change to any `.scss` file in the `sass` folder or any of its children. Since there is only one task to run, we can use `gulp.series()`.

```js
gulp.watch('./sass/**/*.scss', gulp.series('sass'));
```

This is a simple change, and things get only a little more complicated when there is more than one task to run. In my case, it was the `default` task. In it, I run the `sass` task, and then start the `watch` task.

Previously, it looked like this, a simple array:

```js
gulp.task('default', ['sass', 'watch']);
```

Now, we use `gulp.parallel()` to accomplish the same result. This just means that these two tasks are free to run at the same time, as they are not dependent on one another.

```js
gulp.task('default', gulp.parallel('sass', 'watch'));
```

Now that `gulpfile.js` is up to date and ready for Gulp 4, it’s time to actually do the upgrade. This is straightforward with `npm`. The following commands upgrade the global Gulp installation, by first removing the old version and then installing new.

According to [this note in the Pattern Lab repo](https://github.com/pattern-lab/edition-node-gulp/wiki/Updating-to-Gulp-4), “Gulp 4 uses an updated CLI which needs to be updated globally. This CLI is backwards compatible with any Gulp 3.X projects you may have locally.”

```markup
$ npm rm -g gulp
$ npm install -g gulp-cli
```

Now that Gulp is upgraded globally, each individual project needs to be updated to take advantage of it. Just like the global upgrade, the following commands uninstall the local version and then install the new.

```markup
$ npm uninstall gulp --save-dev
$ npm install gulp@^4.0.0 --save-dev
```

We’re off to the races!

