// This file handles all login part. Once successful login it takes you to the intro page

angular.module('LoginModule', ['Auth']).controller('LoginController', function($scope, $location, Account) {
	$scope.user = {};
	
    $scope.login = function(user){
    	Account.login(user).then(function(res){
    		$location.path( "/intro" );
    	}, function(error){
    		$scope.invalidCredentials = true;
    		console.log(error);
    	});
    }
});