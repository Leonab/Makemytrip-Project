angular.module('locationController', ['ui.router','ngMaterial'])


// inject the service factory into our controller
.controller('mainController', ['$scope','$http','Locations', function($scope, $http, Locations) {
    	
    $scope.loading = true;
			
	$scope.geocode = function() {
		
	    $scope.address = document.getElementById("address").value || "new delhi";
		Locations.geocoder($scope.address)
		.success(function(data) {
			       
			        $scope.locations = data;

			var longitude =	data.results[0].geometry.location.lng;
		    var latitude =	data.results[0].geometry.location.lat;
			
		    Locations.finder(longitude, latitude)
			.success(function(data) {
			        $scope.loading = false;
			        $scope.locations = data;
		        }); 
		        })

	};
	
	
	$scope.destination = function(req,res){
		var coords = [];
		coords=req;
		var temp = coords[0];
		coords[0]=coords[1];
		coords[1]=temp;
		$scope.finalAddress = coords;
	};
	
	$scope.findid = function(req,res){
		$scope.id = req;
	}
	
	$scope.toggle = function(){
		$scope.disabled = true;
	}
	
	
	$scope.upvote = function(){
		for(var i=0;i<$scope.locations.length;i++)
		{
			if($scope.locations[i]._id==$scope.id)
			{
				$scope.total = $scope.locations[i].votes++;
				Locations.addVote(JSON.stringify($scope.locations[i]))
				.success(function(){
					console.log("success");
				});
				break;
			}
		}
		return true;
	}
   
	}])
	
  
	
	
.config(function($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider) {
    
	
	$mdThemingProvider.theme('customTheme')
    .primaryPalette('blue-grey')
    .accentPalette('blue');
		
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/',
            templateUrl: 'views/main.html'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('search', {
            url: '/search',
            templateUrl: 'views/search.html'   
        })
        .state('404', {
            url: '/404',
            templateUrl: 'views/404.html'   
        })
        .state('results', {
            url: '/results',
            templateUrl: 'views/results.html'   
        })
        .state('suggestions', {
            url: '/suggestions',
            templateUrl: 'views/d3render.html'   
        })
		.state('path', {
            url: '/path',
            templateUrl: 'views/display.html'   
        })	
		
		$locationProvider.html5Mode(true);
        
});
	
