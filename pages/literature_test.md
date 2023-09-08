---
layout: gbifData
description: Default template for occurrence search
permalink: /literature-test
---

<div class="notification is-info" style="margin-bottom: 0;">Browse literature writen by north american researchers using GBIF mediated data.</div>

<div id="root"></div>

<script>
  var userTheme = typeof siteTheme !== 'undefined' ? siteTheme : undefined;
  var userConfig = {};
  
  ReactDOM.render(
    React.createElement(
      gbifReactComponents.App,
      { 
        config: {rootFilter: {countriesOfResearcher: ["US", "CA", "MX", "UM", "PR", "VI", "AS", "GU", "MP"]}}, 
        style: { height: '600px' }
      }
    ),
    document.getElementById('root')
  );

  if (typeof userTheme === 'undefined') {
    console.warn('No theme defined - using default styling');
  }
  if (typeof userConfig === 'undefined') {
    console.warn('No config provided - all data will be shown');
  }
</script>