/*
This is just a crude example of what it means to write your own dataset page. This example is not meant to be used as is. It is just to show how you can insert whatever your heart desires.
*/
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const datasetKey = urlParams.get('key')

const datasetArticleElement = document.getElementById('my-custom-dataset');

if (datasetKey) {
  fetch(`https://api.gbif.org/v1/dataset/${datasetKey}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonResponse) {
      datasetArticleElement.innerHTML = datasetTemplate(jsonResponse);
    })
    .catch(function (err) {
      console.log(err);
    });
} else {
  alert('no such dataset found');
}