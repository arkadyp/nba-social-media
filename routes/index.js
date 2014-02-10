/*
 * GET home page.
 */

exports.index = function(Tweet) {
  return function(req, res) {
    Tweet.find({}, function(error, tweets) {
      res.render('index', {
        title: 'NBA Social Media',
        tweets : tweets
      });
    });
  };
};

exports.addTweet = function(Tweet) {
  return function(req, res) {
    var tweet = new Tweet(req.body);
    tweet.save(function(error, tweet) {
      if (error || !tweet) {
        res.json({ error : error });
      } else {
        res.json({ tweet : tweet });
      }
    });
  };
};

exports.get = function(Tweet) {
  return function(req, res) {
    Tweet.find({}, function(error, tweets) {
      res.json({ tweets : tweets });
    });
  }
};

exports.update = function(Tweet) {
  return function(req, res) {
    Tweet.findOne({ _id : req.params.id }, function(error, tweet) {
      if (error || !tweet) {
        res.json({ error : error });
      } else {
        tweet.done = req.body.done;
        tweet.save(function(error, tweet) {
          if (error || !tweet) {
            res.json({ error : error });
          } else {
            res.json({ tweet : tweet });
          }
        });
      }
    });
  }
};