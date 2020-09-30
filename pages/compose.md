---
layout: home
klass: home
title: Compose your own pages
description: The theme lets you stitch blocks together from the frontmatter. Below is examples of how. See [`pages/compose.md`](https://raw.githubusercontent.com/gbif/jekyll-theme-algae/master/pages/compose.md) for the raw Markdown of this page.
background: /assets/img/Haeckel_Siphoneae.jpg
imageLicense: Kunstformen der Natur (1904) by Ernst Haeckel via [Wikimedia](https://commons.wikimedia.org/wiki/Kunstformen_der_Natur)
hasTextShadow: true
permalink: /compose-your-own-pages
structure:
  - type: floating-hero
  - type: markdown
  - data: compose.features
    type: features
  - data: compose.product
    type: product
---

You can compose your own pages by using the `compose` layout and defining a custum structure. E.g.

```
# use the compose layout for more flexibility
layout: compose
# then define your page structure
structure:
- type: floating-hero 
- data: compose.cardExample
  type: features
- data: home.bannerExample2
  type: textBanner
- data: home.splitExample
  type: splitBanner
```

## The avaiable block types are
* floating-hero
* box-hero
* post-header
* features
* latestPosts
* markdown
* product
* splitBanner
* textBanner

