var express = require('express'),
	router = express.Router(),
	passport = require('passport');

const user_controller = require('../controller/index');

//ROUTES
router.get("/", user_controller.landingRedirect);

router.get('/register', user_controller.registerForm);

router.post('/register', user_controller.register);

//SHOW LOGIN
router.get('/login', user_controller.loginForm);

router.post('/login',
	passport.authenticate("local", {
		successRedirect: "/index",
		failureRedirect: "/login"
	}),
	user_controller.login);

router.get('/logout', user_controller.logout);

module.exports = router;