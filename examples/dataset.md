---
layout: compose
klass: dataset
permalink: /example/dataset
composition:
- type: pageMarkdown
---

<div class="notification is-info">
  <p>
  This is an example of how one can add custom pages that load data from anywhere. In this case a dataset from the <a href="https://www.gbif.org/developer/summary">GBIF API</a>. We will be happy to help with using the APIs, but what frameworks, design etc is really up to your developers and beyond the scope of the hosted portals.
  </p>
  <p>
  Doing this requires development capacity. Also in terms of maintanence. You should consider carefully and if you decide to progress, then you probably want to build your own instead of doing it within the hosted portals.
  </p>
  <p>
  <a class="button" href="https://github.com/gbif/jekyll-hp-base-theme/blob/master/examples/dataset.md">See source</a>
  </p>
</div>


<article id="my-custom-dataset"></article>

{% comment %}
This is just a crude example of what it means to write your own dataset page. This example is not meant to be used as is. It is just to show how you can insert whatever your heart desires.
{% endcomment %}

<script>
const datasetTemplate = dataset => `
  <h1>
    ${dataset.title}
  </h1>
  <div>
    ${dataset.endpoints.map(x => `<a href="${x.url}" class="button">${x.type}</a>`)}
  </div>
  <div>
    ${dataset.description}
  </div>
`;
</script>

<script src="/examples/custom-dataset-example.js">

