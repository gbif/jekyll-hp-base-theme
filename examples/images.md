---
layout: compose
klass: compositionBlocks
title: Images
description: This page shows how images can be used and how they are displayed
background: https://via.placeholder.com/1600x1200
hasTextShadow: true
composition:
- type: heroImage
- type: pageMarkdown # This will render the markdown in this file
- type: heroBox
  data: compose.images.page
- type: postHeader
  data: compose.images.post
- type: postHeader
  data: compose.images.postRatio
- type: heroImage
  data: compose.images.hero
- type: markdown
  data: compose.images.markdown
- type: features
  data: compose.images.features
- type: product
  data: compose.images.product
- type: split
  data: compose.images.split
---

## Markdown

In markdown you have more control over the image ratio and size. But even then it will be scaled to fit into the container (meaning an image that is 8000px wide will be scaled to fit the screen)

### Figure with caption

![By adding <code>{:standalone}</code> you can make it a figure with a caption](https://via.placeholder.com/1200x800){:standalone}

### Centered

![By adding <code>{:standalone .has-text-centered}</code> you can center it](https://via.placeholder.com/350x400){:standalone .has-text-centered}

### Inline

![alt text](https://via.placeholder.com/200x200){: .inline-left } You can add inline images by appending `{: .inline-left }` or `{: .inline-right }` if you need an inline image in the middle of your paragraph.

Set i won't void spirit all. Had after called us It wherein Tree in deep abundantly also midst Seed. Beast. Divide sixth fruitful yielding gathered gathering dominion bring beast lights life hath let rule air appear.

Set i won't void spirit all. Had after called us It wherein Tree in deep abundantly also midst Seed. Beast. Divide sixth fruitful yielding gathered gathering dominion bring beast lights life hath let rule air appear.

## Header types
Below is a list of layout headers and blocks. All of them but `layout: post` crop the images to fit the container.