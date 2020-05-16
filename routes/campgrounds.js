const express = require('express'),
	router = express.Router(),
	Camp = require('../models/camp'),
	middleware = require('../middleware');

//INDEX
router.get("/", function (req, res) {
	Camp.find({}, function (err, allCamps) {
		if (err) {
			console.log(err);
		} else {
			res.json(allCamps);
		}
	});

});

//NEW
router.get("/new", middleware.isLoggedIn, function (req, res) {
	res.render("camps/new");
});

//CREATE
router.post("/", middleware.isLoggedIn, function (req, res) {
	let { name, price, image, description } = req.body;
	// let name = req.body.name;
	// let price = req.body.price;
	// let image = req.body.image;
	// let description = req.body.description;

	let { _id, username } = req.user;
	let author = {
		id: _id,
		username: username
	};

	let newCamp = { name: name, price: price, img: image, desc: description, author: author };
	Camp.create(newCamp, function (err, camp) {
		if (err) {
			console.log(err);
		} else {
			req.flash("success", "Camp successfully created.");
			res.redirect("/index");
		}
	});
});

//SHOW
router.get("/:id", function (req, res) {
	let id = req.params.id;
	Camp.findById(id).populate("comments").exec(function (err, foundCamp) {
		if (err) {
			console.log(err);
		} else {
			res.render(foundCamp);
		}
	});
});

//EDIT
router.get("/:id/edit", middleware.checkCampOwnership, (req, res) => {
	Camp.findById(req.params.id, (err, fCamp) => {
		if (err) {
			res.render("index");
		} else {
			res.render("camps/edit", { fCamp: fCamp });
		}
	});
});

//UPDATE
router.put("/:id", (req, res) => {
	Camp.findByIdAndUpdate(req.params.id, req.body.camp, (err, camp) => {
		console.log(camp);
		if (err) {
			res.render("index");
		} else {
			req.flash("success", "Camp successfully updated.");
			res.redirect("/index/" + req.params.id);
		}
	});
});

//DELETE
router.delete("/:id", middleware.checkCampOwnership, (req, res) => {
	Camp.findByIdAndRemove(req.params.id, (err) => {
		if (err) {
			res.render("index");
		} else {
			req.flash("success", "Camp successfully deleted.");
			res.redirect("/index");
		}
	});
});

module.exports = router;
