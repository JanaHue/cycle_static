jQuery(function($){
	$(".overlay2").show();
	var map, pointarray, heatmap, directionsDisplay, directionsService, stepDisplay;
	var markerArray = [];
	function initialize() {

	    	var mapOptions = {
	      center: new google.maps.LatLng(43.654638 ,-79.382772),
	      zoom: 14
	    	};
	   		var map = new google.maps.Map(document.getElementById("map-canvas"),
	      mapOptions);

	    	var bikeLayer = new google.maps.BicyclingLayer();
	    	bikeLayer.setMap(map);

        $.ajax({
            url: "_drupal/api/hot_spot.json",
            dataType: "json",
            success: function(data) {
                var yieldPoints = [];
                for(i=0; i < data.length; i++) {
                    yieldPoints[i] = { location: new google.maps.LatLng(data[i].lat, data[i].long) };
                }
                var heatMap = new google.maps.visualization.HeatmapLayer({ data: yieldPoints });
                heatMap.setMap(map);
            }
        });

        $("form.options").on("submit", function(e){
          var obstacle = $("select.obstacle").val();
          var time = $( "select.time" ).val();
          e.preventDefault();
          // alert when click
       		var makeClickable = google.maps.event.addListener(map, 'click', function(event) {
            var cc = confirm('Is this the spot?' + event.latLng);
            console.log(event.latLng);
            var lat = event.latLng['k'];
            var lon = event.latLng['A'];
            if (cc == true) {
              var nodeData = {
                 title: "spot 4",
                 type: "hot_spots",
                 field_lat: {
                   und: [
                   {
                     value: lat,
                   }
                   ]
                 },
                 field_long: {
                   und: [
                   {
                     value: lon,
                   }
                   ]
                 }
               };
               $.ajax({
                 url: "_drupal/api/node.json",
                 dataType: "json",
                 type: "POST",
                 data: nodeData,
                 success: function(data){
                  alert("thanks");
                 }
               });
              google.maps.event.clearInstanceListeners(map);
              document.getElementById("options").reset();
            } else {
              $("select.obstacle").val(obstacle);
              $("select.time").val(time);
              $(".overlay1").fadeIn();
            };
          });
        });

     	  // directions services
     	  directionsService = new google.maps.DirectionsService();
     	  var rendererOptions = {
    		map: map
  			};
  			directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions)

        // Autocomplete
        var input = /** @type {HTMLInputElement} */(
        document.getElementById('start'));
        var autocomplete = new google.maps.places.Autocomplete(input);
        var input2 = (document.getElementById('end'));

        var autocomplete2 = new google.maps.places.Autocomplete(input2);
        google.maps.event.addListener(autocomplete, function() {
         return;
        });
        google.maps.event.addListener(autocomplete2, 'place_changed', function() {
        return;
        });

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
    document.getElementById("options").reset();
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

	$("form.search").on("submit",function(e){
    e.preventDefault();
	  calcRoute();
	});

})
