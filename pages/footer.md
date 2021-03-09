---
layout: documentation
permalink: /footer # the documentation layout requires you to fill the permalink for it to be highlighted in the side navigation
title: "Footer"
description: How to setup the footer
sideNavigation: sideNavigation.guides
---
# Footer

The content of the footer managed in `/_data/footer.yml` for your main language. And in `/_data/LOCALE/footer.yml` for your other languages - replace `LOCALE` with your language code e.g. `da` for danish.

```yml
columns:
  - name: Group headline # This is the headline of the first columns
    description: | # optional description
      You can have markdown here (remmeber to start the line with a pipe "|").
    links: # optional links
    - text: Name of project partner 1
      href: http://example.com
      new_window: true # optional
    - text: Name of project partner 2
      href: http://example.com
      new_window: true
    connectIcons: true # optional - will insert social icons based on what user names you added in _config.yml
  - name: Next group
    description: Only a description on here
```

Since the descriptions are markdown, you can add links, images, icons, [use Bulma classes](/styling) to create the content you want. But for common things like links and social icons there are some shortcuts that you can use.

## Social icons
You can just write these links your self using markdown, but there is some predefined ones that you can insert by adding `connectIcons: true` to a group. The social icons and links will then be inserted based on your `_config.yml`. The pre-configured ones are:

```
email: info@gbif.org
twitter_username: gbif
github_username: gbif
youtube_username: gbif
facebook_username: gbif
```