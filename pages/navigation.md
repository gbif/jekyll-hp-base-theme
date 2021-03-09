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
