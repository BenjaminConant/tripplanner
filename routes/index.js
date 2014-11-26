var express = require('express');
var router = express.Router();
var models = require('../models');


router.get('/', function(req, res) {
 models.Hotel.find(function(err, hotels) {
   models.Restaurant.find(function(err, restaurants){
   	models.ThingToDo.find(function(err, thingsToDo){
   		res.render('index', { hotels: hotels, restaurants: restaurants, thingsToDo: thingsToDo, title: "Trip Planner" });
   	});
   });
 });
});



// /* GET home page. */
// router.get('/', function(req, res) {
//   res.render('index', { title: 'Trip Planner' });
// });

module.exports = router;
