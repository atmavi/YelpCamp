var Camp	= require("../models/camp"),
	Comment	= require("../models/comment");

//middleware

var middlewareObj={};


middlewareObj.isLoggedIn= function (req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "Please login to continue");
	res.redirect('/login');
};

middlewareObj.checkCommentOwnership= function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, (err, fComment)=>{
			if(fComment.author.id.equals(req.user._id)){
				next();
			}else{
				req.flash("error", "User not authorized ");
				res.redirect("back");
			}
		});
	}else{
		req.flash("error", "Please login to continue");
		res.render("login");
	}
};

middlewareObj.checkCampOwnership=function(req, res, next){
	if(req.isAuthenticated()){
		Camp.findById(req.params.id, (err, fCamp)=>{
			if(fCamp.author.id.equals(req.user._id)){
				next();
			}else{
				req.flash("error", "You are not authorized to edit this post.");
				res.redirect("back");
			}
		});
	}else{
		req.flash("error", "Please login to continue");
		res.render("login");
	}
};

module.exports= middlewareObj;