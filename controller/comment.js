const Comment = require('../models/comment');
const Camp = require('../models/camp');

//NEW COMMENT 
exports.new = (req, res) => {
   Camp.findById(req.params.id, (err, fCamp) => {
      if (err) {
         res.render('user/index');
         console.log(err);
      } else {
         res.render('comments/new', { fCamp: fCamp });
      }
   });
}

//CREATE COMMENT
exports.create = (req, res) => {
   Camp.findById(req.params.id, (err, fCamp) => {
      if (err) {
         console.log(err);
      } else {
         Comment.create(req.body.comment, (err, comment) => {
            if (err) {
               console.log(err);
            } else {
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               comment.save();
               fCamp.comments.push(comment);
               fCamp.save();
               req.flash("success", "Comment successfully added.");
               res.redirect("/index/" + fCamp._id);
            }
         });
      }
   });
}

//EDIT
exports.edit = (req, res) => {
   Comment.findById(req.params.comment_id, (err, fComment) => {
      console.log(fComment);
      if (err) {
         res.redirect("back");
      } else {
         res.render("comments/edit", { campId: req.params.id, comment: fComment });
      }
   });
}

//UPDATE
exports.update = (req, res) => {
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, comment) => {
      if (err) {
         req.flash("error", "Something went wrong");
         res.redirect("back");
      } else {
         req.flash("success", "Comment successfully updated.");
         res.redirect("/index/" + req.params.id);
      }
   });
}

exports.delete = (req, res) => {
   Comment.findByIdAndRemove(req.params.comment_id, (err, fComment) => {
      if (err) {
         req.flash("error", "something went wrong");
         res.redirect("back");
      } else {
         req.flash("success", "comment has been deleted!");
         res.redirect("/index/" + req.params.id);
      }
   });
}


