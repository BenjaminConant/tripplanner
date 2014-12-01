
function initialize_gmaps(dayNumber) {
  var myLatlng = new google.maps.LatLng(40.717223,-73.982284);
  var mapOptions = {
    center: myLatlng,
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  
  // https://cdn2.iconfinder.com/data/icons/picons-essentials/57/checklist-512.png - to do list
  // https://cdn1.iconfinder.com/data/icons/maps-and-locations/16/restaurant-512.png -- rest
  // http://cdn.flaticon.com/png/256/18499.png -- hotels 
  
  var map_canvas_obj = document.getElementById("map-canvas-" + dayNumber);
  var map = new google.maps.Map(map_canvas_obj, mapOptions);
  var markerInfoWindowContent = "<p><strong>Fullstack Academy of code OOOORAHHHH</strong></p>";
  var markerInfoWindow = new google.maps.InfoWindow({
    content: markerInfoWindowContent
  })
  maps[dayNumber] = map;
}

//https://cdn3.iconfinder.com/data/icons/flatforlinux/64/1%20-%20Home.png - hotel
//https://cdn4.iconfinder.com/data/icons/SUPERVISTA/jobs_icons/png/64/chef.png  - rest
//https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/64/Map-Marker-Push-Pin--Right-Pink.png


var maps = {};

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
     for (var i=0; i <= numDays; i++) {
          if (i === day) {
            $("#day"+i+"-content").show();
          } else {
            $("#day"+i+"-content").hide();
          }
        }
     google.maps.event.trigger(maps[day], 'resize');   
  });
  
  $("#day2-btn").click(function(){
     day = 2;
     for (var i=0; i <= numDays; i++) {
          if (i === day) {
            $("#day"+i+"-content").show();
          } else {
            $("#day"+i+"-content").hide();
          }
        }
     google.maps.event.trigger(maps[day], 'resize');
  });
  
  $("#day3-btn").click(function(){
     day = 3;
     for (var i=0; i <= numDays; i++) {
          if (i === day) {
            $("#day"+i+"-content").show();
          } else {
            $("#day"+i+"-content").hide();
          }
        }
     google.maps.event.trigger(maps[day], 'resize');
  });


  $("#btn-hotel").click(function(){
    var select = $('#hotel-select');
    var hotelData = JSON.parse($('option:selected', select).attr('data'));
    var markerInfoWindowContent = "<p><strong>" + hotelData.name +"</strong></p><p>Phone Number: " + hotelData.place[0].phone +"</p><p>Address: "+hotelData.place[0].address+"</p>";
    var lat = hotelData.place[0].location[0];
    var longe = hotelData.place[0].location[1];
    var title = hotelData.name; 
    var hotelIcon = "https://cdn3.iconfinder.com/data/icons/flatforlinux/64/1%20-%20Home.png"; 
    mapPrinter(lat, longe, markerInfoWindowContent, title, hotelIcon, day);
    $("#day"+day+"-content #hotel-list").html("<li>" + title + "</li>");
  });

  $("#btn-thing-to-do").click(function(){
    var select = $('#thing-to-do-select');
    var thingData = JSON.parse($('option:selected', select).attr('data'));
    var markerInfoWindowContent = "<p><strong>" + thingData.name +"</strong></p><p>Phone Number: "+ thingData.place[0].phone +"</p><p>Address: "+thingData.place[0].address+"</p>";
    var lat = thingData.place[0].location[0];
    var longe = thingData.place[0].location[1];
    var title = thingData.name; 
    var thingIcon = "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/64/Map-Marker-Push-Pin--Right-Pink.png";
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
    var restIcon = "https://cdn4.iconfinder.com/data/icons/REALVISTA/food/png/64/french_fries.png";
    mapPrinter(lat, longe, markerInfoWindowContent, title, restIcon, day);
    $("#day"+day+"-content #restaurant-list").append("<li>" + title + "</li>");
  });

  $('#add-day').click(function(){
    numDays++;
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
       day = numDays;
       $("#day"+numDays+"-content").show();
       google.maps.event.trigger(maps[day], 'resize');
       
       for (var i=0; i <= numDays; i++) {
          if (i === day) {
            $("#day"+i+"-content").show();
          } else {
            $("#day"+i+"-content").hide();
          }
       }
     });

    $('#day'+numDays+'-btn').click(function(){
      if($(this).hasClass('btn-default')){
        $(this).removeClass('btn-default').addClass("btn-primary").siblings().removeClass("btn-primary").addClass("btn-default");
      }
    });
  });

});
