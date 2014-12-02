var express = require('express');
var router = express.Router();
var models = require('../models');


router.get('/', function(req, res) {



 models.Hotel.find(function(err, hotels) {
   models.Restaurant.find(function(err, restaurants){
   	models.ThingToDo.find(function(err, thingsToDo){
       models.Day.find(function(err, days){
         res.render('index', {days:days, hotels: hotels, restaurants: restaurants, thingsToDo: thingsToDo, title: "Trip Planner" });
       });
   	});
   });
 });
});

router.post('/daytemplate', function(req, res) {
  console.log(req.body.day_number);
  res.render('day', { day_number: req.body.day_number});
});



// /* GET home page. */
// router.get('/', function(req, res) {
//   res.render('index', { title: 'Trip Planner' });
// });

module.exports = router;
