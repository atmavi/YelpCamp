var express					= require('express'),
	request					= require('request'),
	bodyParser				= require('body-parser'),
	Camp					= require('./models/camp'),
	Comment					= require('./models/comment'),
	User					= require('./models/users'),
	seedDB					= require('./seeds'),
	mongoose				= require('mongoose'),
	passport				= require('passport'),
	LocalStrategy			= require('passport-local'),
	passportLocalMongoose	= require('passport-local-mongoose'),
	methodOverride			= require('method-override'),
	flash					= require('connect-flash');

var commentRoute= require('./routes/comments'),
	campRoute= require('./routes/campgrounds'),
	indexRoute= require('./routes/index');

var app= express();
mongoose.connect('mongodb+srv://admin:P@ssword@cluster0-58hdk.mongodb.net/test?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useCreateIndex: true
}).then(()=>{
	console.log("Connected to DB!");
}).catch(err=>{
	console.log("ERROR:"+ err.message);
});

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.set("view engine","ejs");
// seedDB();

app.use(flash());

//CONFIGURE PASSPORT
app.use(require('express-session')({
	secret:"Noknok the Destroyer, Mingming the Pacifista",
	resave:false,
	saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
	res.locals.currentUser	= req.user;
	res.locals.error		= req.flash("error");
	res.locals.success		= req.flash("success");
	next();
});

app.use("/index",campRoute);
app.use("/index/:id/comments",commentRoute);
app.use("/", indexRoute);

app.listen(process.env.PORT||3000, function(){
	console.log("Yelp Camp app has started!");
	
});