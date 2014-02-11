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

var app = express();

///////////////////////
//Initialize database connection
///////////////////////

var Mongoose = require('mongoose');
var db = Mongoose.createConnection('localhost', 'nbaTestData');

var TweetSchema = require('./models/Tweet.js').TweetSchema;
var Tweet = db.model('tweets', TweetSchema);

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

app.get('/tweets/:time.json', function(req, res){
  routes.getData(Tweet, req.params['time'], req, res);
});


//   function(req, res){
//   console.log(req.params['time']);
//   res.end('shit');
// });







// app.get('/users', user.list);
// app.get('/tweets.json', routes.get(Tweet));
// app.put('/tweet/:id.json', routes.update(Tweet));
// app.post('/tweet.json', routes.addTweet(Tweet));

app.get('/twitter', function(req, res){
  tweetFetcher.getTweets(Tweet);
  res.end('fetching');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});








