var express = require('express');
var router = express.Router();
var model = require('../models/index');

/* GET days listing. */
router.get('/', function(req, res) {


  res.send('respond with a resource');
});

router.get('/:id', function(req, res) {


  res.send('respond with a resource');
});

router.post('/:id/attractions', function(req, res) {


  model.Day.findOne( { day_number :req.params.id }, function(err, day){

    var attraction_type = req.body.attraction_type,
    attraction_id = req.body.attraction_id,
    attraction_name = req.body.attraction_name,
    attraction_coord = req.body['attraction_coord[]'];
    console.log(req.body['attraction_coord[]']);

    if(!day){
      model.Day.create({ day_number:req.params.id }, function(err, newDay){
        newDay[attraction_type].push({id:attraction_id, name:attraction_name, coord: attraction_coord});
        newDay.save();
        res.json(newDay);
      });
    }
    else {
      day[attraction_type].push({id:attraction_id, name:attraction_name, coord: attraction_coord});
      day.save();
      res.json(day);
    }
  });
});

router.post('/:id/del_attractions', function(req, res) {
  model.Day.findOne( { day_number :req.params.id }, function(err, day){

    var hotels = [];
    day.hotels.forEach(function(el, index, array) {
      if(el.id !== req.body.attraction_id) {
        hotels.push(el);
      }
    });
    day.hotels = hotels;

    var restaurants = [];
    day.restaurants.forEach(function(el, index, array) {
      if(el.id !== req.body.attraction_id) {
        restaurants.push(el);
      }
    });
    day.restaurants = restaurants;

    var thingsToDos = [];
    day.thingsToDos.forEach(function(el, index, array) {
      if(el.id !== req.body.attraction_id) {
        thingsToDos.push(el);
      }
    });
    day.thingsToDos = thingsToDos;

    day.save();
    res.json(day);
  });
});

router.put('/:id', function(req, res) {


  res.send('respond with a resource');
});



module.exports = router;
