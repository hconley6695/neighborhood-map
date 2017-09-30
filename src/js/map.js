var map;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 33.7490, lng: -84.3880},
		zoom: 12
	});

	var piedmont = {lat: 33.7901,lng: -84.3696 };

	var marker = new google.maps.Marker({
		position: piedmont,
		map: map,
		title: 'Piedmont Park',
		icon: './images/rsz_1marker-image.png'
	});

	var infoWindow = new google.maps.InfoWindow({
		content: 'Hello, this is Piedmont Park.'

	});

	marker.addListener('click', function() {
		infoWindow.open(map, marker);
	});

	
}