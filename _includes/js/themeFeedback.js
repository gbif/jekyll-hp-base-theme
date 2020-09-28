// add modal for feedback content
if (themeFeedback.length > 0) {
  var modalWrapper = document.createElement('div');
  modalWrapper.innerHTML = '<div class="modal" id="feedbackModal"><div class="modal-background" id="feedbackBackground"></div><div class="modal-card"><header class="modal-card-head"><p class="modal-card-title">Theme helper</p><button id="feedbackClose" class="delete" aria-label="close"></button></header><section class="modal-card-body"><p class="content">The theme helper is only visible during development. To always hide it add <code>algae.hideHelper: true</code> to <code>_config.yml</code></p><div id="feedbackContent"></div>  </section><footer class="modal-card-foot"><button id="feedbackButtonClose" class="button">Close</button></footer></div></div>';
  document.body.appendChild(modalWrapper);

  var feedbackModal = document.getElementById('feedbackModal');
  var feedbackContent = document.getElementById('feedbackContent');
  var feedbackBackground = document.getElementById('feedbackBackground');
  var feedbackClose = document.getElementById('feedbackClose');
  var feedbackButtonClose = document.getElementById('feedbackButtonClose');

  feedbackBackground.addEventListener('click', function () {
    feedbackModal.classList.remove('is-active');
  });

  feedbackButtonClose.addEventListener('click', function () {
    feedbackModal.classList.remove('is-active');
  });

  feedbackClose.addEventListener('click', function () {
    feedbackModal.classList.remove('is-active');
  });

  // insert content from array
  var content = '';
  themeFeedback.forEach(function (e) {
    content += '<div class="content">' +
      '<h6>' + e.title + '</h6>' +
      '<div>' + e.description + '</div>';
    if (e.link) {
      content += '<a href="' + e.link + '">Read more</a></div>';
    }
    content += '</div>';
  });
  feedbackContent.innerHTML = content;

  // insert the floating feedback button
  var elem = document.createElement('div');
  elem.innerHTML = '<button>Theme helper<span class="feedbackCounter">'+themeFeedback.length+'</span></button>';
  elem.classList.add('feedbackButton');
  elem.id = 'feedbackButton';
  document.body.appendChild(elem);

  elem.addEventListener('click', function () {
    feedbackModal.classList.add('is-active');
  });
}
