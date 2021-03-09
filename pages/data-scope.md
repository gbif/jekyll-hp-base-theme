---
layout: documentation
permalink: /data-scope # the documentation layout requires you to fill the permalink for it to be highlighted in the side navigation
title: data scope
description: How to configure your data scope
sideNavigation: sideNavigation.guides
---
## Data scope

You can configure your data scope in `/_includes/js/config.js`.

Below is an example of a site configured to only show fungi (i.e. taxonKey=5 in the GBIF backbone). Any predicate can be used. The format is defined in the [GBIF developer documentation](https://www.gbif.org/developer/occurrence#predicates). There is a difference though: keys are `camelCase` (as in APIv1 query parameters) instead of `CONSTANT_CASE`.
```
var siteConfig = {
  rootPredicate: { type: 'equals', key: 'taxonKey', value: 5 }
};
```

Your data scope is unlikely to change very often, so we can help configuring it if you need help.
{: .notification .is-info}