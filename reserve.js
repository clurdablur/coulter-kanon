var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/guest_app", {useMongoClient: true});


var guestSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    attending: Boolean,
    number_attending: Number
});

var Guest = mongoose.model("Guest", guestSchema);

// var claire = new Guest({
//     name: "Heather",
//     attending: true,
//     number_in_party: 2
// });

// claire.save(function(err, guest){
//     if(err){
//         console.log("SOMETHING WENT WRONG!!");
//     } else {
//         console.log("WE JUST SAVED A GUEST TO THE DB");
//         console.log(guest);
//     }
// });

Guest.create({
    first_name: 'Victoria',
    last_name: 'Honnell',
    attending: true,
    number_attending: 1
},function(err, guest){
    if(err){
        console.log(err);
    } else{
        console.log(guest);
    }
});

Guest.find({}, function(err, guests){
    if(err){
        console.log("OH NO, ERROR!");
        console.log(err);
    } else{
        console.log(guests);
    }
});