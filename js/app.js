

var showPlace = function(question){
	var result = $('.templates .place').clone();
	var placeElem = result.find('.place-text a');
	placeElem.attr('href', question.url);
	placeElem.text(question.name);
	
	var addressElem = result.find ('.address-text');
	addressElem.text(question.location.address + " " +question.location.city + ", " + question.location.state);
	return result; 

};


function getRestaurant(type, city){

	var request = {
		client_id: '5U3LA2OTGUW5P0GTXVKFYGLZQ1WTWURDIF2RTCUJX5K1AS4A',
		client_secret: 'SOJYCO3CWP0I1M0NHXVUC1SWZROMQYHUGHBEA0I43CFLOX5P',
		near: city, 
		query: type,
		v: "20130815"

	};

	$.ajax({
		url: 'https://api.foursquare.com/v2/venues/search',
		data: request, 
		dataType: "jsonp",
		type: "GET"

	})

	.done(function(result){ 
		console.log(result);
		$.each(result.response.venues, function(index, value){
			var question = showPlace(value);
			$('.results').append(question);
		});
		

	})

	.fail(function(jqXHR, error){

		var errorElem = showError(error);
		$('.search-results').append(errorElem);
	});

};



$(document).ready(function(){
	$('.restaurant-getter').submit(function(event){
		event.preventDefault();
		$('.results').html('');
		var type = $(this).find("input[name='type']").val();
		var city = $(this).find("input[name='city']").val();
		getRestaurant(type, city);

	})


});
