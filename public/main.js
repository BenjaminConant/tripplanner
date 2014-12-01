
function initialize_gmaps(dayNumber) {

  // initialize new google maps LatLng object
  var myLatlng = new google.maps.LatLng(40.717223,-73.982284);
  
  // set the map options hash
  var mapOptions = {
    center: myLatlng,
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  // https://cdn2.iconfinder.com/data/icons/picons-essentials/57/checklist-512.png - to do list
  // https://cdn1.iconfinder.com/data/icons/maps-and-locations/16/restaurant-512.png -- rest
  // http://cdn.flaticon.com/png/256/18499.png -- hotels 
  // get the maps div's HTML obj
  var map_canvas_obj = document.getElementById("map-canvas-" + dayNumber);

  // initialize a new Google Map with the options
  var map = new google.maps.Map(map_canvas_obj, mapOptions);

  

  // var beerImage = "http://icons.iconarchive.com/icons/iconshock/real-vista-food/128/beer-icon.png";
  // var hotelIcon = "http://cdn.flaticon.com/png/256/18499.png";
  // var bensHouse = new google.maps.Marker({
  //   position: bensHouse,
  //   title: "Bens House",
  //   icon: beerImage,  
  //   draggable: true,
  // });
  // google.maps.event.addListener(bensHouse, 'click', function() {
  //   benInfoWindow.open(map, bensHouse);
  // } )


  var markerInfoWindowContent = "<p><strong>Fullstack Academy of code OOOORAHHHH</strong></p>";
  var markerInfoWindow = new google.maps.InfoWindow({
    content: markerInfoWindowContent
  })


  maps[dayNumber] = map;


}

var maps = {};




  // type can be hotel, resturant, or thing to do. name is the name of hotel resturant or thing to do.
  var mapPrinter = function (locationLat, locationLong, windowContent, title, icon, day){
    

    var newLatlng = new google.maps.LatLng(locationLat, locationLong);
   
    
    var markerInfoWindow = new google.maps.InfoWindow({
      content: windowContent
    })

    var newMarker = new google.maps.Marker({
      position: newLatlng,
      title: title
    });

    google.maps.event.addListener(newMarker, 'click', function(){
      markerInfoWindow.open(maps[day], newMarker)
    })
    

    newMarker.setMap(maps[day]);



  }



$(document).ready(function() {
  var numDays = 3;
  var day = 1;
  $("#day2-content").hide();
  $("#day3-content").hide();
  initialize_gmaps(1);
  initialize_gmaps(2);
  initialize_gmaps(3);


  $("#daysBtnGroup > button").click(function(){
    if($(this).hasClass('btn-default')){
      $(this).removeClass('btn-default').addClass("btn-primary").siblings().removeClass("btn-primary").addClass("btn-default");
    }
  });


  $("#day1-btn").click( function(){
     day = 1;
     $("#day1-content").show();
     google.maps.event.trigger(maps['1'], 'resize');
     $("#day2-content").hide();
     $("#day3-content").hide();
  });
  $("#day2-btn").click(function(){
     day = 2;
     $("#day2-content").show();
     google.maps.event.trigger(maps['2'], 'resize');
     $("#day1-content").hide();
     $("#day3-content").hide();
  });
  
  $("#day3-btn").click(function(){
     day = 3;
     $("#day3-content").show();
     google.maps.event.trigger(maps['3'], 'resize');
     $("#day2-content").hide();
     $("#day1-content").hide();
  });


  $("#btn-hotel").click(function(){
    var select = $('#hotel-select');
    var hotelData = JSON.parse($('option:selected', select).attr('data'));
    var markerInfoWindowContent = "<p><strong>" + hotelData.name +"</strong></p><p>Phone Number: " + hotelData.place[0].phone +"</p><p>Address: "+hotelData.place[0].address+"</p>";
    var lat = hotelData.place[0].location[0];
    var longe = hotelData.place[0].location[1];
    var title = hotelData.name; 
    var hotelIcon = "http://cdn.flaticon.com/png/256/18499.png";
    
    mapPrinter(lat, longe, markerInfoWindowContent, title, hotelIcon, day);

    $("#day"+day+"-content #hotel-list").append("<li>" + title + "</li>");
  });

  $("#btn-thing-to-do").click(function(){
    var select = $('#thing-to-do-select');
    var thingData = JSON.parse($('option:selected', select).attr('data'));
    var markerInfoWindowContent = "<p><strong>" + thingData.name +"</strong></p><p>Phone Number: "+ thingData.place[0].phone +"</p><p>Address: "+thingData.place[0].address+"</p>";
    var lat = thingData.place[0].location[0];
    var longe = thingData.place[0].location[1];
    var title = thingData.name; 
    var thingIcon = "http://cdn.flaticon.com/png/256/18499.png";

    mapPrinter(lat, longe, markerInfoWindowContent, title, thingIcon, day);

    $("#day"+day+"-content #thing-to-do-list").append("<li>" + title + "</li>");
    
  });

  $("#btn-restaurant").click(function(){
    var select = $('#restaurant-select');
    var restData = JSON.parse($('option:selected', select).attr('data'));
    var markerInfoWindowContent = "<p><strong>" + restData.name +"</strong></p><p>Phone Number: "+ restData.place[0].phone +"</p><p>Address: "+restData.place[0].address+"</p>";
    var lat = restData.place[0].location[0];
    var longe = restData.place[0].location[1];
    var title = restData.name; 
    var restIcon = "http://cdn.flaticon.com/png/256/18499.png";

    mapPrinter(lat, longe, markerInfoWindowContent, title, restIcon, day);

    $("#day"+day+"-content #restaurant-list").append("<li>" + title + "</li>");
    
  });

  $('#add-day').click(function(){
    numDays++;
    $('#daysBtnGroup').append('<button id="day'+numDays+'-btn" type="button" class="btn btn-default">Day '+ numDays +'</button>');
    var dayTemplate = $('#day1-content').clone();
    finalDay = dayTemplate.html().replace("day1-content", "day"+numDays+"-content");

    $('#day-container').append(finalDay);




  })


});
