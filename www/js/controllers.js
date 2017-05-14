angular.module('serviceLocatorApp.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $localStorage, $ionicPlatform, $cordovaCamera, $cordovaImagePicker, userFactory) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = $localStorage.getObject('userinfo','{}');
     $scope.registration = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
	  //call to the server to verify and login. On success store the data on local storage
    $localStorage.storeObject('userinfo',$scope.loginData);    
    
  };
	
$scope.doLogout = function() {
    console.log('Doing logout');
    $localStorage.removeItem('userinfo');
	//callto the server to logout
  };
	
	$scope.toggleAvailableStatus = function(){
			console.log(' current status ' + $scope.user.availibilityStatus);
			$scope.user.availibilityStatus = !$scope.user.availibilityStatus;
			userFactory.update({id: parseInt($stateParams.id,10)}, $scope.user);			
	};

        // Create the registration modal that we will use later
    $ionicModal.fromTemplateUrl('templates/register.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.registerform = modal;
    });

    // Triggered in the registration modal to close it
    $scope.closeRegister = function () {
        $scope.registerform.hide();
    };

    // Open the registration modal
    $scope.register = function () {
        $scope.registerform.show();
    };

    // Perform the registration action when the user submits the registration form
    $scope.doRegister = function () {
        userFactory.save($scope.registration);
        $timeout(function () {
            $scope.closeRegister();
        }, 1000);
    };
    
        $ionicPlatform.ready(function() {
        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
         $scope.takePicture = function() {
            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.registration.image = "data:image/jpeg;base64," + imageData;
            }, function(err) {
                console.log(err);
            });

            $scope.registerform.show();

        };
            
        var imgPickerOptions = {
             maximumImagesCount: 1,
             width: 800,
             height: 800,
             quality: 50
        };
        $scope.getPicture = function(){
            $cordovaImagePicker.getPicture(imgPickerOptions)
                .then(function(fetchdImg){
                    console.log('selected string is '+ fetchdImg);
                    $scope.registration.imgSrc = "data:image/jpeg;base64," + fetchdImg;
                },
                function(err){
                    console.log(err);
                });
        };
    });
    
})

