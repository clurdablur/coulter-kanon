var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set("view engine", "ejs");

var guests = [
    {first_name: 'Andrew', last_name: 'Coulter', attending: 'true', number_attending: '2'},
    {first_name: 'Glenda', last_name: 'Bland', attending: 'false', number_attending: ''},
];

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
    guests.push(newGuest);
    res.redirect('/guests');
});

app.get('/guests', function(req, res){
    res.render('guests', {guests: guests});
})

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