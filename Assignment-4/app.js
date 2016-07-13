var express = require('express');
var models = require('./app/models');
var passport = require('./app/passport');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session')
var epilogue = require('epilogue');

var app = express();
var ALLOWED_HINTS = 3; //maximum hints allowed for a user

var auth = function(req, res, next){ if (!req.isAuthenticated()) res.send(401); else next(); };

var port = process.env.PORT || 3000; 

app.use(bodyParser.urlencoded({ extended: true }));

// storing user's session info inside the cookie
app.use(cookieSession({ name: 'session', keys: ['key1', 'key2'] })); // session secret
app.use(passport.initialize());
app.use(passport.session());

app.get('/loggedin', function(req, res) { res.send(req.isAuthenticated() ? req.user : '0'); });  // check if user is logged in
app.post('/login', passport.authenticate('local'), function(req, res) { res.send(req.user); }); //login user using passed params

app.use(express.static(__dirname + '/public')); 

// initializing epilogue module with sequelize models
epilogue.initialize({
  app: app,
  sequelize: models.sequelize
});

// defining api end-point using epilogue module. It automatically created GET, POST, PUT and DELETE 
// endpoints from sequelize models
var userResource = epilogue.resource({
  model: models.Users,
  endpoints: ['/users', '/users/:id']
});

var testResource = epilogue.resource({
  model: models.Test,
  endpoints: ['/tests', '/tests/:id']
});

var questionResource = epilogue.resource({
  model: models.Question,
  endpoints: ['/questions', '/questions/:id']
});

var choiceResource = epilogue.resource({
  model: models.Choice,
  endpoints: ['/choices', '/choices/:id']
});

var responseResource = epilogue.resource({
  model: models.Response,
  endpoints: ['/responses', '/responses/:id']
});

var hintRequestResource = epilogue.resource({
  model: models.HintRequest,
  endpoints: ['/hints', '/hints/:id']
});

// get the total hint requests by user
function getHintRequestsCountByUser(uid){
  return models.HintRequest.count({where: { UserId: uid}});
}

// check whether hint request is allowed by counting the existing hint requests and comparing against the maximum hint
// requests available
function allowHintRequest(req, res, next){
    getHintRequestsCountByUser(req.user.id).then(function(count){
      console.log("Hints Count: " + count);
      if(count < ALLOWED_HINTS){
        req.count = count;
        next();
      } else{
        res.status(403).send('HINTS_EXHAUSTED');
      }
    });
}

// check if hints are available for the logged in user
app.get('/hintsAvailable', function(req, res){
  getHintRequestsCountByUser(req.user.id).then(function(count){
      if(count < ALLOWED_HINTS){
        res.send({
          value: true,
          count: ALLOWED_HINTS - count
        })
      } else{
        res.send({
          value: false,
          count: count
        });
      }
  });
})

// get hint for a particular question and choice and response with true or false
app.get('/getHint', allowHintRequest, function(req, res){
  models.Choice.findById(req.query.ChoiceId).then(function(choice){

      var response = false;
      if(choice && choice.get('isAnswer')){
        response = true;
      }
    
      models.HintRequest.create({
        QuestionId: req.query.QuestionId,
        ChoiceId: req.query.ChoiceId,
        UserId: req.user.id,
        correct: response
      }).then(function(){
          res.send({
            correct: response,
            hintsAvailable: {
                value: req.count < (ALLOWED_HINTS - 1),
                count: ALLOWED_HINTS - req.count - 1
            }
          });  
      });
  });
});

require('./app/routes')(app); // configure our routes

var server = app.listen(port, function () {
  console.log('Server listening on port: ' + port);
});