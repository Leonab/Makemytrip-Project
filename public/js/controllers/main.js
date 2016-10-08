angular.module('locationController', ['ui.router'])

	// inject the service factory into our controller
	.controller('mainController', ['$scope','$http','$mdToast','$animate', function($scope, $http, $mdToast, $animate) {
    
	this.address = "new delhi";
   
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
	
