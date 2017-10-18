var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/wedding_rsvps", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set("view engine", "ejs");


// SCHEMA SETUP
var guestSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    attending: Boolean,
    number_attending: Number
});

var Guest = mongoose.model("Guest", guestSchema);

// Guest.create({
//     first_name: 'Glenda',
//     last_name: 'Bland',
//     attending: false,
// },function(err, guest){
//     if(err){
//         console.log(err);
//     } else{
//         console.log(guest);
//     }
// });

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

app.get('/guest-list', function(req, res){
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

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})