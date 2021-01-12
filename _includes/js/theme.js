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



// control the pagenav
// https://bulma.io/documentation/components/navbar/
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
  const $activeLink = Array.prototype.slice.call(document.querySelectorAll('#pageNavbar .active'), 0);
  if ($activeLink.length > 0) {
    const $ul = $activeLink[0].parentNode.parentNode;
    const $navbarLink = $ul.previousElementSibling;
    if ($navbarLink.classList.contains('navbar-link')) {
      $navbarLink.classList.add('is-expanded');
      $ul.classList.add('is-expanded');
      $navbarLink.setAttribute('aria-expanded', true)
      $ul.setAttribute('aria-expanded', true)
    }
  }

});


// highlight in TOC
window.addEventListener("load", () => {
  // the TOC highlighting is dependent on the whole section being contained in a div. That isn't the case for the markdown rendered content
  const isAsciiDoc = document.querySelector('.sectionbody');
  if (!isAsciiDoc) return;

  // Retrieve all help sections
  const headlines = Array.from(document.querySelectorAll("h1[id],h2[id],h3[id],h4[id]"));
  const sections = headlines.map(headline => {
    const headlineId = headline.id;
    const section = headline.parentElement;
    section.id = 'section__' + headlineId;
    return section;
  });

  // Once a scrolling event is detected, iterate all elements
  // whose visibility changed and highlight their navigation entry
  const scrollHandler = entries => {
    entries.reverse().forEach(entry => {
      const section = entry.target;
      const sectionId = section.id;
      const sectionLink = document.querySelector(`.toc a[href="#${sectionId.substr(9)}"]`);
      
      if (!sectionLink) return;
      if (entry.intersectionRatio > 0) {
        section.classList.add("visible");
        sectionLink.classList.add("visible");
      } else {
        section.classList.remove("visible");
        sectionLink.classList.remove("visible");
      }
    });
  };

  // Creates a new scroll observer
  const observer = new IntersectionObserver(scrollHandler);
  sections.forEach(section => observer.observe(section));
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



{% if jekyll.environment != "production" and site.algae.hideHelper != true %}
{% include js/themeFeedback.js %}
{% endif %}
