function StreamController($scope, $http, $timeout) {
  $scope.tweets = [];
  
  $scope.setTweets = function(tweets){
    console.log(tweets);
    for(var i = 0; i < tweets.length; i++) {
      tweets[i].tweet = JSON.parse(tweets[i].tweet);
      tweets[i].tweet.text = (tweets[i].tweet.text).replace(/&amp;/g, '&');
      tweets[i].tweet.created_at = new Date(tweets[i].tweet.created_at);
    }
    $scope.tweets = tweets;
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