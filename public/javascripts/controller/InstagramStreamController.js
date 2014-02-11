function InstagramStreamController($scope, $http, $timeout) {
  $scope.test = 'TESSSTING!';
  $scope.instagrams = [];

  $scope.setInstagrams = function(){
    for(var i = 0; i < 500; i++) {
      $scope.instagrams.push('INSTAGRAM #' + i)
    }
    console.log($scope.instagrams);
  };

}