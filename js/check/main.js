'use strict';

angular.module('initApp')
  .controller('mainController', function ($scope, $rootScope, $location) {
    var url = 'data.csv';

    $rootScope.currentGame = {
      points:0,
      remaing: 5,
    }
    $rootScope.lastAnswer = {
      result : false,
    }
    
    $rootScope.finishGame = function(){
      $rootScope.onQuestion = false;
      $rootScope.onAnswer = false;
      $rootScope.showResume = true;
      $location.path('fin');
    }
    $rootScope.startGame = function(){
      
      $rootScope.gameFinish = false;
       
      var  l = $rootScope.readyToCheck.length;
      var top = l;
      var bottom = 0 
      
      var l1 = shuffle($rootScope.readyToCheck.map(function(m){ return m;}));
      var l2 = shuffle($rootScope.readyToCheck);

      var q = [];
      for(var i = 0; i < l1.length; i++) {
        q.push({
          l: l1[i],
          r: l2[i]
        });
      }

      console.log(q);

      $rootScope.currentGame = {
        points:0,
        remaing: top,
        questions: q,
      }
      $rootScope.currentCheck = $rootScope.currentGame.questions[$rootScope.currentGame.remaing-1];
    
      $rootScope.lastAnswer = {
        result : false,
      }
      $location.path('pregunta');

      
    }
    $rootScope.nextQuestion = function(){
      $rootScope.onQuestion = true;
      $rootScope.onAnswer = false;
      $rootScope.showResume = false;
      $rootScope.currentCheck = $rootScope.currentGame.questions[$rootScope.currentGame.remaing-1];
      $location.path('pregunta');
    }

    $rootScope.responder = function(c){
      var res = $rootScope.currentCheck['Resultado chequeo'];

      $rootScope.currentCheck.tuRespuesta = c;
      $rootScope.lastAnswer.answer = c;
      
      $rootScope.currentGame.remaing--;
       if ($rootScope.currentGame.remaing == 0){
          $rootScope.gameFinish = true;
      }
      else {
        
      }
      $location.path('respuesta');

    }
  	d3.csv(url, function(data){
      $rootScope.$apply(function(){
        $rootScope.checks = data;
        $rootScope.readyToCheck = [];
        data.map(function(d){
            $rootScope.readyToCheck.push(d);
        });
        
       
      });
    });

});