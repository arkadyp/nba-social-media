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
    return new Date() - 7*24*60*60*1000;
  }
}

exports.getData = function(Tweet, timespan, req, res){
  var timespan = timespan || 'past-week';
  var date = stringToDate[timespan]();
  Tweet.find({created_at : {'$gte' : date}}, function(error, data){
    console.log('i am so so so so fucked');
    console.log(data);
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