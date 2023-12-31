const session = require("express-session")
const path = require("path");
require("dotenv").config();
const express = require('express');
const partials = require('express-partials');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy

const app = express();

const PORT = 3000;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

// Initialize the session
app.use(session({
	secret: 'codecademy', resave: false, saveUnitialized: false
}))

// Passport Configurations
passport.use(new GitHubStrategy({
	clientID: process.env.GITHUB_CLIENT_ID,
	clientSecret: process.env.GITHUB_CLIENT_SECRET,
	callbackURL: "http://localhost:3000/auth/github/callback",
},
	function (accessToken, refreshToken, profile, done) {	// find the user
		return done(null, profile);
	}));

// To facilitate login sessions, Passport serializes and deserializes user instances to and from the session. 
passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});


//  initialize Passport
app.use(passport.initialize());
// configure app to use Passport Session
app.use(passport.session());


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(partials());
app.use(express.json());
app.use(express.static(__dirname + '/public'));


// Routes
app.get('/', (req, res) => {
	res.render('index', { user: req.user });
})

app.get('/account',
	ensureAuthenticated,
	(req, res) => {
		res.render('account', { user: req.user });
	});

app.get('/login', (req, res) => {
	res.render('login', { user: req.user });
})

app.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

// Protected route
app.get('/auth/github',
	passport.authenticate(
		'github',
		{ scope: ['user'] }
	)
)

// This is where GitHub will redirect after a user authorizes it (or does not)
app.get('/auth/github/callback',
	passport.authenticate(
		'github',
		{
			successRedirect: '/login',
			failureRedirect: '/'
		}
	)
)


// Listener
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

// ensureAuthenticated Callback Function
function ensureAuthenticated(req, res, next) {
	// console.log(req.isAuthenticated())
	return req.isAuthenticated() ? next() : res.redirect('/login')
}
