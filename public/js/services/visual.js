angular.module('d3visual', [])

.controller('chartController',['$scope','$http', function($scope,$http){
      $scope.title = "Yolo";
	  $scope.details = {};
      $http.get("/api/locations")
            .then(function(response) {
                $scope.details = response.data;
			    
      });
      console.log($scope.details);
      $scope.d3Data = [
        {name: "Greg", score:98},
        {name: "Ari", score:96},
        {name: "Loser", score: 48}
      ];
    }]);