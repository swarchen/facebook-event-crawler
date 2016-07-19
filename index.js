
var passport = require('passport');
var FacebookTokenStrategy = require('passport-facebook-token');

passport.use(new FacebookTokenStrategy({
    clientID: '1062375033854296',
    clientSecret: '6aa1832e63974ae2350580922236df94'
  }, function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({facebookId: profile.id}, function (error, user) {
    	console.log(user);
      return done(error, user);
    });
  }
));