// This file contains the logic for tests, questions, recording responses and getting hints from the server
angular.module('TestModule', ['ModelService'])

.filter('yesNo', function() {
    return function(input) {
        return input ? 'yes' : 'no';
    }
})

.controller('IntroController', function($scope, $rootScope){
    $scope.user = $rootScope.user;
})
.controller('QuestionController', function($scope, $rootScope, $stateParams, Questions, Choices, Responses, HintRequests, $state) {
    $scope.questionId =  $stateParams.qid;
    $scope.response = null;
    $scope.hintChoice = null;

    Questions.get($scope.questionId).then(function(result){
        $scope.question = result.data;
        Choices.getQuestionChoices($scope.questionId).then(function(result2){
            $scope.choices = result2.data;
            Responses.getUsersResponseForQuestion($scope.questionId, $rootScope.user.id).then(function(response){
                if(response.data && response.data.length){
                    $scope.response = response.data[0];
                    $scope.userchoice = $scope.choices.filter(function(a){
                        return a.id == response.data[0].ChoiceId;
                    })[0]
                }
            })
        })
    });

    HintRequests.areHintsAvailable().then(function(response){
        $scope.hintsAvailable = response.data;
    });

    //record user response by sending it to node server

    $scope.recordResponse = function(q, c){
        // console.log(qid + cid);
        $scope.userchoice = c;
        var res = {QuestionId: q.id, ChoiceId: c.id, UserId: $rootScope.user.id};
        if($scope.response){
            Responses.editResponse($scope.response.id, res);
        } else{
            Responses.record(res).then(function(response){
                $scope.response = response.data;
            });
        }
    };

    // get hint for a particular question and choice
    $scope.getHint = function(qid, cid){
        if(cid && qid){
            var req = {QuestionId: qid, ChoiceId: cid, UserId: $rootScope.user.id};
            HintRequests.getHint(req).then(function(response){
                console.log(response);
                $scope.hintResponse = response.data.correct;
                $scope.hintsAvailable = response.data.hintsAvailable
            });
        }
    }
    $scope.hintResponse = null;

    $scope.optionColorClass = ["green", "blue", "red", "green", "blue"]
   
})

.controller('TestController', function($scope, $rootScope, $stateParams, Questions, $state) {
	$scope.testId =  $stateParams.tid;

    $scope.setState = function(qIndex){
        $scope.currentQuestionindex = qIndex;
        $state.go('test.question', {qid: $scope.questions[qIndex].id});
    }

    //load next question in the view
    $scope.nextQuestion = function(){
        if($scope.currentQuestionindex < $scope.questions.length - 1){
            $scope.setState($scope.currentQuestionindex + 1);
        }
    }

    //load previous question in the view
    $scope.previousQuestion = function(){
        if($scope.currentQuestionindex > 0){
            $scope.setState($scope.currentQuestionindex - 1);
        }   
    }

    $scope.init = function(questions){
        $scope.questions = questions;
        if(questions.length > 0){
            $scope.setState(0);
        }
    }
	Questions.getTestQuestions($scope.testId).then(function(questions){
	   $scope.init(questions.data);
	});

});