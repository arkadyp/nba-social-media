function InstagramStreamController($scope, $http, $timeout) {
  $scope.test = 'TESSSTING!';
  $scope.instagrams = [];

  $scope.setInstagrams = function(){
    $http.get('/instagrams/get.json').success(function(result) {
      var instagrams = result.data;

      for(var i = 0; i < instagrams.length; i++) {
        var instagram = JSON.parse(instagrams[i].instagram);
        if($scope.instagrams.indexOf(instagram.images.standard_resolution.url) === -1) {
          $scope.instagrams.push(instagram.images.standard_resolution.url);
        }
      }
    })
  };


}