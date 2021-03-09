---
layout: documentation
permalink: /navigation # the documentation layout requires you to fill the permalink for it to be highlighted in the side navigation
title: "Navigation"
description: How to setup navigation for your users
sideNavigation: sideNavigation.guides
---
# Navigation

The content of top navigation bar is managed in `/_data/navigation.yml` for your main language. And in `/_data/LOCALE/navigation.yml` for your other languages - replace `LOCALE` with your language code e.g. `da` for danish.


```yml
- text: About # First menu item
  href: /about # Where should it link to
- text: Layouts # Second menu item - this time a dropdown
  menu: # Dropdown menu (one level deep only)
  - text: Hero
    href: /your/location
  - text: My group name # when no href is present it will appear as a subtle text - this can be used as a headline.
  - text: --- # will display as a line - can be used to delimit menu items
  - text: Something else
    href: /something/else
- text: History
  href: /history
```


If you need more levels of navigation, then you need to be creative. You can use the documentation layout or you can use the feature blocks as a landing page to direct users to sub sections.

## Caveat
From the [Bulma documentation](https://bulma.io/documentation/components/navbar/)

{: .notification .is-warning }
The navbar brand is always visible: on both touch devices < 1024px and desktop >= 1024px . As a result, it is recommended to only use a few navbar items to avoid overflowing horizontally on small devices.

That means that if a user provides many top level menu items, then they will not be visible in some browser sizes. So you should test that the breakpoint (the point where the menu switches to a mobile layout) is not too late in your case. If so, then you can either:
* Change the breakpoint by setting `$navbar-breakpoint: 1200px;` (example value of 1200 pixels) in `/_sass/_main.scss` before importing the theme styles (`@import "theme/_main";`).
* Rethink your menu structure to have less top level items.




