function InstagramStreamController($scope, $http, $timeout) {
  $scope.test = 'TESSSTING!';
  $scope.instagrams = [];

  $scope.setInstagrams = function(){
    $http.get('/instagrams/get.json').success(function(result) {
      var instagrams = result.data;

      for(var i = 0; i < instagrams.length; i++) {
        var instagram = JSON.parse(instagrams[i].instagram);
        instagrams[i].instagram = instagram;
        instagrams[i].url = instagram.images.low_resolution.url;
        instagrams[i].created_at = new Date(instagrams[i].created_at);
      }
      
      $scope.instagrams = instagrams;
    });
  };
}