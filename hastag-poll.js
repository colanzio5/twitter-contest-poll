var Twit = require('twit');
var fs = require('fs');

var T = new Twit({
    consumer_key: '3442mFKp54ciOmVUsA5oVOdVT',
    consumer_secret: 'lfNpSyDrShwGTCppH9SYlC9QP3TFQdNXLw7JJUyXMbrBuiusVS',
    access_token: '916052172927787008-JNiH0YAniHRyJ4fwzwvjAlgUwCs3HM3',
    access_token_secret: 'ElpdbAQPucBxUOG5e24p9v0doB5zn2DwUEI1NJg0DsYqx',
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
    console.log(tweet.text);

    var valid = tweet.entities.hashtags.filter(function (element) {
        return (element.text.toUpperCase() == 'BMW') || (element.text.toUpperCase() == 'SHELLVPOWER') || (element.text.toUpperCase() == 'DRIVETOPERFORM');
    });

    valid.forEach(function(element){
        element.text = element.text.toUpperCase();
    });

    valid = valid.filter(function (a) {
        if (!this.has(a.text)) {
            this.set(a.text, true);
            return true;
        }
    }, new Map);

    if (valid.length > 0) {
        if(valid.length == 1){
            if(valid[0].toUpperCase() == BMW){
                d
            }
        } else {
            var record = "Entry ID: " + tweet.id_str + ", Tags: ";
            valid.forEach(function (element) {
                record = record + element.text + ",";
            });
            record = record + valid.length.toString() + ", url: https://twitter.com/*/status/" + tweet.id_str + "\n";
            fs.appendFile("./output", record);
        }
    }
});