.controller('UserController', ['$scope', 'users', 'baseURL', function($scope, users, baseURL) {
            
            $scope.baseURL = baseURL;
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showUsers = true;
            $scope.message = "Loading ...";
    
            $scope.users = users;
                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "Gardener";
                }
                else if (setTab === 3) {
                    $scope.filtText = "Plumber";
                }
                else if (setTab === 4) {
                    $scope.filtText = "Electrician";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
    
//todo: add to favorite: need to add functionality to add a user/service provider as favorite
        }])

        .controller('UserDetailController', ['$scope', '$stateParams', 'user', 'userFactory', 'favoriteFactory', 'baseURL', '$ionicPopover', '$ionicModal', '$ionicPlatform', '$cordovaLocalNotification', '$cordovaToast',  function($scope, $stateParams, user, userFactory, favoriteFactory, baseURL, $ionicPopover, $ionicModal, $ionicPlatform, $cordovaLocalNotification, $cordovaToast) {
            
            $scope.baseURL = baseURL;
            $scope.dish = {};
            $scope.showDish = false;
            $scope.message="Loading ...";
            
            $scope.user = user;
                      
        $scope.addFavorites = function(){
            console.log("Add to fav " + $scope.user.id);
            favoriteFactory.addToFavorites($scope.user.id);
            $ionicPlatform.ready(function () {
                        $cordovaLocalNotification.schedule({
                            id: 1,
                            title: "Added Favorite",
                            text: $scope.user.companyName
                        }).then(function () {
                            console.log('Added Favorite '+$scope.user.companyName);
                        },
                        function () {
                            console.log('Failed to add Notification ');
                        });

                        $cordovaToast
                          .show('Added Favorite '+$scope.user.companyName, 'long', 'bottom')
                          .then(function (success) {
                              // success
                          }, function (error) {
                              // error
                          });
                });
            $scope.closePopover();
        };
        
        $scope.commentData = {};
        //create the model for dish comment
        $ionicModal.fromTemplateUrl('templates/service-comment.html',{
            scope: $scope
        }).then(function(modal){
           $scope.commentForm = modal; 
        });

        //close the comment modal
        $scope.closeComment = function(){
            $scope.commentForm.hide();    
        };

        //open the comment modal
        $scope.commentOnDish = function(){
            $scope.commentForm.show();
        };

        $scope.submitComment = function(){
            
            console.log($scope.commentData);
            $scope.commentData.date = new Date().toISOString();
            $scope.user.comments.push($scope.commentData);
            userFactory.update({id: parseInt($stateParams.id,10)}, $scope.user);
            $scope.closeComment();
            $scope.closePopover();
            $scope.commentData = {};
            
        };
		
			//toggle the availibility status of user between true/false
		$scope.toggleAvailableStatus = function(){
			console.log(' current status ' + $scope.user.availibilityStatus);
			$scope.user.availibilityStatus = !$scope.user.availibilityStatus;
			userFactory.update({id: parseInt($stateParams.id,10)}, $scope.user);			
		};
			

            
        }])

		//to be used for adding comments or just enquiries
        .controller('UserCommentController', ['$scope', 'userFactory', function($scope,userFactory) {
            
            $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                
                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);
                
                $scope.user.comments.push($scope.mycomment);
        userFactory.update({id:$scope.user.id},$scope.user);
                
                $scope.commentForm.$setPristine();
                
                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            }
        }])

        //for future use to add the functionality to add/remove favorite service provider
       .controller('FavoritesController', ['$scope', 'users', 'favorites', 'favoriteFactory', 'baseURL', '$ionicListDelegate', '$ionicPopup', '$ionicLoading', '$timeout','$ionicPlatform ', '$cordovaVibration', function ($scope, users, favorites, favoriteFactory, baseURL, $ionicListDelegate, $ionicPopup, $ionicLoading, $timeout, $ionicPlatform , $cordovaVibration) {

            $scope.baseURL = baseURL;
            $scope.shouldShowDelete = false;
           
            /*$ionicLoading.show({
                template: '<ion-spinner></ion-spinner> Loading...'
            });*/
           
           $scope.favorites = favorites;

            $scope.users = users;

            console.log($scope.users, $scope.favorites);

            $scope.toggleDelete = function () {
                $scope.shouldShowDelete = !$scope.shouldShowDelete;
                console.log($scope.shouldShowDelete);
            }

            $scope.deleteFavorite = function (index) {
                
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Confirm Delete',
                    template: 'Are you sure you want to delete this item?'
                });
                
                confirmPopup.then(function (res) {
                    if (res) {
                        console.log('Ok to delete');
                        favoriteFactory.deleteFromFavorites(index);
						$ionicPlatform.ready(function () {
							$cordovaVibration.vibrate(100);
						});
                    } else {
                        console.log('Canceled delete');
                    }
                });

                $scope.shouldShowDelete = false;

        }}])

        .filter('favoriteFilter', function () {
            return function (users, favorites) {
                var out = [];
                for (var i = 0; i < favorites.length; i++) {
                    for (var j = 0; j < users.length; j++) {
                        if (users[j].id === favorites[i].id)
                            out.push(users[j]);
                    }
                }
                return out;

        }})
.controller('BookingRequestController', ['$scope','$stateParams', 'BookingRequestFactory', function($scope, $stateParam, BookingRequestFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            
            $scope.showMenu = false;
            $scope.message = "Loading ...";
								   
			$scope.activeRequests = [];	
	
			$scope.getActiveBookingRequestByCustId = function(){};
	
			BookingRequestFactory.getActiveBookingRequestByCustId({custUserid: parseInt($stateParams.custid,10)})
			.then(
				function(response){
					$scope.activeRequests = response.data;					
				},
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
			);
           // $scope.activeRequests = BookingRequestFactory.getActiveBookingRequestByCustId(1);
	/*.query(
			function(response) {
                    $scope.activeRequests = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });								   */
                                    
           $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }]);
