// model
var places = [
	{
		name: 'Piedmont Park',
		position: {lat: 33.7901,lng: -84.3696 },
		type: 'parks',
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
		name: 'Lenox Square',
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
];

// creating global map variable
var map, clientID, clientSecret;


function viewModel() {
	var self = this;

	this.search = ko.observable('');

	// create new empty array for all places
	this.markers = [];

	this.contentInfoWindow = function(marker, infowindow) {
		// console.log('marker', marker);
		// console.log('info', infowindow);
		if (infowindow.marker != marker) {
			infowindow.marker = marker;

			var contentString = '<span>'+ this.marker.title +'</span>';
			//////////////
			clientID = 'CHMADCCNK2GSYHFDDIYPKIHG54P535GXBHZ15TLTFGXIJ4ME';

			clientSecret = 'LMODHYT1SSACS4UPE5OSM51ODANGBY0MX5ZGFYIQ51BVIOR0';

			var urlApi = 'https://api.foursquare.com/v2/venues/search?v=20161016&ll=33.7490%2C%20-84.3880&client_id=' + clientID + '&client_secret=' + clientSecret + '&query=' + marker.title;


			$.getJSON(urlApi).done(function(marker){

				var resp = marker.response.venues[0];
				console.log(resp);

				var placeName = resp.name;
				var placeUrl = resp.url;
				var placeStreet = resp.location.address;
				var placeCity = resp.location.city;
				var placeZip = resp.location.postalCode;
				var placeState = resp.location.state;
				var placePhone = resp.contact.formattedPhone;
				var placeStats = resp.stats.checkinsCount;

				var placeHTML = '<div><h4>' + placeName + '</h4><p>'
					+ placeStreet + '</p><p>' + placeCity + ', ' + placeState + ' ' + placeZip + '</p><p>' + placePhone + '</p><p><a href="' + placeUrl + '" target="_blank">' 
					+ placeUrl + '</a></p><p>' + placeStats + ' people have checked in here.';

				// console.log(placeZip);

				infowindow = new google.maps.InfoWindow({
					content: placeHTML
				});

			}).fail(function() {
				$('#no-possibilities').html('<p>There was an API call error.</p>');
			})
			////////////////

			
			// infowindow.setContent('<span>'+ this.marker.title +'</span>');

			this.marker.addListener('click', function() {
				infowindow.open(map, marker);
			});
			// infowindow.open(map, marker);

			infowindow.addListener('closeclick', function() {
				infowindow.marker = null;
			});

		}
	};

	this.initMap = function() {
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 33.7490, lng: -84.3880},
			zoom: 12
		});


		this.largeInfoWindow = new google.maps.InfoWindow();

	//Places markers on the map within the initMap function
    //Puts the infoWindows on each individual marker
		for (var i = 0; i < places.length; i++) {
			// get the positions of the array of locations from viewmodel.js
			this.position = places[i].position;
			// get the name of the array of locations from viewmodel.js
			this.name = places[i].name;

			this.type = places[i].type;
			// creating a marker for each location	
			this.marker = new google.maps.Marker({
				map: map,
				position: this.position,
				title: this.name,
				type: this.type,
				animation: google.maps.Animation.DROP,
				icon: './images/rsz_1marker-image.png',
				id: i
			});
			
			this.marker.setMap(map);

			// putting all of the markers into the new markers array
			this.markers.push(this.marker);

			this.marker.addListener('click', self.contentInfoWindow(this.marker, this.largeInfoWindow));
		}		
	};

	this.initMap();


	// PLACES A SEARCH BAR FOR THE PLACES & FILTERS BOTH THE MARKERS AND THE LIST OF PLACES WHEN SEARCHING

	this.filterMarkers = ko.computed(function() {
		var filterList = [];	

		for (var i = 0; i < this.markers.length; i++) {

			var locationOfMarker = this.markers[i];
			
			var listTitle = locationOfMarker.title;

			if(listTitle.toLowerCase().includes(this.search().toLowerCase())) {
				filterList.push(locationOfMarker);
				locationOfMarker.setVisible(true);
			} else {
				locationOfMarker.setVisible(false);
			}
		}
		// console.log(filterList);
		return filterList;
	}, this);

}


function startUpApp() {
	ko.applyBindings(new viewModel());
}