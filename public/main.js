
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
}

var maps;
var numDays;
var currentDay;

$(document).ready(function() {
  numDays = 3;
  currentDay = 1;
  maps = {};

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
     currentDay = 1;
     showDay(currentDay, numDays);
  });
  
  $("#day2-btn").click(function(){
     currentDay = 2;
    showDay(currentDay, numDays);
  });
  
  $("#day3-btn").click(function(){
    currentDay = 3;
    showDay(currentDay, numDays);
  });


  $("#btn-hotel").click(function(){
    var select = $('#hotel-select');
    var hotelData = JSON.parse($('option:selected', select).attr('data'));
    var markerInfoWindowContent = "<p><strong>" + hotelData.name +"</strong></p><p>Phone Number: " + hotelData.place[0].phone +"</p><p>Address: "+hotelData.place[0].address+"</p>";
    var lat = hotelData.place[0].location[0];
    var longe = hotelData.place[0].location[1];
    var title = hotelData.name; 
    var hotelIcon = "https://cdn3.iconfinder.com/data/icons/flatforlinux/64/1%20-%20Home.png"; 
    mapPrinter(lat, longe, markerInfoWindowContent, title, hotelIcon, currentDay);
    $("#day"+currentDay+"-content #hotel-list").html("<li>" + title + "<span id='trash-can' class='glyphicon glyphicon-trash pull-right'></span></li>");
  });

  $("#btn-thing-to-do").click(function(){
    var select = $('#thing-to-do-select');
    var thingData = JSON.parse($('option:selected', select).attr('data'));
    var markerInfoWindowContent = "<p><strong>" + thingData.name +"</strong></p><p>Phone Number: "+ thingData.place[0].phone +"</p><p>Address: "+thingData.place[0].address+"</p>";
    var lat = thingData.place[0].location[0];
    var longe = thingData.place[0].location[1];
    var title = thingData.name; 
    var thingIcon = "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/64/Map-Marker-Push-Pin--Right-Pink.png";
    mapPrinter(lat, longe, markerInfoWindowContent, title, thingIcon, currentDay);
    $("#day"+currentDay+"-content #thing-to-do-list").append("<li>" + title + "<span id='trash-can' class='glyphicon glyphicon-trash pull-right'></span></li>");
  });

  $("#btn-restaurant").click(function(){
    var select = $('#restaurant-select');
    var restData = JSON.parse($('option:selected', select).attr('data'));
    var markerInfoWindowContent = "<p><strong>" + restData.name +"</strong></p><p>Phone Number: "+ restData.place[0].phone +"</p><p>Address: "+restData.place[0].address+"</p>";
    var lat = restData.place[0].location[0];
    var longe = restData.place[0].location[1];
    var title = restData.name; 
    var restIcon = "https://cdn4.iconfinder.com/data/icons/REALVISTA/food/png/64/french_fries.png";
    mapPrinter(lat, longe, markerInfoWindowContent, title, restIcon, currentDay);
    $("#day"+currentDay+"-content #restaurant-list").append("<li>" + title + "<span id='trash-can' class='glyphicon glyphicon-trash pull-right'></span></li>");
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
