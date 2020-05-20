var express = require('express'),
	router = express.Router({ mergeParams: true });//shoud have been >>> ' router	= express.Router({mergeParams:true});' but it works for me haha

var Comment = require('../models/comment'),
	// Camp		= require('../models/camp'),
	middleware = require('../middleware');

const comment_controller = require('../controller/comment');


//NEW
router.get('/new', middleware.isLoggedIn, comment_controller.new);

//CREATE
router.post('/', middleware.isLoggedIn, comment_controller.create);

//EDIT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, comment_controller.edit);

//UPDATE
router.put("/:comment_id", comment_controller.update);

//DELETE
router.delete("/:comment_id", middleware.checkCommentOwnership, comment_controller.delete);



module.exports = router;