var express = require('express'),
	router = express.Router(),
	passport = require('passport');
User = require('../models/users');

//ROUTES
router.get("/", function (req, res) {
	res.redirect('/index')
});

router.get('/register', (req, res) => {
	res.render('users/register');
});

router.post('/register', (req, res) => {
	User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
		if (err) {
			req.flash("error", err.message);
			return res.redirect("/register");
		}
		req.flash("success", "Account successfully created.");
		res.redirect("/index");
	});
});

//SHOW LOGIN
router.get('/login', (req, res) => {
	res.render('login');
});

router.post('/login', passport.authenticate("local", {
	successRedirect: "/index",
	failureRedirect: "/login"
}), (req, res) => {
});

router.get('/logout', (req, res) => {
	req.logout();
	req.flash("success", "You have been logged out.");
	console.log(req.flash.success);
	res.redirect('/index');
});

module.exports = router;