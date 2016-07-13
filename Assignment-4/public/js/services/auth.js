// this file handles the login and logout by sending requests to the node server
var authModule = angular.module('Auth', []);

authModule.factory('Account', [ '$http', '$q', 
    function( $http, $q) {
        var Account = function(data) {
            angular.extend(this, data);
        };

        Account.login = function(user) {
            return $http.post(loginURL(), user);
        };

        Account.loginStatus = function() {
            return $http.get(statusURL());
        };

        function loginURL() {
            return '/login';
        }

        function statusURL() {
            return '/loggedin';
        }

        return Account;
    }
]);