'use strict';

angular.module('initApp')
  .controller('endController', function ($scope, $rootScope, $location) {
  	if (!$rootScope.readyToCheck){
  		$location.path('/');		
  	}


});