'use strict';

angular.module('initApp')
  .controller('endController', function ($scope, $rootScope, $location) {
  	if (!$rootScope.readyToCheck){
  		$location.path('/');		
  	}
  	setTimeout(function(){
//Create a new instance of the word cloud visualisation.
myWordCloud = wordCloud('.word-cloud');
//Start cycling through the demo data
var totalWords=0;
              $rootScope.words.map(function(w){
                totalWords +=w.count;
              })
               $rootScope.words.map(function(w){
                 var p = w.count * 100 / totalWords
                 w.fontSize = p* 100/20;
               });
              myWordCloud.update($rootScope.words.filter(word => word.size > 0))
              
},2000);

  	
});