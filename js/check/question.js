'use strict';

angular.module('initApp')
  .controller('questionController', function ($scope, $rootScope, $location) {
  	if (!$rootScope.readyToCheck){
  		$location.path('/');		
  	}

});