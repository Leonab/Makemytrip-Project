angular.module('locationController', ['ui.router'])

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
	
