---
layout: documentation
permalink: /catalogue-of-life-migration # the documentation layout requires you to fill the permalink for it to be highlighted in the side navigation
title: Moving to Catalogue of Life
description: How to move your data pages from the GBIF Backbone Taxonomy to the Catalogue of Life
sideNavigation: sideNavigation.guides
toc: true
---
# Moving from the GBIF Backbone to Catalogue of Life

GBIF now interprets every occurrence against two taxonomies:

* the **GBIF Backbone Taxonomy** (`d7dddbf4-2cf0-4f39-9b2a-bb099caae36c`), which GBIF has used for years, and which hosted portals still use unless told otherwise.
* the **Catalogue of Life** (COL, `7ddf754f-d193-4cc9-b351-99906754a03b`), the new taxonomy.

This page explains how to switch your site to Catalogue of Life, and what you need to check when you do. The switch itself is one line of configuration. The work is in finding the places where your site refers to a taxon by its Backbone key.

## 1. Use version 3 of the data config

The taxonomy is set in the version 3 configuration format, so your `/_includes/js/config.js` must start with `version: 3`. If it says `version: 2`, or has no version, move it to version 3 first. See [Moving from version 2](/data-exploration-config#moving-from-version-2).

Your site must also use the current data library: `useOldLibrary` must not be set to `true` in your `_config.yml` or in any page's front matter. The old library knows nothing about Catalogue of Life.

Updating the config syntax and changing taxonomy are separate steps. It is easiest to do them one at a time: first move to version 3 and check that your site still works, then change the taxonomy.
{: .notification .is-info}

## 2. Set the taxonomy

Add `defaultChecklistKey` and `availableChecklistKeys` to your config, both set to Catalogue of Life:

```js
var siteConfig = {
  version: 3,
  defaultChecklistKey: '7ddf754f-d193-4cc9-b351-99906754a03b', // Catalogue of Life
  availableChecklistKeys: ['7ddf754f-d193-4cc9-b351-99906754a03b'], // the classification shown on occurrence pages
  // ...the rest of your config
};
```

From now on, names, classifications, taxon filters, charts and your data scope all use Catalogue of Life.

## 3. Update every taxon key

**This is the part that breaks things.** A taxon key only means something within its own taxonomy, and the two taxonomies use different keys:

| taxon | GBIF Backbone | Catalogue of Life |
|-------|---------------|-------------------|
| Fungi | `5` | `F` |
| Aves | `212` | `V2` |

Once you switch, every taxon key on your site is read as a Catalogue of Life key. A link to fungi with `taxonKey=5` will no longer show fungi. It will show nothing, or a different taxon. Nothing warns you about this, so you have to find and update these keys yourself.

### Where to look

* **Your data scope** in `config.js`, e.g. `occurrenceSearch.scope`. If your site is scoped to a taxon, the whole site will be empty until this is fixed.
* **Links in your pages and navigation**, such as `/occurrence/search?taxonKey=5` in markdown, `_data/navigation.yml`, home page cards or buttons.
* **Dashboard blocks** with a `predicate` in the front matter or in `_data`.
* **Other taxon based keys**, not just `taxonKey`: `acceptedTaxonKey`, `kingdomKey`, `phylumKey`, `classKey`, `orderKey`, `familyKey`, `genusKey` and `speciesKey` all change too.
* **Dynamic values** that call the GBIF API directly (`data-ajax-url`). These keep using the Backbone unless you add `checklistKey`, so they will still work but may no longer match the numbers on your data pages. For occurrence counts, add `&checklistKey=7ddf754f-d193-4cc9-b351-99906754a03b` and change the taxon keys. Calls to `/v1/species/<key>` only know the Backbone, so leave those as they are.

A search through your site's files for `taxonKey`, `Key=` and `"key"` will find most of them.

Links to your site from elsewhere, for example in a newsletter or from a partner's website, will also stop working if they include a Backbone taxon key. You can't fix those from your site, so it may be worth telling people who link to you.
{: .notification .is-warning}

### Finding the new key

* Search the name in the [Catalogue of Life](https://www.catalogueoflife.org/data/search).
* Or use the GBIF matching API and take `usage.key` from the response:
  `https://api.gbif.org/v2/species/match?scientificName=Fungi&checklistKey=7ddf754f-d193-4cc9-b351-99906754a03b`

Check that the match is the taxon you meant. A name can mean different things in the two taxonomies.

### Example

A site about fungi, before:

```js
var siteConfig = {
  version: 3,
  occurrenceSearch: {
    scope: { type: 'equals', key: 'taxonKey', value: 5 } // Fungi in the GBIF Backbone
  }
};
```

```md
[See all mushrooms](/occurrence/search?taxonKey=5)
```

And after:

```js
var siteConfig = {
  version: 3,
  defaultChecklistKey: '7ddf754f-d193-4cc9-b351-99906754a03b',
  availableChecklistKeys: ['7ddf754f-d193-4cc9-b351-99906754a03b'],
  occurrenceSearch: {
    scope: { type: 'equals', key: 'taxonKey', value: 'F' } // Fungi in Catalogue of Life
  }
};
```

```md
[See all mushrooms](/occurrence/search?taxonKey=F)
```

## 4. Check your site

* Open your occurrence search and check that the number of records is about what it was before. The two taxonomies don't match records in exactly the same way, so a small difference is expected; a site with no records means the scope still has a Backbone key.
* Follow each link you updated.
* Look at your dashboards.

If something doesn't look right, or you'd like a hand with the move, [ask us](https://github.com/gbif/hosted-portals/issues/new).
