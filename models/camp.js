var mongoose=require('mongoose');
//var Comment=require('./models/comment');

var campSchema= new mongoose.Schema({
	name: String,
	price: String,
	img: String,
	desc:String,
	author:{
		id:mongoose.Schema.Types.ObjectId,
		username: String
	},
	comments:[
		{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment"
		}
	]
});

module.exports= mongoose.model("Camp", campSchema);