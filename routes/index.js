/*
 * GET home page.
 */

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

exports.getTweets = function(TweetDB, timespan, req, res){
  var timespan = timespan || 'past-month';
  var date = stringToDate[timespan]();
  TweetDB.find({created_at : {'$gte' : date}}, function(error, data){
    res.json({data: data});
  });
}

exports.getInstagrams = function(InstagramDB, req, res) {
  InstagramDB.find({}, function(error, data){
    res.json({data: data});
  })
};