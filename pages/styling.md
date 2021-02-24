---
title: Styling
description: How to customize the look and feel
background: /assets/img/Haeckel_Neomeris_annulata2.jpg
imageLicense: Kunstformen der Natur (1904) by Ernst Haeckel via [Wikimedia](https://commons.wikimedia.org/wiki/Kunstformen_der_Natur)
permalink: /styling
layout: post
toc: true
---

You can add custom styles and overwrites as much as you desire. On this page you can see how. 

{: .notification .is-warning}
**But** if you add a lot of customization, the GBIF secretariat wont be able to support you and theme updates will worst case break your site. If you are not sure wether you are crossing that line, then feel free to ask.


## _config.yml
You can change a few basic settings such as logo, primary color and squareness in `_config.yml`.

{: .tag .is-success}
Safe

## Consistency
Having a consistent style of images/graphics goes a long way.

There are multiple layouts available and they can each be configured. Your site probably looks more coherent if you stick with a few.

{: .tag .is-success}
Safe

## Use Bulma classes
With the Kramdown Markdown parser that Jekyll uses, you can add css classes to your content (see this [blog post](https://digitaldrummerj.me/styling-jekyll-markdown/)). The theme is build using [Bulma](https://bulma.io/) So you can use classes from Bulma to style your content.

Using the [Bullma documentation](https://bulma.io/documentation/elements/box/) and [kramdown block attributes](https://kramdown.gettalong.org/quickref.html#block-attributes) we can style below paragraph

{: .box }
This paragraph is styled by prepending it with `{: .box }`.

{: .tag .is-success}
Should be safe

## Additional variables
The style is based on the [Bulma css library](https://bulma.io/documentation/). You can change all Bulma variables by overwriting them in `_sass/_main.scss`. 

```
// set custom variables here
$primary: turquoise;

// import the theme style
@import "theme/_main";

// You can add additional styling here
```

What variables are avilable is best seen in the [Bulma docs](https://bulma.io/documentation/customize/variables/) or alternatively in the [theme repo](https://github.com/gbif/jekyll-hp-base-theme/tree/master/_sass/bulma/sass) - the variables are a bit scattered throughout the Bulma files, so you might have to explore a bit.

{: .notification }
Should largely be safe to do, but better test it thoroughly on various device sizes (mobile, tablet etc.) 

{: .tag .is-warning}
Most likely unproblematic

## Add custom css
If you know how to write css then you can add any additional css in `_sass/_main.scss`.

If you need to target a specific page with a style, then you can add `klass: "my-special-page"` to the frontmatter of that page. You can now style that page by using the `.my-special-page` selector.

{: .notification }
No guarentees as you can overwrite existing css inadvertently or make changes that conflict with theme updates. Be cautious.

{: .tag .is-warning}
Problematic if you overwrite existing styles dramatically

## Add custom layouts and components
Since it is a jekyll site you can always write your own layouts and includes. For that you should read the [Jekyll documentation](https://jekyllrb.com/docs/layouts/). If you add something that you think more people would benefit from, then please raise it and we can add it to the theme.

{: .notification}
There could be an issue if the theme and your code use the same names, but that would be easy to fix.

{: .tag .is-warning}
Most likely unproblematic

## Overwrite theme layouts and components
This is [perfectly possible](https://jekyllrb.com/docs/themes/), but the most fragile approach. Once you find that you need this, then you might be better of [ejecting](https://jekyllrb.com/docs/themes/#converting-gem-based-themes-to-regular-themes)

{: .tag .is-danger}
This is not ideal - let us talk before you do so

