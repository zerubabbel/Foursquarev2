// this function takes the question object returned by the StackOverflow request
// and returns new result to be appended to DOM

var showQuestion2 = function(question){
	//clone our result template code
	var result = $('.templates .place').clone();
	var placeElem = result.find('.place-text a');
	placeElem.attr('href', question.venues.url);
	placeElem.text(question.venues.name);
	return result; 

};





// this function takes the results object from StackOverflow
// and returns the number of results and tags to be appended to DOM

// takes error string and turns it into displayable DOM element


// takes a string of semi-colon separated tags to be searched
// for on StackOverflow


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
		dataType: "jsonp",//use jsonp to avoid cross origin issues
		type: "GET"

	})

	.done(function(result){ //this waits for the ajax to return with a succesful promise object
		console.log(result);
		$.each(result.response, function(index, value){
			var question = showQuestion2(value);
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