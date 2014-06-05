require('auth/login');
require('home/home');
require('header/header');

angular.module('app', [
  'ui.router',
  'auth',
  'login',
  'home',
  'header',
  'env'   // added by build system.
])

  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.when('', '/home');
    //$urlRouterProvider.otherwise('/home');

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
      }
    });
  }]);
