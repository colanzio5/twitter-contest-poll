module.exports = {
  var Twit = require('twit');
  var fs = require('fs');
  var keys = require('./creds.js');

  var T = new Twit({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token: keys.access_token,
    access_token_secret: keys.access_token_secret,
  });

  var words = [
    "#shellvpower",
    "#bmw",
    "#drivetoperform"
  ];

  start: function() {
    T.get('search/tweets', { q: ["#shellvpower", "#bmw", "#drivetoperform"], count: 100 }, function(err, data, response) {
        var ref = firebase.database().ref('tweets');
        var valid = data.statuses.filter(function(element) {
          return element.entities.hashtags.length >= 3;
        });

        valid.forEach(function(element) {
          console.log("ADDING ELEMENT" + element.id_str)
          firebase.database().ref('tweets/' + element.id_str)
          .set({
            id: element.id_str,
            text: element.text,
            url: "https://twitter.com/*/status/" + element.id_str
          });
        });
      });
  }
};
