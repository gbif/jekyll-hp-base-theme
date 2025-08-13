---
layout: documentation
permalink: /page-not-found # the documentation layout requires you to fill the permalink for it to be highlighted in the side navigation
title: Page not found
description: You should create a page for 404 pages
sideNavigation: sideNavigation.guides
---
# Page not found
When the user arrives at a page that does not exist (could be a wrong url) - then they need to see an error page telling them there isn't anything to see here. To do you you need to add a 404.md to your project in root: `/404.md`. It is the same version that gets translated to all languages, so if you need it in multiple languages, then you need to put it in one page. Below is an example of such a page.

```yml
---
layout: pageNotFound
preTitle: Error 404
title: Page not found
description: We cannot find the page you are looking for
cta:
- text: Home
  isPrimary: true
  href: /
---
```