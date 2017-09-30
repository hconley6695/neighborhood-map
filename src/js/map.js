// import places from  './viewmodel';

var map;

// create new empty array for all places
var markers = [];

var places = [
	{
		name: 'Piedmont Park',
		position: {lat: 33.7901,lng: -84.3696 }
	},

	{
		name: 'Georgia Aquarium',
		position: {lat: 33.7634,lng: -84.3951}
	},
	{
		name: 'Ponce City Market',
		position: {lat: 33.7719,lng: -84.3665}
	},
	{
		name: 'Zoo Atlanta',
		position: {lat: 33.7341,lng: -84.3723}
	},
	{
		name: 'Oakland Cemetary',
		position: {lat: 33.7486,lng: -84.3730}
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
		// creating a marker for each location
		var marker = new google.maps.Marker({
			position: position,
			map: map,
			title: name,
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