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
///HEAT SCREEN NAMES
/////////////////////////////
screen_names['heat'] = {
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

exports.getTweets = function(Tweet, cb){
  //cycle through names
  for(var username in screen_names['heat']) {
    //cycle though page count
    for(var page = 1; page <= 5 ; page++) {
      var params = {
        screen_name : username,
        conut : 200,
        page : page
      };
      exports.timelineRequest(Tweet, cb, params, screen_names['heat'][username], username);
    }
  }
};

exports.timelineRequest = function(Tweet, cb, params, name, username, teamname){
  twitter.getTimeline('user', params, _twitterAccessToken, _twitterAcessTokenSecret, 
  function(error, data, res) {
    if(error) {console.log(error)};
    _.each(data, function(tweet){
      addTweet(Tweet, name, username, tweet, teamname);
    });
  });
};

var addTweet = function(Tweet, name, username, teamname, tweet){
  var currentTweet = new Tweet({
    name : name,
    username : username,
    team: teamname,
    tweet : JSON.stringify(tweet),
    created_at : new Date(tweet.created_at)
  });
  currentTweet.save();
};