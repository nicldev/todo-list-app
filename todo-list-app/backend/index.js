const Parse = require('parse/node');

Parse.initialize(
  "VrbNgQ552mU7ujMioLAfrpjJlLctKYe4g7htLWQc", 
  "YbVoUNeftgIbS23QbnDjKdOqBd50MWdggA7Sv0J4" 
);
Parse.serverURL = 'https://parseapi.back4app.com/';

module.exports = Parse;