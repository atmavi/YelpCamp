const Camp = require('../models/camp');

//ALL CAMPS
exports.getAllCamps = function (req, res) {
   Camp.find({}, function (err, allCamps) {
      if (err) {
         console.log(err);
      } else {
         res.render('camps/index', { camps: allCamps });
      }
   });
}

//NEW CAMP FORM (GET)
exports.newCamp = function (req, res) {
   res.render('camps/new');
}


// ADD CAMP (POST)
exports.addCamp = function (req, res) {
   let { name, price, image, description } = req.body;

   let { _id, username } = req.user;
   let author = {
      id: _id,
      username: username
   };

   let newCamp = {
      name: name,
      price: price,
      img: image,
      desc: description,
      author: author
   };

   Camp.create(newCamp, function (err, camp) {
      if (err) {
         console.log(err);
      } else {
         req.flash("success", "Camp successfully created.");
         res.redirect("/index");
      }
   })
};

//SHOW CAMP
exports.showCamp = function (req, res) {
   let id = req.params.id;
   Camp.findById(id).populate("comments").exec(function (err, foundCamp) {
      if (err) {
         console.log(err);
      } else {
         res.render('camps/show', { fCamp: foundCamp });
      }
   });
}

//EDIT CAMP FORM (GET)
exports.editCamp = function (req, res) {
   res.render('camps/edit');
}


//UPDATE CAMP (PUT)
exports.updateCamp = function (req, res) {
   Camp.findByIdAndUpdate(req.params.id, req.body.camp, (err, camp) => {
      console.log(camp);
      if (err) {
         res.render("index");
      } else {
         req.flash("success", "Camp successfully updated.");
         res.redirect("/index/" + req.params.id);
      }
   });
}

//DELETE CAMP (DELETE)
exports.deleteCamp = function (req, res) {
   Camp.findByIdAndRemove(req.params.id, (err) => {
      if (err) {
         res.render("index");
      } else {
         req.flash("success", "Camp successfully deleted.");
         res.redirect("/index");
      }
   });
}

