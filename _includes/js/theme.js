// control the navbar
// https://bulma.io/documentation/components/navbar/
document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  // Copied verbatim, but why check when it is a foreach loop. Does some browsers return null instead of empty array?
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach($el => {
      $el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = $el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
        let isActive = $el.classList.contains('is-active');
        $el.setAttribute('aria-expanded', isActive)
      });
    });

  }

});


// add ajax count

// util for getting deep values in json objects by passing a string
// https://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-and-arays-by-string-path
function resolve(path, obj = self, separator = '.') {
  var properties = Array.isArray(path) ? path : path.split(separator)
  return properties.reduce((prev, curr) => prev && prev[curr], obj)
}

document.addEventListener('DOMContentLoaded', () => {
  // Get all "count" elements
  const $counts = document.querySelectorAll('[data-ajax-url]');

  // for each element, do the async lookup
  $counts.forEach($el => {
    // get url 
    var url = $el.attributes['data-ajax-url'].value.trim();
    var pathAttribute = $el.attributes['data-ajax-path'];

    var path = 'count';
    if (pathAttribute) {
      var path = pathAttribute.value.trim();
    }
    $el.classList.add('ajax-is-loading');

    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonResponse) {
        var value = resolve(path, jsonResponse)
        if (typeof value !== 'undefined') {
          var text = value;
          if (typeof value === 'number') {
            text = value.toLocaleString(currentLocale);
          }
          const newContent = document.createTextNode(text);
          // $el.innerHTML = '';
          // $el.appendChild(newContent);
          $el.textContent = text;
          $el.classList.remove('ajax-is-loading');
          $el.classList.add('ajax-is-loaded');
        }
      })
      .catch(function (err) {
        $el.classList.remove('ajax-is-loading');
        $el.classList.add('ajax-loading-failed');
      });
  });

});



{% if jekyll.environment != "production" and site.algae.hideHelper != true %}
  {% include js/themeFeedback.js %}
{% endif %}
