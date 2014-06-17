jQuery(function($){
	// $(".overlay2").show();
	var map, pointarray, heatmap, directionsDisplay, directionsService, stepDisplay;
	var markerArray = [];
	function initialize() {

        // heatspot data
        var taxiData = [
        new google.maps.LatLng(43.64678970890272, -79.39536094665527),
        new google.maps.LatLng(43.64678970890272, -79.39536094665527),
        new google.maps.LatLng(43.64678970890272, -79.39536094665527),
        new google.maps.LatLng(43.64678970890272, -79.39536094665527),
        new google.maps.LatLng(43.64678970890272, -79.39536094665527),
        new google.maps.LatLng(43.64678970890272, -79.39536094665527),
        new google.maps.LatLng(43.64678970890272, -79.39536094665527),
        new google.maps.LatLng(43.64678970890272, -79.39536094665527),
        new google.maps.LatLng(43.64678970890272, -79.39536094665527),
        new google.maps.LatLng(43.646, -79.39536094665527),
        new google.maps.LatLng(43.646, -79.39536094665527),
        new google.maps.LatLng(43.646, -79.39536094665527),
        new google.maps.LatLng(43.646, -79.39536094665527),
        new google.maps.LatLng(43.646, -79.39536094665527),
        new google.maps.LatLng(43.646, -79.39536094665527),
        new google.maps.LatLng(43.646, -79.39536094665527),
        new google.maps.LatLng(43.646, -79.39536094665527),
        new google.maps.LatLng(43.646, -79.39536094665527),
        new google.maps.LatLng(43.646, -79.39536094665527),
        new google.maps.LatLng(43.646, -79.39536094665527),
        ]
	    	var mapOptions = {
	      center: new google.maps.LatLng(43.654638 ,-79.382772),
	      zoom: 14
	    	};
	   		var map = new google.maps.Map(document.getElementById("map-canvas"),
	      mapOptions);

	    	var bikeLayer = new google.maps.BicyclingLayer();
	    	bikeLayer.setMap(map);
	      // var trafficLayer = new google.maps.TrafficLayer();
        // trafficLayer.setMap(map);

      	var pointArray = new google.maps.MVCArray(taxiData);

     		heatmap = new google.maps.visualization.HeatmapLayer({
        data: pointArray
      	});
      	heatmap.setMap(map);

      	var infowindow = new google.maps.InfoWindow();
      // alert when click
     		google.maps.event.addListener(map, 'click', function(event) {
        alert('Is this the spot?' + event.latLng);
        taxiData.push("new google.maps.LatLng" + event.latLng);
        // console.log(taxiData);
        });
     	// directions services
     	  directionsService = new google.maps.DirectionsService();
     	  var rendererOptions = {
    		map: map
  			};
  			directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions)

  // Instantiate an info window to hold step text.
  			stepDisplay = new google.maps.InfoWindow();
		};// Close Initialize

function calcRoute() {

  // First, remove any existing markers from the map.
  for (var i = 0; i < markerArray.length; i++) {
    markerArray[i].setMap(null);
  };

  // Now, clear the array itself.
  markerArray = [];

  // Retrieve the start and end locations and create
  // a DirectionsRequest using WALKING directions.
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;
  var request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.BICYCLING
  };
  // Route the directions and pass the response to a
  // function to create markers for each step.
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      var warnings = document.getElementById('warnings_panel');
      warnings.innerHTML = '<b>' + response.routes[0].warnings + '</b>';
      directionsDisplay.setDirections(response);
    }
  });
}; // Close calcRoute

google.maps.event.addDomListener(window, 'load', initialize);

	//show legend
	$(".item2").on("click", function(){
		$("ul.legend").slideToggle(100);
	});

	//open issue submission modal
	$(".item1").on("click", function(){
		$(".overlay1").fadeIn();
	});

	//open help/intro modal
	$(".item3").on("click", function(){
		$(".overlay2").fadeIn();
	});


	var $closeModal = function(){
		$(".overlay").fadeOut();
	};

	$(document).on("keydown", function(e){
		if(e.which == 27) {
			$closeModal();
		}
	});

	$(".overlay").on("click", function(e){
		if($(e.target).hasClass("closeIt")){
			$closeModal();
		}
	});

	$("form.search").on("submit",function(){
	calcRoute();
	});
})