var express = require("express");
var app = express();

app.use(express.static('public'));
app.set("view engine", "ejs");

app.get('/', function(req, res){
  res.render('index');
});

app.get('/rsvp', function(req, res){
  res.render('rsvp');
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