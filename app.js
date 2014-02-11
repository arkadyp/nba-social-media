///////////////////////
//Module Dependencies
///////////////////////

var express = require('express');
var http = require('http');
var path = require('path');

var oauth = require('OAuth');
var _ = require('underscore');

var routes = require('./routes');
var user = require('./routes/user');
var tweetFetcher = require('./routes/TweetFetcher');
var instaFetcher = require('./routes/InstagramFetcher');

var app = express();

///////////////////////
//Initialize database connection
///////////////////////

var Mongoose = require('mongoose');

var db = Mongoose.createConnection('localhost', 'nbaTestData');
var TweetSchema = require('./models/Tweet').TweetSchema;
var Tweet = db.model('tweets', TweetSchema);

var db = Mongoose.createConnection('localhost', 'nbaTestData');
var InstagramSchema = require('./models/Instagram').InstagramSchema;
var InstagramDB = db.model('instagram2', InstagramSchema);

///////////////////////
//Set up server
///////////////////////

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

///////////////////////
//Fetch Tweets
///////////////////////



///////////////////////
//Set up routes
///////////////////////


app.get('/', routes.index());

app.get('/twitter', function(req, res){
  tweetFetcher.getTweets(Tweet);
  res.end('fetching');
});

app.get('/tweets/:time.json', function(req, res){
  routes.getTweets(Tweet, req.params['time'], req, res);
});

app.get('/instagram', function(req, res){
  instaFetcher.fetchInstagrams(InstagramDB, function(data) {
    res.json({data: data});
  });
});

app.get('/instagrams/get.json', function(req, res){
  routes.getInstagrams(InstagramDB, req, res);
});





//   function(req, res){
//   console.log(req.params['time']);
//   res.end('shit');
// });







// app.get('/users', user.list);
// app.get('/tweets.json', routes.get(Tweet));
// app.put('/tweet/:id.json', routes.update(Tweet));
// app.post('/tweet.json', routes.addTweet(Tweet));



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});








