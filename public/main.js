
function initialize_gmaps(dayNumber) {
  var myLatlng = new google.maps.LatLng(40.717223,-73.982284);
  var mapOptions = {
    center: myLatlng,
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map_canvas_obj = document.getElementById("map-canvas-" + dayNumber);
  var map = new google.maps.Map(map_canvas_obj, mapOptions);
  var markerInfoWindowContent = "<p><strong>Fullstack Academy of code OOOORAHHHH</strong></p>";
  var markerInfoWindow = new google.maps.InfoWindow({
    content: markerInfoWindowContent
  })
  maps[dayNumber] = map;
}


var showDay = function(dayToShow, numDays) {
 for (var i=0; i <= numDays; i++) {
      if (i === dayToShow) {
        $("#day"+i+"-content").show();
      } else {
        $("#day"+i+"-content").hide();
      }
    }
 google.maps.event.trigger(maps[dayToShow], 'resize');
}

var mapPrinter = function (locationLat, locationLong, windowContent, title, icon, day){
  var newLatlng = new google.maps.LatLng(locationLat, locationLong);

  var markerInfoWindow = new google.maps.InfoWindow({
    content: windowContent
  })
  var newMarker = new google.maps.Marker({
    position: newLatlng,
    title: title,
    icon: icon
  });
  google.maps.event.addListener(newMarker, 'click', function(){
    markerInfoWindow.open(maps[day], newMarker)
  })
  newMarker.setMap(maps[day]);

  markers.push(newMarker);
}

var maps;
var markers;
var currentDay;

$(document).ready(function() {
  currentDay = 1;
  maps = {};
  markers = [];


  // Hide other days than first one
  for(var i =2; i <= numDays; i++){
    $("#day"+i+"-content").hide();
  }

  // Init a map for each day
  for(var i =1; i <= numDays; i++){
    initialize_gmaps(i);
    rebuildMarkers(days[i-1]);
  }

  // Day selector button event
  $("#daysBtnGroup").delegate( "button", "click", function() {

    if($(this).hasClass('btn-default')){
      $(this).removeClass('btn-default').addClass("btn-primary").siblings().removeClass("btn-primary").addClass("btn-default");
    }

    currentDay = $(this).attr("id");
    showDay(currentDay, numDays);
  });


  // Delete button event
  $("body").delegate( "span", "click", function() {

    // remove from UL
    $(this).parent().remove();

    // get the id somehow
    var post_data = {
      attraction_id: $(this).attr('data')
    };

    var post_callback = function (responseData) {
      mapDeleter();
      rebuildMarkers(responseData);
    };

    // jQuery Ajax call
    $.post( "/days/" + currentDay + "/del_attractions", post_data, post_callback);

  });

  // Add button events
  $("#btn-hotel").click(function(){
    var select = $('#hotel-select'),
        hotelData = JSON.parse($('option:selected', select).attr('data')),
        lat = hotelData.place[0].location[0],
        longe = hotelData.place[0].location[1],
        title = hotelData.name,
        id = hotelData._id,
        location = hotelData.place[0].location;

    // Add marker
    var markerInfoWindowContent = "<p><strong>" + hotelData.name +"</strong></p><p>Phone Number: " + hotelData.place[0].phone +"</p><p>Address: "+hotelData.place[0].address+"</p>";
    var hotelIcon = "https://cdn3.iconfinder.com/data/icons/flatforlinux/64/1%20-%20Home.png";
    mapPrinter(lat, longe, markerInfoWindowContent, title, hotelIcon, currentDay);

    // Add to list of hotel
    $("#day"+currentDay+"-content #hotel-list").html("<li>" + title + "<span data="+id+" id='trash-can-"+(markers.length-1)+"' class='glyphicon glyphicon-trash pull-right'></span></li>");

    //setDeleteEvent(markers.length-1);

    // Save to DB
    writeVisitToServer(hotelData._id, currentDay, 'hotels', title, location)
  });

  $("#btn-thing-to-do").click(function(){
    var select = $('#thing-to-do-select'),
        thingData = JSON.parse($('option:selected', select).attr('data')),
        lat = thingData.place[0].location[0],
        longe = thingData.place[0].location[1],
        title = thingData.name,
        id = thingData._id,
        location = thingData.place[0].location;

    // Add marker
    var markerInfoWindowContent = "<p><strong>" + thingData.name +"</strong></p><p>Phone Number: "+ thingData.place[0].phone +"</p><p>Address: "+thingData.place[0].address+"</p>";
    var thingIcon = "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/64/Map-Marker-Push-Pin--Right-Pink.png";
    mapPrinter(lat, longe, markerInfoWindowContent, title, thingIcon, currentDay);

    // Add to list of things to do
    $("#day"+currentDay+"-content #thing-to-do-list").append("<li>" + title + "<span data="+id+" id='trash-can-"+(markers.length-1)+"' class='glyphicon glyphicon-trash pull-right'></span></li>");

    //setDeleteEvent(markers.length-1);

    // Save to DB
    writeVisitToServer(thingData._id, currentDay, 'thingsToDos', title, location);
  });

  $("#btn-restaurant").click(function(){
    var select = $('#restaurant-select'),
        restData = JSON.parse($('option:selected', select).attr('data')),
        lat = restData.place[0].location[0],
        longe = restData.place[0].location[1],
        title = restData.name,
        id = restData._id,
        location = restData.place[0].location;

    // Add marker
    var restIcon = "https://cdn4.iconfinder.com/data/icons/REALVISTA/food/png/64/french_fries.png";
    var markerInfoWindowContent = "<p><strong>" + restData.name +"</strong></p><p>Phone Number: "+ restData.place[0].phone +"</p><p>Address: "+restData.place[0].address+"</p>";
    mapPrinter(lat, longe, markerInfoWindowContent, title, restIcon, currentDay);

    // Add to list of restaurant
    $("#day"+currentDay+"-content #restaurant-list").append("<li>" + title + "<span data="+id+" id='trash-can-"+(markers.length-1)+"' class='glyphicon glyphicon-trash pull-right'></span></li>");

    //setDeleteEvent(markers.length-1);

    // Save to DB
    writeVisitToServer(restData._id, currentDay, 'restaurants', title, location);
  });

  $('#add-day').click(function(){
    numDays++;

    var thisDay = numDays;

    $('#daysBtnGroup').append('<button id="day'+numDays+'-btn" type="button" class="btn btn-default">Day '+ numDays +'</button>');
    var dayTemplate = $('#day1-content').clone();
    newDay = dayTemplate.attr("id", "day"+numDays+"-content")
    $('#day-container').append(newDay);
    $("#day"+numDays+"-content #plan-day-number").text(''+numDays);
    $("#day"+numDays+"-content #plan-day-number").text(''+numDays);
    $("#day"+numDays+"-content #map-canvas-1").attr("id", "map-canvas-"+numDays);
    $("#day"+numDays+"-content #hotel-list").html('');
    $("#day"+numDays+"-content #thing-to-do-list").html('');
    $("#day"+numDays+"-content #restaurant-list").html('');
    $("#day"+numDays+"-content").hide();
    initialize_gmaps(numDays);

    $('#day'+numDays+'-btn').click( function(){
      currentDay = thisDay;
      showDay(currentDay, numDays);
    });

    $('#day'+thisDay+'-btn').click(function(){
      if($(this).hasClass('btn-default')){
        $(this).removeClass('btn-default').addClass("btn-primary").siblings().removeClass("btn-primary").addClass("btn-default");
      }
    });
  });

});

function mapDeleter() {
  for (var i = 0; i < markers.length ; i++) {
    markers[i].setMap(null);
    markers = [];
  }
}

function rebuildMarkers(responseData) {

  // add objects markers
  var hotelsArray = responseData.hotels,
      restArray = responseData.restaurants,
      thingsArray = responseData.thingsToDos,
      coordArray = [];

  hotelsArray.forEach(function(element, index, array) {
    element.coord.push("https://cdn3.iconfinder.com/data/icons/flatforlinux/64/1%20-%20Home.png");
    coordArray.push(element.coord);
  });

  restArray.forEach(function(element, index, array) {
    element.coord.push("https://cdn4.iconfinder.com/data/icons/REALVISTA/food/png/64/french_fries.png");
    coordArray.push(element.coord);
  });

  thingsArray.forEach(function(element, index, array) {
    element.coord.push("https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/64/Map-Marker-Push-Pin--Right-Pink.png");
    coordArray.push(element.coord);
  });

  coordArray.forEach(function(element, index, array) {
    mapPrinter(element[0], element[1], "hello", "hello", element[2], currentDay);
  });
}

function writeVisitToServer(attraction_id, dayId, type_of_place, name, coord) {
  var post_data = {
    attraction_id: attraction_id,
    attraction_type: type_of_place,
    attraction_name: name,
    attraction_coord: coord
  };

  // the callback function below will be called if this request completes successfully.
  // the server's response to this request is passed into this callback function as "responseData"

  var post_callback = function (responseData) {

    rebuildMarkers(responseData);

    // $.post( "/daytemplate/", responseData, function(responseData){
    //
    //
    // });
  };

  // jQuery Ajax call
  $.post( "/days/" + dayId + "/attractions", post_data, post_callback);
}
