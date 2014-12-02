var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tripplanner');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));


var Place, Hotel, Motel, HolidayInn, ThingToDo, Restaurant;
var Schema = mongoose.Schema;



var placeSchema = new Schema({
  address: String,
  city: String,
  state: String,
  phone: String,
  location: [Number, Number]
});

var hotelSchema = new Schema({
  name: String,
  place: [placeSchema],
  num_stars: Number,
  amenities: String
});

var thingToDoSchema = new Schema({
	name: String,
	place: [placeSchema],
	age_range: String
});

var restaurantSchema = new Schema ({
	name: String,
	place: [placeSchema],
	cuisine: String,
	price: Number
});

var daySchema = new Schema ({
  day_number: Number,
  hotels: [hotelSchema],
  restaurant: [restaurantSchema],
  thingsToDo: [thingToDoSchema]
});

Place = mongoose.model('Place', placeSchema);
Hotel = mongoose.model('Hotel', hotelSchema);
ThingToDo = mongoose.model('ThingToDo', thingToDoSchema);
Restaurant = mongoose.model('Restaurant', restaurantSchema);
Day = mongoose.model('Day', daySchema);


module.exports = {"Place": Place, "Hotel": Hotel, "ThingToDo": ThingToDo, "Restaurant": Restaurant};
