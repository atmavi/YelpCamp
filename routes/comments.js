var express			= require('express'),
	router			= express.Router({mergeParams:true});//shoud have been >>> ' router	= express.Router({mergeParams:true});' but it works for me haha

var Comment 	= require('../models/comment'),
	Camp		= require('../models/camp'),
	middleware	= require('../middleware');


//NEW
router.get('/new', middleware.isLoggedIn, (req, res)=>{
	Camp.findById(req.params.id, (err, fCamp)=>{
		if(err){
			res.render('user/index');
			console.log(err);
		}else{
			res.render('comments/new',{fCamp:fCamp});
		}
	});
});

//CREATE
router.post('/',middleware.isLoggedIn, (req,res)=>{
	Camp.findById(req.params.id, (err, fCamp)=>{
		if(err){
			console.log(err);
		}else{
			Comment.create(req.body.comment,(err, comment)=>{
				if(err){
					console.log(err);
				}else{
					comment.author.id=req.user._id;
					comment.author.username=req.user.username;
					comment.save();
					fCamp.comments.push(comment);
					fCamp.save();
					console.log('Comment created.');
					req.flash("success", "Comment successfully added.");
					res.redirect("/index/"+fCamp._id);
				}
			});
		}
	});
});

//EDIT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res)=>{
	Comment.findById(req.params.comment_id, (err, fComment)=>{
		console.log(fComment);
		if(err){
			res.redirect("back");
		}else{
			res.render("comments/edit", {campId:req.params.id, comment:fComment});
		}
	});
});

//UPDATE
router.put("/:comment_id", (req, res)=>{
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, comment)=>{
		if(err){
			req.flash("error", "Something went wrong");
			res.redirect("back");
		}else{
			req.flash("success", "Comment successfully updated.");
			res.redirect("/index/"+req.params.id);
		}
	});
});

//DELETE
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res)=>{
	Comment.findByIdAndRemove(req.params.comment_id, (err, fComment)=>{
		if(err){
			req.flash("error", "something went wrong");
			res.redirect("back");
		}else{
			req.flash("success", "comment has been deleted!");
			res.redirect("/index/"+req.params.id);
		}
	});
});



module.exports= router;