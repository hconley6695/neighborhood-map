// import places from  './viewmodel';

var map;

// create new empty array for all places
var markers = [];

var places = [
	{
		name: 'Piedmont Park',
		position: {lat: 33.7901,lng: -84.3696 },
		type: 'parks'
	},

	{
		name: 'Georgia Aquarium',
		position: {lat: 33.7634,lng: -84.3951},
		type: 'attractions'
	},
	{
		name: 'Ponce City Market',
		position: {lat: 33.7719,lng: -84.3665},
		type: 'shopping'
	},
	{
		name: 'Zoo Atlanta',
		position: {lat: 33.7341,lng: -84.3723},
		type: 'attractions'
	},
	{
		name: 'Oakland Cemetary',
		position: {lat: 33.7486,lng: -84.3730},
		type: 'attractions'
	},
	{
		name: 'Centennial Olympic Park',
		position: {lat: 33.7603,lng: -84.3935 },
		type: 'parks'
	},

	{
		name: 'Lenox Square Mall',
		position: {lat: 33.8463,lng: -84.3621},
		type: 'shopping'
	},
	{
		name: 'The Optimist',
		position: {lat: 33.779871,lng: -84.410825},
		type: 'restaurants'
	},
	{
		name: 'Aria',
		position: {lat: 33.838708,lng: -84.371926},
		type: 'restaurants'
	},
	{
		name: 'Local Three Kitchen & Bar',
		position: {lat: 33.844844,lng: -84.427154},
		type: 'restaurants'
	},


]


function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 33.7490, lng: -84.3880},
		zoom: 12
	});

	var largeInfowindow = new google.maps.InfoWindow();

	for (var i = 0; i < places.length; i++) {
		// get the positions of the array of locations from viewmodel.js
		var position = places[i].position;
		// get the name of the array of locations from viewmodel.js
		var name = places[i].name;

		var type = places[i].type;
		// creating a marker for each location
			// map: map,		
			var marker = new google.maps.Marker({
			position: position,
			title: name,
			type: type,
			animation: google.maps.Animation.DROP,
			icon: './images/rsz_1marker-image.png',
			id: i
		});
		// putting all of the markers into the new markers array
		markers.push(marker);
		// when you click each marker, it will show an info window
		marker.addListener('click', function() {
			contentInfoWindow(this, largeInfowindow);
		});

	}

	function contentInfoWindow(marker, infowindow) {

		if (infowindow.marker != marker) {
			infowindow.marker = marker;
			infowindow.setContent('<span>'+ marker.title +'</span>');

			infowindow.open(map, marker);

			infowindow.addListener('closeclick', function() {
				// infowindow.setMarker(null);
			})

		}
	}

	document.getElementById('no-filter').addEventListener('click', showAll);
	document.getElementById('attractions-filter').addEventListener('click', showAttractions);
	document.getElementById('parks-filter').addEventListener('click', showParks);
	document.getElementById('restaurants-filter').addEventListener('click', showRestaurants);
	document.getElementById('shopping-filter').addEventListener('click', showShopping);
	
	function showAll() {

		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
			markers[i].setMap(map);
		}
	}

	function showAttractions() {
		console.log(markers);
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
			if (markers[i].type == 'attractions') {

				markers[i].setMap(map);
			} else {
				document.getElementById('no-possibilities').innerHTML = '<span> There are no results.</span>';
			}
		}
	}

	function showParks() {
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
			if (markers[i].type == 'parks') {

				markers[i].setMap(map);
			} else {
				document.getElementById('no-possibilities').innerHTML = '<span> There are no results.</span>';
			}
		}
	}

	function showRestaurants() {
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
			if (markers[i].type == 'restaurants') {

				markers[i].setMap(map);
			} else {
				document.getElementById('no-possibilities').innerHTML = '<span> There are no results.</span>';
			}
		}
	}

	function showShopping() {

		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
			if (markers[i].type == 'shopping') {
		
				markers[i].setMap(map);
			} else {
				document.getElementById('no-possibilities').innerHTML = '<span> There are no results.</span>';
			}
		}
	}
	// var piedmont = {
	// 	position: {lat: 33.7901,lng: -84.3696 },
	// 	name: 'Piedmont Park'
	// };

	// var marker = new google.maps.Marker({
	// 	position: piedmont.position,
	// 	map: map,
	// 	title: 'Piedmont Park',
	// 	icon: './images/rsz_1marker-image.png'
	// });

	// var infoWindow = new google.maps.InfoWindow({
	// 	content: '<span data-bind="text: name">This is my span</span>'

	// });

	// marker.addListener('click', function() {
	// 	infoWindow.open(map, marker);
	// });

	
}