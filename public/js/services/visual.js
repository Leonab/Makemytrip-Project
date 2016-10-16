angular.module('d3visual', [])

.controller('chartController',['$scope', function($scope){
      $scope.title = "Yolo";
      $scope.d3Data = [
        {name: "Greg", score:98},
        {name: "Ari", score:96},
        {name: "Loser", score: 48}
      ];
    }]);