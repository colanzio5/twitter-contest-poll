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

var stream = T.stream('statuses/filter', {
    track: words
});

stream.on('tweet', function (tweet) {
    console.log(element.text);
    
    var valid = tweet.entities.hashtags.filter(function (element) {
        return (element.text.toUpperCase() == 'BMW') || (element.text.toUpperCase() == 'SHELLVPOWER') || (element.text.toUpperCase() == 'DRIVETOPERFORM');
    });

    valid.forEach(function (element) {
        element.text = element.text.toUpperCase();
    });

    valid = valid.filter(function (a) {
        if (!this.has(a.text)) {
            this.set(a.text, true);
            return true;
        }
    }, new Map);

    if (valid.length > 1) {
        var record = "Entry ID: " + tweet.id_str + ", Tags: ";

        valid.forEach(function (element) {
            record = record + element.text + ",";
        });

        record = record + valid.length.toString() + ", url: https://twitter.com/*/status/" + tweet.id_str + "\n";
        fs.appendFile("./output", record);
    }
});