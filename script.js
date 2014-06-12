jQuery(function($){
	$(".overlay2").show();

	function initialize() {
	    var mapOptions = {
	      center: new google.maps.LatLng(43.654638 ,-79.382772),
	      zoom: 14
	    };
	    var map = new google.maps.Map(document.getElementById("map-canvas"),
	        mapOptions);

	    var bikeLayer = new google.maps.BicyclingLayer();
	     bikeLayer.setMap(map);

	  }
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


});

