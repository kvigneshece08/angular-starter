require('auth/login');
require('home/home');
require('header/header');

angular.module('app', [
  'ui.router',
  'auth',
  'login',
  'home',
  'header',
  'gettext', // translation
  'env'   // added by build system.
])

  .config(['$stateProvider', '$locationProvider',
    function ($stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider.state('app', {
      url: '/',
      templateUrl:'/app/auth/auth-pages.tpl.html'
    });

  }])

  .run(['$rootScope', 'auth', '$state', function($rootScope, auth, $state) {
    $rootScope.$on('$stateChangeStart', function(event, toState) {
      window.console.log('transition to ' + toState.name);
      if ( (/^app\..*/.test(toState.name) || toState.name === 'app') && !auth.isAuthenticated()) {
        event.preventDefault();
        $state.transitionTo('login');
      } else if (toState.name === 'app') {
         event.preventDefault();
         $state.transitionTo('app.home');
      }
    });
  }]);
