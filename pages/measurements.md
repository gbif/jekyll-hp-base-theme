---
layout: documentation
permalink: /measurements # the documentation layout requires you to fill the permalink for it to be highlighted in the side navigation
title: Measurements (e.g. Plausible)
description: How to add site measurements
sideNavigation: sideNavigation.guides
toc: true
---
# Measurements

If you are comfortable using Jekyll, then you can simple add it as you see fit. Remember to get the website users consent if needed.

Adding tracking is for the most part quite simple, especially if your tracking does not require consent.

## Plausible.io
You need a [plausible.io](https://plausible.io/) account and register your domain
Once that is done, all you need to do (as of June 2023) is to add a script to your head tag.

That can be done by creating a file (if it doesn't exist already) `_includes/head.html`. with the content

```
{% raw %}{% if site.plausible.enabled %}
  <script defer data-domain="{{ site.plausible.dataDomain }}" src="https://plausible.io/js/script.js"></script>
{% endif %}{% endraw %}
```

See more option in the [plausible documentation](https://plausible.io/docs/plausible-script)

And in your configuration files `_config.yml` and `_config_staging.yml`, `_config_uat.yml` you add 
```yaml
plausible:
  enabled: false # in _config.yml it should be true, in other domains you probably do not want tracking
  dataDomain: "your-domain.org"
```

It will now check your config per environment. If you have plausible enabled, it will insert the `<script defer ...` part into the `<head>`-tag of all pages so that plausible can meassure visitors.

## Create a Google Analytics ID

> We no longer recommend using Google Analytics as it is now illegal in Europe unless you modify GA in various ways to make it compliant. There are other more privacy respecting alternatives.

You need to go to [https://analytics.google.com/](https://analytics.google.com/) and create an analytics property.

## Add configuration
Add following to your `/_config.yml` file.

```yml
# The text for the terms can be changed by adding translations for 'terms', 'acceptTerms' and 'rejectTerms' in `/_data/translations.yml`.
siteMeasurements:
  enable: true # When enabled there will be a popup asking the user for their consent. If they accept then the function "attachMeasurements" will be called. You can overwrite this function by adding a file `/_includes/js/measure.js` and replace the function.
  GA_ID: "G-XXXXXXXXXX" # Your Google analytics ID. Sometimes they start with UA-XXXXX-X other times with G-XXXXXXXX depending on how you set it up
  termsVersion: "2021-07-06" # A version number for your terms. If you change this, then the users will see the popup again asking them to confirm/reject anew.
```

## Add popup text
Secondly you need to provide the text for the popup. You do so in `/_data/translations.yml`. E.g.

```yml
terms:
  en: |
    We use cookies on our website. Some are technically necessary, others help us improve your user experience. You can decline non-essential cookies by selecting “Reject”. Please see our [Privacy Policy](/privacy-policy) for further information about our privacy practices and use of cookies.
  da: |
    Vi bruger cookies. Læs mere [her](/da/privacy-policy)
acceptTerms:
  en: 'Accept'
  da: 'Jeg accepterer'
rejectTerms:
  en: 'Reject'
  da: 'Nej tak'
```

## Add a page with your privacy policy
You need to provide a page with your privacy policy. We have prepared one you can use that should suffice if all you do is using Google Analytics. See [Privacy Policy template](/privacy-policy-template) for more details on usage and conditions.

## Overwrite the default tracking scripts
When the user accept the terms then a function is called that attach the measurement scripts.
This function is called when the user clicks `accept` and on subsequent pages if the cookie (or rather localStorage variable has been set. The users consent/rejection is stored in local storage as `GBIF_terms`).

If they accept then the function "attachMeasurements" will be called. You can overwrite this function by adding a file `/_includes/js/measure.js` and replace the function.
