---
layout: documentation
permalink: /translations # the documentation layout requires you to fill the permalink for it to be highlighted in the side navigation
title: "Translations"
description: The file behind this page can be explored at [`pages/layout/documentation.md`](https://github.com/gbif/jekyll-hp-base-theme/blob/master/pages/layout/documentation.md)
sideNavigation: sideNavigation.guides
toc: true
---
This page explains how to configure your site to support multiple translations.

## Configure which languages your site supports
To have a multilingual site you first need to create a file with the languages that you plan to support. The file should be `_data/languages.yml` and contain your variation of
```yml
en: # language code as it will appear in the URL
  label: English # a label is required
  icon:  # the icon is optional – this one does not have one. It could be a flag emoji, e.g. 🇬🇧
da:
  label: Dansk
  languageCode: dan # This code will be used when setting the hreflang and website lang. If not defined the code definde in _config will be used. what code to use? https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#attr-hreflang
```

## Label your pages with their language
You should label all pages with the language they are written in. You can do so by adding `lang: en` to the front matter (for English) – make sure to use the same language code as in `_data/languages.yml`.

You can also set defaults in your `_config.yml`. That will spare you from writing it all manually. You can read about setting [default values in the Jekyll documentation](https://jekyllrb.com/docs/configuration/front-matter-defaults/). Here is an example:

```yml
defaults:
  - scope:
      path: "" # an empty string here means all files in the project
    values:
      layout: "page" # Example: any page will use the layout "page". 
      lang: en # And have the default language english
  - scope:
      path: "la" # but for anything in the `la` folder we want the language to be latin. 
    values:
      lang: la
```

## Add translations of labels
For individual labels that is used by the theme (or by you if you use Liquid) we have a translation file. You can see the latest option in the [theme source](https://github.com/gbif/jekyll-hp-base-theme/blob/master/_data/translations.yml). At time of writing they are:

```yml
relatedPosts: # name of the label
  en: "Related Posts" # text of the label in the various translations your site supports
  da: "Relaterede artikler"
differentLanguage:
  en: "Read this page in a different language"
  da: "Læs denne side på et andet sprog"
tocTitle:
  en: "On this page"
  da: "På denne side"
```

## Link equivalents using `lang-ref`
Your content should link to its translated equivalent. But Jekyll does not know how to link your pages. You need to add a `lang-ref` to the front matter of all pages. The `lang-ref` attribute is an identifier that translated pages share. So a Danish and English "about page" will both add `lang-ref: about` to their front matter (the value isn't important, as long as they are the same). All pages that have the same `lang-ref` will be considered different versions of the same content. E.g.

```yml
# content of English page welcome.md
title: Welcome
lang-ref: welcome # This is the value that link the English and Danish version.
permalink: /welcome

# content of Danish page /da/velkommen.md
title: Velkommen
lang-ref: welcome 
permalink: /velkommen
# Since we added a default lang for anything in the "da" folder we do not need to add it here
# lang: da
```

Note that `lang-ref: welcome` is the same on both pages.  It is only an identifier to link them, so it should not be "translated" on the Danish version.

The pages will now link to their translated versions.

## Splash page or default language
What does your home page look like? Does it have content in a default language (say English) or is it a language selector? Most websites use the default language approach, but the theme supports both versions.

### Splash page
* `https://example.org` is a language selector that force the user to choose Danish or English.
* redirects to `https://example.org/da` or `https://example.org/en`.

To do so you need to change your home page to a different layout – namely `layout: languageSplash`.

[Example](/language-splash){: .button .is-primary } [Source](https://github.com/gbif/jekyll-hp-base-theme/blob/master/pages/language.md){: .button }

> If you do not like the default layout, then you can overwrite it with your own HTML/CSS by adding `_layouts/languageSplash.html`.

### Default language
* `https://example.org` is showing the English website.
* The user can change language and is sent to `https://example.org/da`

In this version your website has a default language – you should define it in `_config.yml` under the theme configuration.

```yml
algae:
  rootLang: en # if you have a multilingual site with a default language, then you should add define the default language here. The value should be the same that you use for the `lang` attribute on your pages and in your `_data/languages.yml`.
```

## Where is the post archive
In `_config.yml` there is a field called `archive_permalink` that is used to specify where your list of post items are located. We use that for linking when someone clicks a category tag on a post.

```yml
# in _config.yml you can set the default which will be used if nothing else is specified
algae:
  archive_permalink: /posts/  
```

But those can vary per language. So if you are running a multilingual site, then you need to provide it per language. You do so in the `_data/languages.yml` file.

```yml
# english will using the default from `/_config.yml` so we do not need to set it.
en:
  label: English
la:
  label: Latin
  archive_permalink: /la/postus-latinicus/
```

## Default link to translated posts
As with all files you can configure what url they should have using the [`permalink`](https://jekyllrb.com/docs/permalinks/). But it can be useful to configure it for entire folders. For posts you can do like this:

```yml
defaults: 
  - # first a default for the entire _posts folder
    scope:
      path: ""
      type: "posts"
    values:
      permalink: "/post/:year/:slug/"   # Use /post/yyyy/{filename}/ as permalink for all posts
      layout: "post"
  - # then an overwrite for the folder with latin news posts
    scope:
      path: "_posts/la" # the default applies to this folder
      type: "posts" # and only for items of type post
    values:
      permalink: "la/postus-latinicus/:year/:slug/"   # Use /la/postus-latinicus/yyyy/{filename}/ as permalink for all posts in the _posts/la folder
      layout: "post" # and it should always use the post layout unless something else is specified.
```

## How to translate content
Content on the hosted portals can be slit in 2 parts:

### The data exploration widgets

We use [Crowdin](https://crowdin.com/) for translations. The specific project is [https://crowdin.com/project/gbif-portal](https://crowdin.com/project/gbif-portal)

That project handles both translations for [GBIF.org](https://www.gbif.org/) as well as the hosted portals. If you are only intersted in translating the hosted portal UI, then you should focus on the folder `gbif-web`.

You need to join the project as a translator first via the Crowdin platform. The secretariat will then recieve a mail and we will send you an invite.

{: .notification .is-primary}
It is worth highlighting, that since the interface is still undergoing development, some translations are bound to be discarded later on (if we change the UI to not include it). And more content to translate will appear continously.

[Create an issue](https://github.com/gbif/hosted-portals/issues/new) if you need to add another language to Crowdin or you aren't sure how to get the data widgets translated.

### Everything else
All the content that lives in your project: the menus + the prose pages. How you translate the content is up to you. Just using Github is perfectly okay. If you want to be fancy, then there are tools so help. Such as [Crowdin](https://crowdin.com/) which is what we use for GBIF.org.