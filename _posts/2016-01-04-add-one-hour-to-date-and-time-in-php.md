---
title: Add 1 hour to date & time in PHP
date: 2016-01-04 18:00:00 Z
tags:
- PHP
---

```php
strtotime($time . '+ 1 hour');
```

This is probably the most magical thing I’ve ever done PHP. Pass in the date and time (in this case, in a variable), tell it what you want to do with it, and out comes the updated date and time. I needed to add an hour to the time I was working with. Seems simple until you think about transition to the next day. This function takes care of advancing the date to the next day if necessary.
