var mongoose	=require('mongoose');
var Camp		=require('./models/camp');
var Comment		=require('./models/comment');


var campsData=[
	{
		name:"Green Grass",
		img:"https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg",
		desc:"Quisque porta fringilla finibus. Integer quis nunc vitae enim sollicitudin egestas ac vel lorem. Mauris volutpat pellentesque consequat. Phasellus tempor justo sed mi accumsan, in consequat mi condimentum. In in eleifend mauris. Nam et porta elit, et convallis nibh. Phasellus eu dictum quam. Duis erat odio, egestas sed tellus eget, volutpat vestibulum nisl. Nullam id pulvinar ligula, pellentesque fermentum metus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris feugiat pharetra lorem, ut ultrices ipsum egestas ut. Nulla at luctus ipsum. Duis facilisis tortor facilisis, maximus ex at, viverra lectus."
	},
	{
		name:"Sandy Cover",
		img:"https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg",
		desc:"Fusce pharetra sed enim sit amet ultricies. Vivamus pellentesque efficitur neque, a fringilla libero laoreet vitae. Nullam sem mauris, blandit ac diam eget, varius scelerisque libero. Nulla posuere laoreet ante sit amet vehicula. Quisque ullamcorper neque lorem, quis tempus justo laoreet sit amet. Quisque tristique sit amet erat a imperdiet. Fusce non erat dolor."
	},
	{
		name:"Giants Den",
		img:"https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg",
		desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam molestie magna turpis, vitae porttitor augue sodales id. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus eu ante enim. Maecenas eu bibendum nunc. Praesent vel diam viverra, suscipit orci et, hendrerit justo. Quisque accumsan aliquet convallis. In tincidunt augue sed odio tincidunt commodo. Pellentesque varius laoreet mi sit amet fringilla. Donec metus risus, lobortis in consectetur eget, dapibus id neque."
	},
];

function seedDB(){
	//REMOVE ALL COMMENTS
	Comment.remove({},(err)=>{
		if(err){
			console.log(err);
		}else{
			console.log("Comments have been deleted");
		}
	});
	//REMOVE ALL CAMPS
	Camp.remove({}, (err)=>{
		if(err){
			console.log(err);
		}else{
			console.log("Removed All the Camps.");
			//ADD 
			campsData.forEach((camp)=>{
				Camp.create(camp,(err, loopCamp)=>{
					if(err){
						console.log(err);
					}else{
						console.log('Camp has been added.');
						//ADD COMMENT
						Comment.create({
							text:"Nice place, I will surely go back here.",
							author:"Juan Kalipe"
						},(err,comment)=>{
							if(err){
								console.log(err);
							}else{
								loopCamp.comments.push(comment);
								loopCamp.save();
								console.log("Comment has been added.");
							}
						});
					}
				});
			});
		}
	});
	
}

module.exports= seedDB;