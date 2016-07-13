// this file contains services for server interaction
var modelServices = angular.module('ModelService', []);

modelServices.factory('Questions', [ '$http', '$q', 
    function( $http, $q) {
        var Questions = function(data) {
            angular.extend(this, data);
        };

        // get questions for a particular test
        Questions.getTestQuestions = function(testId) {
            return $http.get('/questions', {
                params:{
                    TestId: testId
                }
            });
        };

        // get question details by question id
        Questions.get = function(qid) {
            return $http.get('/questions/' + qid);
        };


        return Questions;
    }
]);

modelServices.factory('Choices', [ '$http', '$q', 
    function( $http, $q) {
        var Choices = function(data) {
            angular.extend(this, data);
        };

        // get choices for a particular question id
        Choices.getQuestionChoices = function(questionId) {
            return $http.get('/choices', {
                params:{
                    QuestionId: questionId
                }
            });
        };

        // get choice detail from id
        Choices.get = function(qid) {
            return $http.get('/choices/' + qid);
        };


        return Choices;
    }
]);

modelServices.factory('Responses', [ '$http', '$q', 
    function( $http, $q) {
        var Responses = function(data) {
            angular.extend(this, data);
        };

        // retrieve user's response for a particular question from the server
        Responses.getUsersResponseForQuestion = function(qid, uid){
             return $http.get('/responses', {
                params: {
                    QuestionId: qid,
                    UserId: uid,
                    sort: '-updatedAt',
                    count: 1
                }
            });
        }

        // edit user's response for a particular question
        Responses.editResponse = function(rid, response){
            return $http.put('/responses/' + rid, response);
        };

        //record response containing question id and choice
        Responses.record = function(data){
            return $http.post('/responses', data);
        };

        return Responses;
    }
]);

modelServices.factory('HintRequests', [ '$http', '$q', 
    function( $http, $q) {
        var HintRequests = function(data) {
            angular.extend(this, data);
        };

        // check if hint are available to user
        HintRequests.areHintsAvailable = function(){
            return $http.get('/hintsAvailable');
        };

        // record hint requests for a user
        HintRequests.record = function(data){
            return $http.post('/hints', data);
        };

        // get hint for a question
        HintRequests.getHint = function(data){
            return $http.get('/getHint', {
                params: data
            });
        }

        // get all hints requested by a user
        HintRequests.get = function(uid){
            return $http.get('/hints', {
                params: {
                    UserId: uid
                }
            });
        };

        return HintRequests;
    }
]);