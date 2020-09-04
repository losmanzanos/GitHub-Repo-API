'use strict';

function getRepos(input) {
  fetch(`https://api.github.com/users/${input}/repos`)
  .then(response => response.json())
  .then(responseJson => displayResults(responseJson))
  .catch(error => alert("Something went wrong. Try again later."));
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('.repos').html('');
  if (responseJson.message === 'Not Found') {
    $('.boom').addClass('hidden');
    $('.repos').html("<br>Sorry, that user can't be found... Please try again!");
  } else {
    $('.repos').empty();
    let responseHtml = '';
    responseJson.forEach(userRepo => {
        responseHtml += `<h3>Repo Name: ${userRepo.name}</h3></n>
        <a href="${userRepo.html_url}" target="_blank"><button id="visit">Visit 🚀</button></a>`
    });
    $('.repos').html(responseHtml);
  }
  $('.results').removeClass('hidden');
}

function watchForm() {
  $('#gh-form').submit(event => {
    event.preventDefault();
    let userInput = $('#handle').val();
    getRepos(userInput);
  });
}

$(function() {
  console.log('Locked & Loaded 🔫');
  watchForm();
});