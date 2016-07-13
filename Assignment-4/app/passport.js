// This defines strategy for local authentication

var passport = require('passport'),
    models = require('./models'),
    LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy({
    usernameField: 'name',
    passwordField: 'number'
  },
  function(username, password, cb) {
    models.Users.findOne({ 
      where: {
        name: username,
        number: password
      } 
    })
    .then(function(user){
      if (!user) {
        return cb(null, false, { message: 'Incorrect name and number combo.' });
      }
      return cb(null, user);
    });
}));


module.exports = passport;
