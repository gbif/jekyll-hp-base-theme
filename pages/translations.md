---
layout: documentation
permalink: /translations # the documentation layout requires you to fill the permalink for it to be highlighted in the side navigation
title: "Translations"
description: The file behind this page can be explored at [`pages/layout/documentation.md`](https://github.com/gbif/jekyll-hp-base-theme/blob/master/pages/layout/documentation.md)
sideNavigation: sideNavigation.guides
toc: true
---
# Translations
This page explains how to configure your site to support multiple translations.

## How to translate content
Content on the hosted portals can be slit in 2 parts:

**The data exploration widgets**
The data widgets will use [Crowdin](https://crowdin.com/) for translations. The issue to implement this is [hosted-portals/issues/60](https://github.com/gbif/hosted-portals/issues/60). If you need the data exploration components translated, then you should watch/join that project and help translate it.

**Everything else**
All the content that lives in your project: the menus + the prose pages. How you translate the content is up to you. Just using Github is perfectly okay. If you want to be fancy, then there are tools so help. Such as [Crowdin](https://crowdin.com/) which is what we use for GBIF.org.


## Configure what languages your site support
To have a multilingual site you first need to create a file with the languages that you plan to support. The file should be `_data/languages.yml` and contain your variation of
```yml
en: # lanugage code as it will appear in the url
  label: English # a label is required
  icon:  # the icon is optional - this one does not have one. Could be a flag emoji
da:
  label: Dansk
```

## Label you pages with what language they are
You should label all pages with what language they are written in. You can do so by adding `lang: en` to the front matter (for english) - make sure to use the same language code as in `_data/languages.yml`.

You can also set defaults in your `_config.yml`. That will spare you writing it all manually. You can read about setting [default values in the Jekyll documentation](https://jekyllrb.com/docs/configuration/front-matter-defaults/). Here is an example:

```yml
defaults:
  -
    scope:
      path: ""
    values:
      lang: en
  -
    scope:
      path: "da"
    values:
      lang: da
```

## Link equivallents using `lang-ref`
Your content should link to their translated equivallents. But Jekyll do not know how to link your pages. So you need to add a `lang-ref` to the front matter of all pages. The `lang-ref` attribute is an identifier that translated pages share. So a Danish and English "about page" will both add `lang-ref: about` to their front matter (the value isn't important, as long as they are the same). So all pages that have the same `lang-ref` will be considered different versions of the same content. E.g.

```yml
# content of english page welcome.md
title: Welcome
lang-ref: welcome # this is the value that link the english and danish version.
permalink: /welcome

# content of danish page /da/velkommen.md
title: Velkommen
lang-ref: welcome
permalink: /velkommen
# Since we added a default lang for anything in the "da" folder we do not need to add it here
# lang: da
```

The pages can no link to their translated versions


## Splash page or default language
What does your home page look like? Does it have content in a default language (say english) or is it a language selector. Most websites use the default language approach, but the theme supports both versions.

### Splash page
* `https://your-website.org` is a language selector that force the user to choose Danish or English.
* redirects to `https://your-website.org/da` or `https://your-website.org/en`.

To do so you need to change your home page to a different layout - namely `layout: languageSplash`.

[Example](/language-splash){: .button .is-primary } [Source](https://github.com/gbif/jekyll-hp-base-theme/blob/master/pages/language.md){: .button }

> If you do not like the default layout, then you can overwrite it with your own html/css by adding `_layouts/languageSplash.html`.

### Default language
* `https://your-website.org` is showing the english website.
* The user can change language and url to `https://your-website.org/da`

In this version your website has a default language - you should define it in `_config.yml` under the theme configuration.

```yml
algae:
  rootLang: en # if you have a multilingual site with a default language, then you should add define the default language here. The value should be the same that you use for the `lang` attribute on your pages and in your `_data/languages.yml`.
```


