---
title: Markdown
description: You will be writing your content in Markdown. This page has links and examples to get you started.
background: /assets/img/Haeckel_Neomeris_annulata2.jpg
imageLicense: Kunstformen der Natur (1904) by Ernst Haeckel via [Wikimedia](https://commons.wikimedia.org/wiki/Kunstformen_der_Natur)
permalink: /markdown
layout: documentation
sideNavigation: sideNavigation.guides
---
# Markdown
There are many guides for how to write markdown online. They can vary slightly as markdown comes in many flavours. Most things are the same no matter what guide you find. The site is using the [Kramdown parser](https://kramdown.gettalong.org/quickref.html), but guides like [this one](https://www.markdownguide.org/basic-syntax/) is useful nonetheless.

See [`pages/markdown.md`](https://raw.githubusercontent.com/gbif/jekyll-theme-algae/master/pages/markdown.md) for the raw Markdown of this page. 

# Heading h1
## Heading h2
### Heading h3
#### Heading h4
##### Heading h5
###### Heading h6
###### Heading with custom id {#custom_id}

<!-- The curly bracket colon syntax adds classnames to the paragraph - that can be useful when knowing that classes are available in the theme. The theme is build of Bulma . E.g. https://bulma.io/documentation/elements/notification/ -->

{: .notification .is-primary }
It's generally best to start page/post headings at h2, since the page/post title will likely already be an `<h1>` provided by the layout

## Paragraphs

Set i won't void spirit all. Had after called us It wherein Tree in deep abundantly also midst Seed. Beast. Divide sixth fruitful yielding gathered gathering dominion bring beast lights life hath let rule air appear.

Bring let rule creature. Very open hath to years. In second kind. Divide land night. Earth bearing tree lesser likeness likeness won't. Likeness creature light.


## Line breaks

This is the first line.  
And this is the second line.

## Emphasis

This is **bold text**

This is _italicized text_

This is **_bold italicized text_**

This is ~~strikethrough text~~

## Blockquotes

> Gathering brought him green. Creeping very after hath a, from likeness dry tree moved dry fowl. Our let forth, male dry won't god. Kind a thing, dominion lights midst him gathering waters fruitful greater god have dry land deep abundantly.

## Lists

Unordered list:

- Item 1
- Item 2
- Item 3
  - Subitem 1
  - Subitem 2

Ordered list:

1. Item 1
2. Item 2
3. Item 3
    1. Subitem 1
    2. Subitem 2

Definition list:

term 1
: definition 1.1
: definition 1.2

term 2
: definition 2

## Code

Inline `code`

Indented code:

    # Some comments
    line 1 of code
    line 2 of code
    line 3 of code

Fenced code with syntax highlighting:

```js
const greet = (text) => "Hello " + text;

// Test
console.log(greet("world"));
```

## Horizontal rules

---

## Links

[link with url](http://www.example.com)

[link with title](http://www.example.com "title text")

url: <http://www.example.com>

See the [Jekyll documentation](https://jekyllrb.com/docs/liquid/tags/#link) to create internal links.

## Tables

Header 1 | Header 2
--- | ---
Row 1 col 1 | Row 1 col 2
Row 2 col 1 | Row 2 col 2

Aligned columns:

Right aligned | Center aligned
---: | :---:
Row 1 col 1 | Row 1 col 2
Row 2 col 1 | Row 2 col 2

### Table overflow
Tables have a tendency to grow large and hence overflow on smaller screens.

<div class="overflow-auto" style="white-space: nowrap;" markdown="block">

| Tables        | Are           | Cool  | Tables        | Are           | Cool  | Tables        | Are           | Cool  | Tables        | Are           | Cool  
| ------------- |:-------------:| -----:| ------------- |:-------------:| -----:| ------------- |:-------------:| -----:| ------------- |:-------------:| -----:
| col 3 is      | right-aligned | $1600 | col 3 is      | right-aligned | $1600 | col 3 is      | right-aligned | $1600 | col 3 is      | right-aligned | $1600 
| col 2 is      | centered      |   $12 | col 2 is      | centered      |   $12 | col 2 is      | centered      |   $12 | col 2 is      | centered      |   $12 
| zebra stripes | are neat      |    $1 | zebra stripes | are neat      |    $1 | zebra stripes | are neat      |    $1 | zebra stripes | are neat      |    $1 

</div>

```md
<div class="overflow-auto" style="white-space: nowrap;" markdown="block">

| Tables        | Are           | Cool  | Tables        | Are           | Cool  | Tables        | Are           | Cool  | Tables        | Are           | Cool  
| ------------- |:-------------:| -----:| ------------- |:-------------:| -----:| ------------- |:-------------:| -----:| ------------- |:-------------:| -----:
| col 3 is      | right-aligned | $1600 | col 3 is      | right-aligned | $1600 | col 3 is      | right-aligned | $1600 | col 3 is      | right-aligned | $1600 
| col 2 is      | centered      |   $12 | col 2 is      | centered      |   $12 | col 2 is      | centered      |   $12 | col 2 is      | centered      |   $12 
| zebra stripes | are neat      |    $1 | zebra stripes | are neat      |    $1 | zebra stripes | are neat      |    $1 | zebra stripes | are neat      |    $1 

</div>
```

You might want to add some additional styling to your table, such as `white-space: nowrap;` but that depends on the usecase. See [styling section](/styling) for more on custom styles.

## Footnotes

Here's a sentence with a footnote. [^1]

[^1]: This is the footnote.

## Images

### Figure with caption

![By adding <code>{:standalone}</code> you can make it a figure with a caption](https://via.placeholder.com/1200x800){:standalone}

### Centered

![By adding <code>{:standalone .has-text-centered}</code> you can center it](https://via.placeholder.com/350x400){:standalone .has-text-centered}

### Inline

![alt text](https://via.placeholder.com/200x200){: .inline-left } You can add inline images by appending `{: .inline-left }` or `{: .inline-right }` if you need an inline image in the middle of your paragraph.

Set i won't void spirit all. Had after called us It wherein Tree in deep abundantly also midst Seed. Beast. Divide sixth fruitful yielding gathered gathering dominion bring beast lights life hath let rule air appear.

Set i won't void spirit all. Had after called us It wherein Tree in deep abundantly also midst Seed. Beast. Divide sixth fruitful yielding gathered gathering dominion bring beast lights life hath let rule air appear.

### Clear

{: .is-clearfix }
![alt text](https://via.placeholder.com/200x200){: .inline-left } If you need to clear space after the paragraph, then you can set a clearfix class above the paragraph: `{: .is-clearfix }`. 

Then this paragraph won't slide up and be wrapped aound the picture.

See the [the links section](#links) to learn how to reference your own images and documents.

## Video
<iframe src="https://player.vimeo.com/video/475763745" width="640" height="344" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>

## Styling content

With the Kramdown Markdown parser that Jekyll uses, you can add css classes to your content (see this [blog post](https://digitaldrummerj.me/styling-jekyll-markdown/)). The theme is build using [Bulma](https://bulma.io/) So you can use classes from Bulma to style your content. If that doesn't fit your needs, you can always write html in your Markdown and add your own css on `/_sass/_main.scss`.

## Notification
Using the [Bullma documentation](https://bulma.io/documentation/elements/notification/) we can add a notification

{: .notification .is-primary }
Alert info message. This paragraph is styled by prepending it with `{: .notification .is-primary }`.

{: .notification .is-danger }
Alert info message. This paragraph is styled by prepending it with `{: .notification .is-danger }`.

---
