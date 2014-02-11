function StreamController($scope, $http, $timeout) {
  $scope.TweetDB = null;
  $scope.tweets = [];
  $scope.hashtags = {'hash' : 'hash'};
  $scope.user_mentions = {'user' : 'user'};
  $scope.timespan = 'past-month';

  $scope.$watch('timespan', function() {
    $scope.setTweets();
   });

  var updateEntities = function(type, field, content){
    for(var i = 0; i < content.length; i++) {
      if(!(content[i][field] in $scope[type])) {
        $scope[type][content[i][field]] = 0;
      }
      $scope[type][content[i][field]]++;
    }
  };

  $scope.test = function(a) {
    console.log(a);
  }

  
  $scope.setTweets = function(){
    $http.get('/tweets/' + $scope.timespan + '.json').success(function(result) {
      var tweets = result.data;
      //calculate stats separately for each username
      //TODO: optimize for speed
      var tweetsByUser = {};
      var hashTags = {};
      for(var i = 0; i < tweets.length; i++) {
        var username = tweets[i].username;
        var tweet = JSON.parse(tweets[i].tweet);
        if(!(username in tweetsByUser)) {
          tweetsByUser[username] = {};
          tweetsByUser[username].rtTot = 0;
          tweetsByUser[username].fvTot = 0;
        }
        tweetsByUser[username].rtTot += tweet.retweet_count || 0;
        tweetsByUser[username].fvTot += tweet.favorite_count || 0; 

        //record hashtags
        if(tweet.entities.hashtags.length > 0) {
          updateEntities('hashtags', 'text', tweet.entities.hashtags);
        }
        if(tweet.entities.user_mentions.length > 0) {
          updateEntities('user_mentions', 'name', tweet.entities.user_mentions);
        }
      }

      for(var i = 0; i < tweets.length; i++) {
        tweets[i].tweet = JSON.parse(tweets[i].tweet);
        tweets[i].tweet.text = (tweets[i].tweet.text).replace(/&amp;/g, '&');
        tweets[i].created_at = new Date(tweets[i].tweet.created_at);

        //TODO: UPDATE ACTUAL DATABASE WITH THIS INFO
        tweets[i].rtScore = Number((tweets[i].tweet.retweet_count / tweetsByUser[tweets[i].username].rtTot * 100).toFixed(2));
        tweets[i].fvScore = Number((tweets[i].tweet.favorite_count / tweetsByUser[tweets[i].username].fvTot * 100).toFixed(2));
        tweets[i].totScore = (tweets[i].fvScore + tweets[i].rtScore / 2).toFixed(2);
      }
      console.log($scope.hashtags);
      console.log($scope.user_mentions);
      $scope.tweets = tweets;
    });
  };

  $scope.displayOptions = {
    reverse: true,
    orderBy: 'totScore'
  };

  $scope.searchText = function(){

  }

  $scope.update = function(tweet) {
  };

  $scope.updateList = function() {
  };

  $scope.addNewTweet = function() {
  };
}



// function StreamController($scope, $http, $timeout) {
//   $scope.tweets = [];
  
//   $scope.newTweet = {
//     done : false,
//     due : new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
//     description : ''
//   };

//   $scope.doneFilter = { done : true };
//   $scope.notDoneFilter = { done : false };

//   $scope.setTweets = function(tweets) {
//     $scope.tweets = tweets;
//   };

//   $scope.update = function(tweet) {
//     $http.put('/tweet/' + tweet._id + '.json', tweet).success(function(data) {
//       if (!data.tweet) {
//         alert(JSON.stringify(data));
//       }
//     });
//   };

//   $scope.updateList = function() {
//     $http.get('/tweets.json').success(function(data) {
//       $scope.tweets = data.tweets;
//     });

//     $timeout(function() {
//       $scope.updateList();
//     }, 30 * 60 * 1000); // update every 30 minutes;
//   };

//   $timeout(function() {
//     $scope.updateList();
//   }, 30 * 60 * 1000); // update every 30 minutes;

//   $scope.addNewTweet = function() {
//     $http.post('/tweet.json', $scope.newTweet).success(function(data) {
//       // debugger;
//       if (data.tweet) {
//         $scope.tweets.push(data.tweet);
//         $scope.newTweet.description = '';
//       } else {
//         alert(JSON.stringify(data));
//       }
//     });
//   };
// }