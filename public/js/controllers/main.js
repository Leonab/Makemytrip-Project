angular.module('locationController', ['ui.router','ngMaterial'])


.config(function($mdThemingProvider) {

    $mdThemingProvider.theme('customTheme')
        .primaryPalette('blue-grey')
        .accentPalette('blue');


})



	// inject the service factory into our controller
	.controller('mainController', ['$scope','$http','Locations','$mdToast','$animate', function($scope, $http, Locations, $mdToast, $animate) {
    	
	
	$scope.geocode = function() {
	   // if ($scope.searchLocation != undefined) {
		    $scope.loading = true;
		
	    $scope.address = document.getElementById("address").value || "new delhi";
		console.log($scope.address);
		Locations.geocoder($scope.address)
		.success(function(data) {
			        $scope.loading = false;
			        $scope.locations = data;
					console.log($scope.locations);

			var longitude =	data.results[0].geometry.location.lng;
		    var latitude =	data.results[0].geometry.location.lat;
			
		    Locations.finder(longitude, latitude)
			.success(function(data) {
			        $scope.loading = false;
			        $scope.locations = data;
						console.log(data);
		        }); 
		        })
	//}

	};
	
	
	$scope.destination = function(req,res){
		var coords = [];
		coords=req;
		var temp = coords[0];
		coords[0]=coords[1];
		coords[1]=temp;
		console.log(req);
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
				console.log($scope.total);
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
	
  
  
  
	
	
	.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/',
            templateUrl: 'views/main.html'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            templateUrl: 'views/about.html'   
        })
        .state('search', {
            url: '/search',
            templateUrl: 'views/search.html'   
        })
        .state('results', {
            url: '/results',
            templateUrl: 'views/results.html'   
        })
		.state('differentlyabled', {
            url: '/differentlyabled',
            templateUrl: 'views/display.html'   
        })
		.state('contact', {
            url: '/contact',
            templateUrl: 'views/contact.html'   
        })
		.state('response', {
            url: '/response',
            templateUrl: 'views/response.html'  
		});	
		
		$locationProvider.html5Mode(true);
        
});
	
