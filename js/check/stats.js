'use strict';

angular.module('initApp')
  .controller('statsController', function ($scope, $rootScope, $location) {
  	if (!$rootScope.readyToCheck){
  		$location.path('/');		
  	}

});