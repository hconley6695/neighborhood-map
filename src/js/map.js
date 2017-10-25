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

	// SETS THE CONTENT OF EACH PARTICULAR INFOWINDOW WHEN CALLED BY CLICK ON LIST ITEM
	// OR BY CLICK OF MAP MARKER

	this.contentInfoWindow = function(marker, infowindow) {

		if (infowindow.marker != marker) {

			infowindow.marker = marker;

			clientID = 'CHMADCCNK2GSYHFDDIYPKIHG54P535GXBHZ15TLTFGXIJ4ME';

			clientSecret = 'LMODHYT1SSACS4UPE5OSM51ODANGBY0MX5ZGFYIQ51BVIOR0';

			var urlApi = 'https://api.foursquare.com/v2/venues/search?v=20161016&ll=33.7490%2C%20-84.3880&client_id=' + clientID + '&client_secret=' + clientSecret + '&query=' + marker.title;


			$.getJSON(urlApi).done(function(marker){

				var resp = marker.response.venues[0];
				console.log(resp);

				this.placeName = resp.name;
				this.placeUrl = resp.url;
				this.placeStreet = resp.location.address;
				this.placeCity = resp.location.city;
				this.placeZip = resp.location.postalCode;
				this.placeState = resp.location.state;
				this.placePhone = resp.contact.formattedPhone;
				this.placeStats = resp.stats.checkinsCount;

				this.placeHTML = '<div><h4>' + this.placeName + '</h4><p>'
					+ this.placeStreet + '</p><p>' + this.placeCity + ', ' + this.placeState + ' ' + this.placeZip + '</p><p>' + this.placePhone + '</p><p><a href="' + this.placeUrl + '" target="_blank">' 
					+ this.placeUrl + '</a></p><p>' + this.placeStats + ' people have checked in here.';

				// BECAUSE INFOWINDOW WAS ALREADY CREATED, WE HAD TO RESET THE CONTENT OF THE INFOWINDOW,
				// NOT MAKE A NEW ONE 

				infowindow.setContent(this.placeHTML);

			}).fail(function() {
				$('#no-possibilities').html('<p>There was an error.</p>');
			})

			infowindow.open(map, marker);

			infowindow.addListener('closeclick', function() {
				infowindow.marker = null;
			});

		}
	};

	// CALLED UPON ON LIST CLICK OR WITHIN MARKER CLICK FUNCTION
	this.populateMarkerFromList = function() {
		self.contentInfoWindow(this, self.largeInfoWindow);
		this.setAnimation(google.maps.Animation.BOUNCE);
        window.setTimeout((function() {
            this.setAnimation(null);
        }).bind(this), 2000);
	}

	this.initMap = function() {
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 33.7490, lng: -84.3880},
			zoom: 12
		});

		this.bounds = new google.maps.LatLngBounds();


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

			this.bounds.extend(this.position);

			// HAD TO CREATE FUNCTION OUTSIDE OF INITMAP FUNCTION TO POPULATE INFOWINDOWS SO THAT
			// THEY COULD BE FILLED BY BOTH CLICKING ON THE LIST OR THE MARKERS
			// FIXED THE NON-CLOSING INFOWINDOW PROBLEM TOO.

			this.marker.addListener('click', self.populateMarkerFromList);
		}	
		map.fitBounds(this.bounds);	
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

		return filterList;
	}, this);

}

function toggleMenu() {
	$('.fa-bars').on('click', function() {
		$('#container').addClass('open-menu');
		$('#hamburger').addClass('no-see-it');
		$('#close').addClass('see-it');
		$('#map').addClass('smaller-map');
	});

	$('.fa-times').on('click', function() {
		$('#container').removeClass('open-menu');
		$('#hamburger').removeClass('no-see-it');
		$('#close').removeClass('see-it');
		$('#map').removeClass('smaller-map');
	});

}

toggleMenu();




function startUpApp() {
	ko.applyBindings(new viewModel());
}