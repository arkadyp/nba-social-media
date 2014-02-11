/*
 * GET home page.
 */

// exports.index = function(Tweet) {
//   return function(req, res) {
//     Tweet.find({}, function(error, tweets) {
//       res.render('index', {
//         title: 'NBA Social Media',
//         tweets : tweets
//       });
//     });
//   };
// };

exports.index = function() {
  return function(req, res) {
    res.render('index', {
      title: 'NBA Social Media'
    });
  };
};

var stringToDate = {
  "past-week" : function(){
    return (new Date() - 7*24*60*60*1000);
  },
  "past-month" : function(){
    return (new Date() - 4*7*24*60*60*1000);
  },
  "past-3-months" : function(){
    return (new Date() - 3*4*7*24*60*60*1000);
  },
  "past-6-months" : function(){
    return (new Date() - 6*4*7*24*60*60*1000);
  },
  "past-year" : function(){
    return (new Date() - 12*7*24*60*60*1000);
  },
}

exports.getData = function(Tweet, timespan, req, res){
  var timespan = timespan || 'past-month';
  var date = stringToDate[timespan]();
  console.log(date);
  Tweet.find({created_at : {'$gte' : date}}, function(error, data){
    res.json({data: data});
  });
}

// exports.addTweet = function(Tweet) {
//   return function(req, res) {
//     var tweet = new Tweet(req.body);
//     tweet.save(function(error, tweet) {
//       if (error || !tweet) {
//         res.json({ error : error });
//       } else {
//         res.json({ tweet : tweet });
//       }
//     });
//   };
// };



// exports.get = function(Tweet) {
//   return function(req, res) {
//     Tweet.find({}, function(error, tweets) {
//       res.json({ tweets : tweets });
//     });
//   }
// };

// exports.update = function(Tweet) {
//   return function(req, res) {
//     Tweet.findOne({ _id : req.params.id }, function(error, tweet) {
//       if (error || !tweet) {
//         res.json({ error : error });
//       } else {
//         tweet.done = req.body.done;
//         tweet.save(function(error, tweet) {
//           if (error || !tweet) {
//             res.json({ error : error });
//           } else {
//             res.json({ tweet : tweet });
//           }
//         });
//       }
//     });
//   }
// };