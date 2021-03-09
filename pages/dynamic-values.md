---
layout: documentation
permalink: /dynamic-values # the documentation layout requires you to fill the permalink for it to be highlighted in the side navigation
title: "Dynamic values"
description: How to add API driven counts to your content
sideNavigation: sideNavigation.guides
---
# Dynamic values
Many of our websites rely on dynamic counts to show the current state of things. As it is such a common usecase the theme supports it with a little javascript snippet that is injected in all pages.

It works by looking for any element that has an attribute `data-ajax-url`. When it finds those, then it calls the endpoint specified in `data-ajax-url`. It is assumed that the response is `JSON`. the default value it looks for is a `count` field. You can also specify which value it should insert by adding a `data-ajax-path`. It will insert your value as text, so it isn't possible to insert HTML using this technique.

## Examples

This markdown
```md
>There is currently <span data-ajax-url="https://api.gbif.org/v1/occurrence/search?limit=0"></span> occurrences published by the GBIF network.
```

Will show as

>There is currently <span data-ajax-url="https://api.gbif.org/v1/occurrence/search?limit=0"></span> occurrences published by the GBIF network.

This markdown
```md
>taxonKey 42 is called <span data-ajax-url="https://api.gbif.org/v1/species/42" data-ajax-path="scientificName"></span>
```

Will show as

>taxonKey 42 is called <span data-ajax-url="https://api.gbif.org/v1/species/42" data-ajax-path="scientificName"></span>