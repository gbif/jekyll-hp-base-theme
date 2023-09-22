---
layout: home
klass: home
title: Simple websites for biodiversity
description: A Jekyll theme with built-in support for displaying subsets of data mediated through GBIF.org
background: "{{ site.data.images.myImage.src }}" # normally you cannot use the Liquid templating language in front matter, but because we have added a plugin we now can. But it depends on the place that inserts it to render it properly. e.g. "title | liquify"
imageLicense: "{{ site.data.images.myImage.caption }}"
lang-ref: home
hasTextShadow: true
cta:
  - text: Explore
    href: /occurrence/search
    isPrimary: true
  - text: About
    href: /about
permalink: /
composition:
  - type: heroImage
  - data: home.stats
    type: stats
  - data: home.splitExample
    type: split
  - data: home.cardExample
    type: features
  # - data: home.eventsExample
  #   type: stories
  - data: home.storiesCountriesOfCoverageUS
    type: stories
  - data: home.storiesCountriesOfResearcherUS
    type: stories
  - data: home.bannerExample2
    type: floatingText
---

<iframe src="https://player.vimeo.com/video/473377963" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
<p><a href="https://vimeo.com/473377963">Share biodiversity data through GBIF - an invitation to the private sector</a> from <a href="https://vimeo.com/gbif">GBIF</a> on <a href="https://vimeo.com">Vimeo</a>.</p>