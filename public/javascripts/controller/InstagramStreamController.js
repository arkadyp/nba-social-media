function InstagramStreamController($scope, $http, $timeout) {
  $scope.test = 'TESSSTING!';
  $scope.instagrams = [];

  $scope.team = 'Lakers';

  $scope.displayOptions = {
    reverse: true,
    orderBy: 'likedScore'
  };

  $scope.$watch('team', function() {
    $scope.setInstagrams();
   });

  $scope.setInstagrams = function(){
    $http.get('/instagrams/' + $scope.team + '.json').success(function(result) {
      var instagrams = result.data;

      var instagramsByUser = {};
      // var hashTags = {};

      for(var i = 0; i < instagrams.length; i++) {
        var username = instagrams[i].username;
        var instagram = JSON.parse(instagrams[i].instagram);
        if(!(username in instagramsByUser)) {
          instagramsByUser[username] = {};
          instagramsByUser[username].liked = 0;
        }
        instagramsByUser[username].liked += instagram.likes.count || 0;
      }

      for(var i = 0; i < instagrams.length; i++) {
        var instagram = JSON.parse(instagrams[i].instagram);
        instagrams[i].instagram = instagram;
        instagrams[i].url = instagram.images.low_resolution.url;
        instagrams[i].text = (instagram.caption) ? instagram.caption.text : "";
        instagrams[i].created_at = new Date(instagrams[i].created_at);
        instagrams[i].likedScore = (instagram.likes.count / instagramsByUser[instagrams[i].username].liked  * 100).toFixed(2);
      }
      
      $scope.instagrams = instagrams;
      console.log(instagrams);
    });
  };
}