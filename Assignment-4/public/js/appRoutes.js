// this file defines different app routes and states
angular.module('appRoutes', ['LoginModule', 'TestModule']).config(['$routeProvider', '$locationProvider', '$stateProvider', function($routeProvider, $locationProvider,  $stateProvider) {

	var checkLoggedin = function($q,  $http, $location, $rootScope){ 
		// Initialize a new promise 
		var deferred = $q.defer(); 
		// Make an AJAX call to check if the user is logged in 
		$http.get('/loggedin').success(function(user){
		// Authenticated 
		if (user !== '0'){
            $rootScope.user = user;
            deferred.resolve(); 
        }
		// Not Authenticated 
		else { 
				deferred.reject(); 
				$location.url('/');
			} 
		}); 
		return deferred.promise; 
	};

    $routeProvider
        // login page
        .when('/index.html', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .when('/intro', {
        	templateUrl: 'views/intro.html',
            controller: 'IntroController',
        	resolve: { 
        		loggedin: checkLoggedin
        	}
        });

    $stateProvider
        // login page
        .state('test', {
            templateUrl: '/views/test.html',
            url: '/test/:tid',
            controller: 'TestController',
            resolve: { 
                loggedin: checkLoggedin
            }
        })
        .state('test.question', {
            templateUrl: '/views/question.html',
            controller: 'QuestionController',
            url: '/question/:qid',
            resolve: { 
                loggedin: checkLoggedin
            }
        });
        
    $locationProvider.html5Mode(true);

}]);