'use strict';
var myWordCloud;
angular.module('initApp')
  .controller('mainController', function ($scope, $rootScope, $location) {
    var url = 'data.csv';
    $rootScope.words = [];
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

      socket.emit('new-user', {user:'name', location:'location'}, function (answer) {});
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

      socket.emit('user-vote', c, function (answer) {});
     
      $rootScope.currentCheck.tuRespuesta = c;
      $rootScope.lastAnswer.answer = c;
      
      $rootScope.currentGame.remaing--;
       if ($rootScope.currentGame.remaing == 0){
          $rootScope.gameFinish = true;
      }
      else {

      }
      $location.path('respuesta');


              for (var i = 0; i < $rootScope.readyToCheck.length; i++) {
                var z = $rootScope.readyToCheck[i];
                if (z.filename === c.filename){
                  z.words.map(function(w){
                     $rootScope.words.map(function(ww){
                       if (w == ww.key){
                         ww.count++;
                         ww.size = ww.count ;
                       }
                     })
                  })

                }
              }
              
                
              

    }
  	d3.csv(url, function(data){
      $rootScope.$apply(function(){
        $rootScope.checks = data;
        $rootScope.readyToCheck = [];
        data.map(function(d,i){
            d.votes = 0;
            d.order = i;
            d.percentage = 0;
            d.words = d.tags.split(',').map(function(tag){
              tag = tag.replace('#','').trim();
              if (tag != ''){
                $rootScope.words.push(tag);
              }
              return tag;
            });
            
            $rootScope.readyToCheck.push(d);

        });
        
        $rootScope.words= d3.nest()
              .key(function(d) {
                return d;
              })
              .entries($rootScope.words);
       $rootScope.words = $rootScope.words.map(function(w){
         w.count = 0;
         w.size = 0;
         w.text = w.key;
         return w;
       });

      });
    });

});