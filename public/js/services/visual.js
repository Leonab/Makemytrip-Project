angular.module('d3visual', [])

.controller('chartController',['$scope','$http', function($scope,$http){
      $scope.title = "These are suggestions based on user votes";

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
	  
	
	$scope.d3OnClick = function(item){
        alert(item.name + " has " + item.votes + " votes");
    };
	
}]);