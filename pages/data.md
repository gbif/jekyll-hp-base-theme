---
title: Data
description: We publish open data
permalink: /data/
layout: headerOnly
---

<div class="container" id="root"></div>
<!--react and gbif component-->
<script src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mapbox-gl/1.12.0/mapbox-gl.min.css" integrity="sha512-KxWh2zhfqjqLf8V6nej7w8PbXiZuqrQq+PA1EE+73+7dpYbMocKIXKPlq50ZaWPDY5iQcyaX3I4xLUuOWBCCug==" crossorigin="anonymous" />

<!-- <script type="text/javascript" src="/gbif-react-components.js"></script> -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/gbif/gbif-web@8f7a6372723b245099b501d2f44ffc148eb29132/packages/react-components/dist/gbif-react-components.js"></script>

<script>

  var myTheme = gbifReactComponents.themeBuilder.extend({baseTheme: 'light', extendWith: {
    fontSize: '14px',
    primary: '#3273dc',
    drawerZIndex: 1050,
    fontFamily: '"Roboto", sans-serif'
  }});

  var myConfig = {
      // rootPredicate: { type: 'equals', key: 'taxonKey', value: 5 }
      rootPredicate: {
      "type": "and",
      "predicates": [
        {
          "type": "equals",
          "key": "taxonKey",
          "value": 5386
        },
        {
          "type": "range",
          "key": "decimalLatitude",
          "value": {
            "gte": "-90",
            "lte": "0"
          }
        }
      ]
    }
  };

  ReactDOM.render(
    React.createElement(
      gbifReactComponents.OccurrenceSearch,
      { style: { height: 'calc(100vh - 4.25rem)' }, theme: myTheme, config: myConfig },
      'My Button'
    ),
    document.getElementById('root')
  );
</script>
