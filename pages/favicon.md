---
layout: documentation
permalink: /favicon # the documentation layout requires you to fill the permalink for it to be highlighted in the side navigation
title: "Favicon"
description: How to add a favicon to your website
sideNavigation: sideNavigation.guides
---
# Favicon
A favicon is the little icon that appears in the browser in the url bar and on tabs. How it shows varies a bit per browser. It is also used if someone bookmarks your page or add it to the home screen on mobile devices.

In the simplest version you just add a `favicon.ico` to the root of the project. Then it should appear in tabs etc.

These days favicons are rocket science, so if you want to have control over how it appears if someone
* adds the website to the ios home screen on ios7 vs ios8
* high resolution screen or low resolution. 
* etc.

then you can go to e.g. https://realfavicongenerator.net/ or [another generator](https://www.google.com/search?q=favicon+generator) and have them generate a ton of files and some html code that you can insert in your project.
They will ask you to locate all files in the root of your project (it feels like littering, but that is the recommendation).

And then add a html snippet to your head. For our project that means creating a `_includes/favicon.html` file with the html. That will then be inserted in `<head>`. Something like

```html
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="theme-color" content="#ffffff">
```

