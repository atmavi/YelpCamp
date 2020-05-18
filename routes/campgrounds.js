const express = require('express'),
	router = express.Router(),
	Camp = require('../models/camp'),
	middleware = require('../middleware');

const getAllCamps = require('../controller/camps')

// import { getAllCamps, addCamp, updateCamp, deleteCamp } from '../controller/camps';

//INDEX
router.get("/", getAllCamps);


//CREATE
router.post("/", middleware.isLoggedIn, addCamp);

//SHOW
router.get("/:id", showCamp);

//UPDATE
router.put("/:id", updateCamp);

//DELETE
router.delete("/:id", middleware.checkCampOwnership, deleteCamp);

module.exports = router;
