
// this funtion is adapted from https://developers.google.com/gtagjs/devguide/snippet#google-analytics
// the only difference is that insert the script on command.
function attachMeasurements() {
  console.log('Terms accepted');

  {% if site.siteMeasurements.GA_ID %}
    console.log('Attach Google analytics');
    var GA_ID = "{{ site.siteMeasurements.GA_ID }}";

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', GA_ID);

    var googleScript = document.createElement("script");
    googleScript.type = "text/javascript";
    googleScript.setAttribute("async", "true");
    googleScript.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=" + GA_ID);
    document.head.appendChild(googleScript);

  {% else %}
    console.log('No Google Analytics ID provided');
  {% endif %}

}
