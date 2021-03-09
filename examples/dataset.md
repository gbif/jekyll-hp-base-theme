---
layout: compose
klass: dataset
permalink: /example/dataset
composition:
- type: pageMarkdown
---

<details class="notification is-info">
  <summary>
    What is this?
  </summary>
  <p>
    This is an example of how one can add custom pages that load data from anywhere. In this case a dataset from the <a href="https://www.gbif.org/developer/summary">GBIF API</a>. We will be happy to help with using the APIs.
  </p>
  <p>
    This example is a response to <a href="https://github.com/gbif/hosted-portals/issues/31">/gbif/hosted-portals/issues/31</a>.
  </p>
  <p>
    <a class="button" href="https://github.com/gbif/jekyll-hp-base-theme/blob/master/examples/dataset.md">See source</a>
  </p>
</details>


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

