var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    Guest = require("./models/guest"),
    User = require("./models/user")

mongoose.connect("mongodb://localhost/wedding_rsvps", {useMongoClient: true});
//mongoose.connect("mongodb://claire:Andrew93@ds125255.mlab.com:25255/wedding_rsvps");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set("view engine", "ejs");

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: 'Andrew loves Ericka!',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', function(req, res){
  res.render('index');
});

app.get('/rsvp', function(req, res){
  res.render('rsvp');
});

app.post('/rsvp', function(req, res){
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var attending = req.body.attending;
    var number_attending = req.body.number_attending;
    var newGuest = {first_name: first_name, last_name: last_name, attending: attending, number_attending: number_attending}
    // Create a new guest and save to DB
    Guest.create(newGuest, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect('/rsvp');
        }
    });
});

app.get('/guest-list', isLoggedIn, function(req, res){
    // Get all guests from DB
    Guest.find({}, function(err, guests){
        if(err){
            console.log(err);
        } else {
            res.render('guests', {guests: guests});
        }
    });
});

app.get('/photos', function(req, res){
  res.render('photos');
});

app.get('/events', function(req, res){
  res.render('events');
});

app.get('/wedding-party', function(req, res){
  res.render('wedding-party');
});

app.get('/travel', function(req, res){
  res.render('travel');
});

app.get('/registry', function(req, res){
  res.render('registry');
});


// AUTH ROUTES
app.get('/register', isLoggedIn, function(req, res){
    res.render('register');
});

app.post('/register', isLoggedIn, function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect('/guest-list');
        });
    });
});

app.get('/login', function(req, res){
    res.render('login');
});

app.post('/login', passport.authenticate("local", 
    {
        successRedirect: "/guest-list",
        failureRedirect: "/login"
    }), function(req, res){
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})