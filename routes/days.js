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
        attraction_name = req.body.attraction_name

    if(!day){
      model.Day.create({ day_number:req.params.id }, function(err, newDay){
        newDay[attraction_type].push({id:attraction_id, name:attraction_name});
        newDay.save();
        res.json(200, newDay);
      });
    }
    else {
      day[attraction_type].push({id:attraction_id, name:attraction_name});
      day.save();
      res.json(200, day);
    }
  });
});

router.put('/:id', function(req, res) {


  res.send('respond with a resource');
});



module.exports = router;
