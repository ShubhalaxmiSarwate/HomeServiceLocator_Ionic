//setup angular
angular.module('serviceLocatorApp', ['ionic','serviceLocatorApp.controllers'])

.run(function($ionicPlatform, $rootScope, $ionicLoading , $cordovaSplashscreen, $timeout) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    $timeout(function(){
        $cordovaSplashscreen.hide();
    },20000);
  });
    
    //using rootscope to display and hide the loading spinner icon
     $rootScope.$on('loading:show', function () {
        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner> Loading ...'
        })
    });

    $rootScope.$on('loading:hide', function () {
        $ionicLoading.hide();
    });

    $rootScope.$on('$stateChangeStart', function () {
        console.log('Loading ...');
        $rootScope.$broadcast('loading:show');
    });

    $rootScope.$on('$stateChangeSuccess', function () {
        console.log('done');
        $rootScope.$broadcast('loading:hide');
    });
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/sidebar.html',
    controller: 'AppCtrl'
  })

   .state('app.aboutus', {
      url: '/aboutus',
      views: {
        'mainContent': {
          templateUrl: 'templates/aboutus.html',
        }
      }
    })
  
    .state('app.services', {
      url: '/services',
      views: {
        'mainContent': {
          templateUrl: 'templates/services.html',
          controller: 'UserController',
          resolve: {
              users:  ['userFactory', function(userFactory){
                return userFactory.query();
              }],
              showMessageOn: ['userFactory', function(){
                  return true;
              }]
          }
        }
      }
    })
  
   .state('app.favorites', {
      url: '/favorites',
      views: {
        'mainContent': {
          templateUrl: 'templates/favorites.html',
            controller:'FavoritesController',
          resolve: {
              users:  ['userFactory', function(userFactory){
                return userFactory.query();
              }],
              favorites: ['favoriteFactory', function(favoriteFactory) {
                  return favoriteFactory.getFavorites();
              }]
          }
        }
      }
    })

  .state('app.userdetails', {
    url: '/users/:id',
    views: {
      'mainContent': {
        templateUrl: 'templates/userdetail.html',
        controller: 'UserDetailController',
        resolve: {
            dish: ['$stateParams','userFactory', function($stateParams, userFactory){
                return userFactory.get({id:parseInt($stateParams.id, 10)});
            }]
        }
      }
    }
  })
	
.state('app.requests', {
    url: '/requests',
    views: {
      'mainContent': {
        templateUrl: 'templates/requests.html',
        controller: 'UserDetailController',
        resolve: {
            dish: ['$stateParams','userFactory', function($stateParams, userFactory){
                return userFactory.get({id:parseInt($stateParams.id, 10)});
            }]
        }
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/services');
});