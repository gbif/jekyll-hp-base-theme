---
layout: documentation
permalink: /video # the documentation layout requires you to fill the permalink for it to be highlighted in the side navigation
title: Video
description: How to make your videos full width
sideNavigation: sideNavigation.guides
---
# Video
There is no special way to handle videos, but Vimeo and YouTube videos in iframes look nicer if you wrap then in a `video-container` class. Those videos have a fixed ratio and so we can make them responsive and full width (of the container - below that means full text width) with a little css.

```
<div class="video-container"><iframe src="https://player.vimeo.com/video/473377963" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>
```

<div class="video-container"><iframe src="https://player.vimeo.com/video/473377963" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>