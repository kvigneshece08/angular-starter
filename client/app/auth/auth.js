angular.module('auth', [])

.factory('auth', ['$http', '$q', 'env', '$timeout', function($http, $q, env, $timeout) {

  var userObj = null;


  return {

    /**
     * Get authenticated user object.
     */
    getUser: function() {
      return userObj;
    },

    /**
     * Is the user authenticated?
     */
    isAuthenticated: function() {
      if (angular.isObject(userObj)) {
        window.console.log('User exists');
        return true;
      }

      window.console.log('User does not exist!');
      return false;
    },

    /**
     * Authenticate the user with the given credentials.
     * Returns a promise that is resolved on success.
     */
    authenticate: function(userName, password) {
      var deferred = $q.defer();

      $timeout(function() {
        if (userName === 'test' && password === 'test') {
          userObj = {user: 'test'};
          deferred.resolve(userObj, 2000);
        } else {
          deferred.reject('invalid password');
        }
      });

      return deferred.promise;
    }
  };

}]);