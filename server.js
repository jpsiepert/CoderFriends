var express = require("express"),
	session = require("express-session"),
	bodyParser = require("body-parser"),
	passport = require("passport"),
	GithubStrategy = require("passport-github").Strategy,
	port = 9393,
	GitHubApi = require("github");
	app = express();

app.use(session({secret: "happy-hallowen"}));

app.use(passport.initialize());

app.use(passport.session());

app.use(express.static(__dirname + "/public/"));

var user = {};

var requireAuth = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(403).end();
  }
  return next();
}


var github = new GitHubApi({
    // required
    version: "3.0.0",
});
	

passport.use(new GithubStrategy({
	clientID: "304367421a982a3931aa",
    clientSecret: "8e5859cce1447cbdaa1447d573622734d3c98919",
    callbackURL: "http://localhost:9393/auth/github/callback"
  }, function(accessToken, refreshToken, profile, done) {
  	console.log("token")
    process.nextTick(function () {
    user = profile;
    console.log(user)
      // To keep the example simple, the user's GitHub profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the GitHub account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }));

app.get("/auth/github", passport.authenticate("github"));

app.get("/auth/github/callback", passport.authenticate("github", {
	failureRedirect: "/#/main",
}), function(req, res){
	console.log("this is my user, ", req.user);
	res.redirect("/#/home")                    
})
passport.serializeUser(function(user, done){
	done(null, user)
});

passport.deserializeUser(function(obj, done){
	done(null, obj)
})


app.get("/api/github/following", requireAuth, function(req, res){
  console.log(user.username)
github.user.getFollowingFromUser({
    user: "jpsiepert"
}, function(err, response) {
  //console.log(JSON.stringify(response));

    res.status(200).send(response)
  });
})

// app.get("/api/github/following", function(req, res){
// 			//console.log("this is my, ", req.user.username)

// 	github.user.getFollowingFromUser({
//     user: "jpsiepert"
// }, function(err, res) {
//     console.log("these are my followers, ", JSON.stringify(res));
//     console.log("this is an error, ", err)
//     //return JSON.stringify(res);
    
// });
// 	// return res.send("SOMETHING");
// 	// return JSON.stringify(res);
//   res.status(200).JSON(response)
	
// }) 

app.listen(port, function(){
	console.log("Happy Halloween from, " + port)
})