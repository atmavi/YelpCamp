const User = require('../models/users');

//REDIRECT 
exports.landingRedirect = (req, res) => {
   res.redirect('/index')
}

//REGISTER FORM 
exports.registerForm = (req, res) => {
   res.render('users/register');
}

//ADD NEW USER
exports.register = (req, res) => {
   User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
      if (err) {
         req.flash("error", err.message);
         return res.redirect("/register");
      }
      req.flash("success", "Account successfully created.");
      res.redirect("/index");
   });
}

// LOGIN FORM
exports.loginForm = (req, res) => {
   res.render('login');
}

//LOGIN 
exports.login = (req, res) => { }