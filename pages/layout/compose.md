---
layout: compose
klass: compositionBlocks
title: Compose your own pages
description: The theme lets you stitch blocks together from the frontmatter. Below is examples of how. See [`pages/compose.md`](https://raw.githubusercontent.com/gbif/jekyll-theme-algae/master/pages/compose.md) for the raw Markdown of this page.
background: /assets/img/Haeckel_Siphoneae.jpg
imageLicense: Kunstformen der Natur (1904) by Ernst Haeckel via [Wikimedia](https://commons.wikimedia.org/wiki/Kunstformen_der_Natur)
hasTextShadow: true
permalink: /layout/compose
composistion:
- type: heroImage
  # data: compose.someFile.someProperty # no data provided, instead page data will be used
- type: pageMarkdown # This will render the markdown in this file
- type: heroVideo
  data: compose.video # yaml file
- type: heroBox
  data: compose.examples.boxExample  # property inside yaml file
- type: postHeader
  data: compose.examples.postExample
- type: features
  data: compose.features
- type: latestPosts
  data: compose.examples.latestPostsExample
- type: markdown
  data: compose.markdownBlock
- type: product
  data: compose.product
- type: split
  data: compose.examples.split1
- type: split
  data: compose.examples.split2
- type: floatingText
  data: compose.examples.text
---

# type: pageMarkdown
You can compose your own pages by using the `compose` layout and defining a custum composistion. E.g.

```yaml
# use the compose layout for more flexibility
layout: compose
# then define your page composistion
composistion:
- type: heroImage 
- type: features
  data: compose.cardExample
- type: floatingText
  data: home.bannerExample2
- type: split
  data: home.splitExample
```

## The available block types are
* heroImage
* heroVideo
* heroBox
* postHeader
* features
* latestPosts
* markdown
* pageMarkdown
* product
* splitBanner
* textBanner

