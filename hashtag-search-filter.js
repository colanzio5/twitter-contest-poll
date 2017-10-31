var Twit = require('twit');
var fs = require('fs');
var keys = require('./creds.js');
var firebase = require('firebase')

//Local Credential Variables
var T = new Twit({
  consumer_key: keys.consumer_key,
  consumer_secret: keys.consumer_secret,
  access_token: keys.access_token,
  access_token_secret: keys.access_token_secret,
});

var config = {
  apiKey: "AIzaSyCCUDKZ597wMpd3FMhZlJ7ObWpYU5qoREk",
  authDomain: "twitter-hastag-poll.firebaseapp.com",
  databaseURL: "https://twitter-hastag-poll.firebaseio.com",
  projectId: "twitter-hastag-poll",
  storageBucket: "twitter-hastag-poll.appspot.com",
  messagingSenderId: "1053019423963"
};
firebase.initializeApp(config);

//Local Program Variables
var words = [
  "#shellvpower",
  "#bmw",
  "#drivetoperform"
];
T.get('search/tweets', { q: ["#shellvpower", "#bmw", "#drivetoperform"], count: 100 },
function(err, data, response) {
  var valid = data.statuses.filter(function(element) {
    return element.entities.hashtags.length >= 2;
  });

  valid.forEach(function(element) {
    firebase.database().ref('tweets/' + element.id_str).set({
      id: element.id_str,
      text: element.text,
      url: "https://twitter.com/*/status/" + element.id_str,
      date: new Date();
    });
  });
});
