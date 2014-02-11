var twitterAPI = require('node-twitter-api');
var _ = require('underscore');

var _twitterConsumerKey = "gBRsR0jw1nynv3OU4ChclA";
var _twitterConsumerSecret = "d0e1q3pdSJbQ8ZFkexYOSEP9yQCJioaF2o1h1pFiEQ";
var _twitterAccessToken = "1853538294-BzDMRuXu8YVa95XsSWKYhmUjvVokpTOTX308UW8";
var _twitterAcessTokenSecret = "7TfGney3Uj9CuGhdyKUXOMKXXpzhll34YqB5Q8JIgeBBy";

var twitter = new twitterAPI({
    consumerKey : _twitterConsumerKey,
    consumerSecret : _twitterConsumerSecret,
    callback : 'http://yoururl.tld/something'
});

var screen_names = [];
/////////////////////////////
///Heat SCREEN NAMES
/////////////////////////////
screen_names['Heat'] = {
  'kingjames' : 'Lebron James',
  'DwyaneWade' : 'Dwyane Wade',
  'chrisbosh' : 'Chris Bosh',
  'Odenized' : 'Greg Oden',
  'easyst0' : 'Michael Beasley'
  // 'chr1sa‎' : 'Chris Anderson',
  // 'greenRAYn20' : 'Ray Allen',
  // 'mchalmers15‎': 'Mario Chalmers',
  // 'PG30_MIA' : 'Norris Cole',
  // 'ShaneBattier' : 'Shane Battier',
  // 'ThisIsUD‎' : 'Udonis Haslem',
  // 'MoneyMase‎' : 'Roger Mason Jr.',
  // 'jonesforthree‎' : 'James Jones'
};

screen_names['Lakers'] = {
  'kobebryant' : 'Kobe Bryant',
  'paugasol‎' : 'Pau Gasol',
  'NickSwagyPYoung' : 'Nick Young',
  'SteveNash‎' : 'Steve Nash',
  'KButter5' : 'Kendall Marshall',
  'XavierHenry‎' : 'Xavier Henry',
  'RyanKelly34' : 'Ryan Kelly',
  'SteveBlake5' : 'Steve Blake',
  'JrFarmar' : 'Jordan Farmar',
  'jordanchill43' : 'Jordan Hill',
  'ChrisKaman' : 'Chris Kaman',
  'Bobby_Sacre' : 'Robert Sacre',
  'Jmeeks20' : 'Jodie Meeks'
};

exports.getTweets = function(Tweet){
  //cycle through names
  for(var username in screen_names['Lakers']) {
    //cycle though page count
    for(var page = 7; page <= 7 ; page++) {
      var params = {
        screen_name : username,
        count : 200,
        page : page
      };
      exports.timelineRequest(Tweet, params, screen_names['Lakers'][username], username, 'Lakers');
    }
  }
};

exports.timelineRequest = function(Tweet, params, name, username, teamname){
  twitter.getTimeline('user', params, _twitterAccessToken, _twitterAcessTokenSecret, 
  function(error, data, res) {
    if(error) {console.log(error)};
    _.each(data, function(tweet){
      addTweet(Tweet, name, username, teamname, tweet);
    });
  });
};

var addTweet = function(Tweet, name, username, teamname, tweet){
  console.log('save tweet');
  var currentTweet = new Tweet({
    name : name,
    username : username,
    team: teamname,
    tweet : JSON.stringify(tweet),
    created_at : new Date(tweet.created_at)
  });
  currentTweet.save();
};