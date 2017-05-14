'use strict';

angular.module('serviceLocatorApp.services' , ['ngResource'])
        .constant("baseURL","http://localhost:3000/")
        .service('userFactory', ['$resource', 'baseURL', function($resource,baseURL) {    
    
                return $resource(baseURL + "users/:id", null, {
                    'update': {
                        method: 'PUT'
                    }
                });  
			this.login = function(){};
			this.logout = function(){};
			this.register = function(){};
                        
        }])
        .service('BookingRequestFactory',['$resource', 'baseURL',function($http,baseURL)  {

        this.getBookingRequests = function(){
			//return $http.get(baseURL+"bookingRequests");
               return $resource(baseURL+"bookReqests/:id",null,  {'update':{method:'PUT' }});
                            
        }; 
		
			this.getActiveBookingRequestByCustId = function(index){
				//return $http.get(baseURL+"bookingRequests/"+index);
                  return $resource(baseURL+"bookReqests/:reqid",null,  {'update':{method:'PUT' }});
                            
        }; 
			this.getActiveBookingRequestBySPId = function(index){
                    //return bookingRequests[index];
				//return $http.get(baseURL+"bookingRequests/"+index);
                    return $resource(baseURL+"bookingRequests/:id",null,  {'update':{method:'PUT' }});
                            
        }; 
    
        }])
         .factory('$localStorage', ['$window', function($window) {
          return {
            store: function(key, value) {
              $window.localStorage[key] = value;
            },
            get: function(key, defaultValue) {
              return $window.localStorage[key] || defaultValue;
            },
            storeObject: function(key, value) {
              $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function(key,defaultValue) {
              return JSON.parse($window.localStorage[key] || defaultValue);
            },
            
          }
        }])

;
