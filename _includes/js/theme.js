// control the navbar
// https://bulma.io/documentation/components/navbar/
document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.menu-toggle'), 0);

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





// control the sidebar pagenav
document.addEventListener('DOMContentLoaded', () => {
  // Get the page navigation
  const $pageNavLists = Array.prototype.slice.call(document.querySelectorAll('#pageNavbar .navbar-link'), 0);

  if ($pageNavLists.length > 0) {
    // Add a click event on each of them
    $pageNavLists.forEach($el => {
      $el.addEventListener('click', () => {
        // The target is the next element
        const $target = $el.nextElementSibling;
        // const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-expanded');
        $target.classList.toggle('is-expanded');
        let isActive = $el.classList.contains('is-expanded');
        $el.setAttribute('aria-expanded', isActive)
      });
    });
  }

  // expand active node
  const $activeLink = document.querySelector('#pageNavbar .active');
  expandNavNode($activeLink);
});

function expandNavNode(node) {
  if (node) {
    const $ul = node.parentNode.parentNode;
    const $navbarLink = $ul.previousElementSibling;
    if ($navbarLink.classList.contains('navbar-link')) {
      $navbarLink.classList.add('is-expanded');
      $ul.classList.add('is-expanded');
      $navbarLink.setAttribute('aria-expanded', true)
      $ul.setAttribute('aria-expanded', true)
      expandNavNode($navbarLink);
    }
  }
}





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
          // const newContent = document.createTextNode(text);
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

















function highlightRightNav(heading) {
  tocItems.forEach(function (x) {
    x.classList.remove('active');
  });

  if (heading) {
    var activeTocItem = document.querySelector(".toc a[href='#" + heading + "']");
    if (activeTocItem) {
      activeTocItem.classList.add("active");
    }
  }
}

let headlines = [];
let currentHeading = '';
let tocMaxDepth = 6;
const tocItems = Array.from(document.querySelectorAll('.toc a'));
if (tocItems.length > 0) {
  tocMaxDepth = document.gbifTocMaxDepth || tocMaxDepth;
  var headlineSelector = '';
  for (var i = 1; i <= tocMaxDepth; i++ ) {
    headlineSelector += '.article h' + i + '[id]';
    if (i < tocMaxDepth) headlineSelector += ',';
  }

  headlines = Array.from(document.querySelectorAll(headlineSelector));
  currentHeading = '';
}


function highligtToc() {
  if (tocItems.length <= 0) return;
  var headingPositions = [];
  headlines.forEach(function (x) {
    headingPositions[x.id] = x.getBoundingClientRect().top;
  });
  headingPositions.sort();
  // the headings have all been grabbed and sorted in order of their scroll
  // position (from the top of the page). First one is toppermost.
  for (var key in headingPositions) {
    if (!headingPositions.hasOwnProperty(key)) {
      continue;
    }
    if (headingPositions[key] > 0 && headingPositions[key] < 300) {
      if (currentHeading !== key) {
        // a new heading has scrolled to within 200px of the top of the page.
        // highlight the right-nav entry and de-highlight the others.
        highlightRightNav(key);
        currentHeading = key;
      }
      break;
    }
  }
}

// Scroll the given menu item into view. We actually pick the item *above*
// the current item to give some headroom above
function scrollToNavItem(selector) {
  let container = document.querySelector(selector);
  if (!container) return;
  let item = container.querySelector('.active');
  if (item) {
    item = item.closest('li')
  }
  if (item) {
    document.querySelector(selector).scrollTop = item.offsetTop - 100;
  }
}

var hasScrolled;
highligtToc();
document.addEventListener('scroll', function() {
  highligtToc();
  if (!hasScrolled) {
    hasScrolled = true;
    scrollToNavItem('.toc');
    scrollToNavItem('#pageNavbar');
  }
});

function resetPrivacySettings() {
  localStorage.removeItem('GBIF_terms');
  location.reload()
}




// make it easier to add a link to explore the area around the user
document.addEventListener("DOMContentLoaded", function () {
  // Function to fetch user's location and handle the click event
  function fetchLocationAndRedirect(event) {
    event.preventDefault(); // Prevent the default link behavior

    const link = event.target;

    // Check if Geolocation is supported by the browser
    if ("geolocation" in navigator) {
      link.classList.add("is-loading"); // Add loading class to the link
      navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Store the user's location in session storage
        sessionStorage.setItem("mapLat", latitude);
        sessionStorage.setItem("mapLng", longitude);
        sessionStorage.setItem("mapZoom", 12);
        // generate bounding box in WKT from the user's location
        let latitudeBuffer = 0.1;
        if (latitude > 30) latitudeBuffer = 0.08;
        if (latitude > 50) latitudeBuffer = 0.06;
        if (latitude > 70) latitudeBuffer = 0.04;

        const WKT = `POLYGON((${longitude - 0.1} ${latitude - latitudeBuffer}, ${longitude + 0.1} ${latitude - latitudeBuffer}, ${longitude + 0.1} ${latitude + latitudeBuffer}, ${longitude - 0.1} ${latitude + latitudeBuffer}, ${longitude - 0.1} ${latitude - latitudeBuffer}))`;

        // Redirect to the href of the link
        // but first add the geometry to the URL
        const geometryLink = `${link.href}${link.href.includes('?') ? '&' : '?'}geometry=${encodeURIComponent(WKT)}`;
        link.classList.remove("is-loading"); // Remove loading class
        window.location.href = geometryLink;
      }, function (error) {
        // Handle any errors here
        console.error("Error getting user location:", error);
        link.classList.remove("is-loading"); // Remove loading class
      });
    } else {
      // Geolocation is not supported by the browser
      alert("Geolocation is not supported by your browser.");
      window.location.href = event.target.href;
    }
  }

  // Attach the click event handler to the link
  // Get all <a> tags with the class "exploreMyArea"
  const locationLinks = document.querySelectorAll("a.gbifExploreMyAreaLink");

  // Attach the click event handler to each matching link
  locationLinks.forEach(function(link) {
    link.addEventListener("click", fetchLocationAndRedirect);
  });
});




console.log(`%c 
 ,_,
(O,O)
(   )  Enabled by GBIF
-"-"-

All GBIF mediated data is freely available through our APIs. 
https://www.gbif.org/developer/summary

All GBIF source code is open source.
https://github.com/gbif

You can also reach us at
helpdesk@gbif.org
`, 'color: green; font-weight: bold;');

{% if site.siteMeasurements.enable %}
  {% include js/measure.js %}
  {% include js/terms.js %}
{% endif %}


{% if jekyll.environment != "production" and site.algae.hideHelper != true %}
  {% include js/themeFeedback.js %}
{% endif %}
