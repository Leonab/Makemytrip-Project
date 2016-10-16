angular.module('d3visual', [])

.controller('chartController',['$scope','$http', function($scope,$http){
      $scope.title = "Yolo";

	  $scope.d3Data = [];
      $http.get("/api/locations")
            .then(function(response) {
			    var items = {};
                for(var i=0;i<response.data.length;i++)
				{
					items[i] = response.data[i];
				}
				
				angular.forEach(items, function(item) {
					$scope.d3Data.push(item);
					
				});
				console.log($scope.d3Data);
      });
      /*$scope.d3Data = [
        {name: "Greg", score:98},
        {name: "Ari", score:96},
        {name: "Loser", score: 48}
      ];*/
    }]);