'use strict';

angular.module('initApp')
  .controller('answerController',  function ($scope, $rootScope, $location) {
  	if (!$rootScope.readyToCheck){
  		$location.path('/');		
  	}
   
});