var currentTermsVersion = "{{ site.siteMeasurements.termsVersion }}" || "1.0.3";
var termsNoticeElement = document.getElementById('termsNotice');
var GBIF_terms_storage_key = 'GBIF_terms';


function saveToStorage(value, key) {
  key = key || GBIF_terms_storage_key;
  if (typeof value === 'undefined') {
    localStorage.removeItem(key);
  } else if(typeof value === 'object' && value !== null) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
}

function loadFromStorage(key) {
  key = key || GBIF_terms_storage_key;
  var item = localStorage.getItem(key);
  try {
    var parsed = JSON.parse(item);
    return parsed;
  } catch(err) {
    return item;
  }
}

var termsState = loadFromStorage();

// if the current version isn't what the user has accepted/rejected, then show popup again
if ( termsState && termsState.version !== currentTermsVersion) {
  localStorage.removeItem(GBIF_terms_storage_key);
  termsState = loadFromStorage();
}

// if the current version is correct and the terms are accepted, then attach tracking scripts
if ( termsState && termsState.version === currentTermsVersion && termsState.accepted) {
  attachMeasurements();
}

// if the user hasn't seen the terms before, then show them
if (!termsState) {
  termsNoticeElement.classList.remove("is-hidden");
}

function gbif_acceptCookies() {
  termsNoticeElement.classList.toggle("is-hidden");
  saveToStorage({
    version: currentTermsVersion,
    accepted: true
  });
  // load tracking scripts
  console.log('Terms accepted, attach measurement script');
  attachMeasurements();
}

function gbif_rejectCookies() {
  console.log('Terms rejected, do not attach measurement scripts');
  termsNoticeElement.classList.toggle("is-hidden");
  saveToStorage({
    version: currentTermsVersion,
    accepted: false
  });
}
