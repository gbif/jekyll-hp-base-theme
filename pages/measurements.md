---
layout: documentation
permalink: /measurements # the documentation layout requires you to fill the permalink for it to be highlighted in the side navigation
title: Measurements (e.g. Google Analytics)
description: How to add Google Analytics
sideNavigation: sideNavigation.guides
toc: true
---
# Measurements (e.g. Google Analytics)

> If you are comfortable using Jekyll, then you can simple add it as you see fit. Remember to get the website users consent.

To make it easier we have added a simple way to add Google Analytics. You can configure this to use another analytics provider if you wish to. Start by adding below to your `_config.yml` file.

## Create a Google Analytics ID
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
You need to provide a page with your privacy policy. We have prepared one you can use that will cover if all you do is using Google Analytics. See [https://github.com/gbif/hosted-portals/issues/16](https://github.com/gbif/hosted-portals/issues/16)

## Overwrite the default tracking scripts
When the user accept the terms then a function is called that attach the measurement scripts.
This function is called when the user clicks `accept` and on subsequent pages if the cookie (or rather localStorage variable has been set. The users consent/rejection is stored in local storage as `GBIF_terms`).

If they accept then the function "attachMeasurements" will be called. You can overwrite this function by adding a file `/_includes/js/measure.js` and replace the function.
