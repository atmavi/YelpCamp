const express = require('express'),
	router = express.Router(),

	middleware = require('../middleware');

const camps_controller = require('../controller/camps');

//INDEX
router.get("/", camps_controller.getAllCamps);

//NEW
router.get("/new", camps_controller.newCamp);

//CREATE
router.post("/", middleware.isLoggedIn, camps_controller.addCamp);

//SHOW
router.get("/:id", camps_controller.showCamp);

//EDIT
router.get("/edit");

//UPDATE
router.put("/:id", camps_controller.updateCamp);

//DELETE
router.delete("/:id", middleware.checkCampOwnership, camps_controller.deleteCamp);

module.exports = router;
