---
title: Debugging
description: How to find bugs when building your website
background: /assets/img/Haeckel_Neomeris_annulata2.jpg
imageLicense: Kunstformen der Natur (1904) by Ernst Haeckel via [Wikimedia](https://commons.wikimedia.org/wiki/Kunstformen_der_Natur)
permalink: /debugging
layout: documentation
sideNavigation: sideNavigation.guides
---
# Debugging

> Debuggin the process of identifying and removing errors from computer hardware or software.

Every now and then you will make a change and it won't show on the website. Or worse the site might even be broken. Then you need to debug the issue. For the most part it will probably be a mistake in your YAML. Remember that YAML cares about spaces in the beginning of lines. There exists [online YAML validators](https://jsonformatter.org/yaml-validator). It might be worth pasting your text into one of those.

## Look at the latest changes
If you look at the commit history of your project (e.g. `https://github.com/gbif/hp-legume/commits/master`), you can see what have changed and also what commit broke the build. Commits (changes) that build successfully will have a little green tick, and failed builds will have a red cross.  You can then select the commit that caused the failure and see what was changed.

![Commit history](../assets/img/commithistory.png "Commit history")

## Check the build server
You can also see if your project deployed properly by going to the build server and [locate your project](https://builds.gbif.org/view/Hosted%20Portals/) and select it. Once you have done that the sidebar will show you the build history. A red dot next to the latest build indicates that it failed.

![First find you project, then locate the broken build](../assets/img/debug_1.png){:standalone}

![Check the logs and try to find some, hopefully, informative error. In this case it was a missing closing quote in the yaml frontmatter.](../assets/img/debug_2.png){:standalone}


## The project builds fine, but the site is not as I expected
These errors are more tricky to find, but again it can be a good idea to look at your latest changes in the commit history. So far we have seen these issues:
* Invalid file name. If you are expecting a webpage, then your file should probably end with with `.md`.
* You forgot the [front matter](https://jekyllrb.com/docs/front-matter/) - the area between `---`
* You forgot that indentation matters in YAML - you forgot to indent completely, or used tabs to do so.
* You forgot to quote a value with characters that confused YAML. E.g. a colon. See also this [Stack overflow question](https://stackoverflow.com/questions/19109912/yaml-do-i-need-quotes-for-strings-in-yaml)

## Ask for help
If you cannot figure out what is the cause of the error, then ask. The [mailing list](https://lists.gbif.org/mailman/listinfo/hosted-portals) is a good place to do so.
