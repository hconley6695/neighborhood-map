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
];

// creating global map variable
var map;


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

			// console.log(this.marker.title);

			var contentString = '<span>'+ this.marker.title +'</span>';

			infowindow = new google.maps.InfoWindow({
				content: contentString
			});
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

	this.populateMarker = function(marker, infowindow) {

        self.contentInfoWindow(this.marker, self.largeInfoWindow);
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

			// console.log(this.marker);

			

			// this.largeInfowindow = new google.maps.InfoWindow();

			
			this.marker.setMap(map);
			

			// putting all of the markers into the new markers array
			this.markers.push(this.marker);

			this.marker.addListener('click', self.populateMarker(this.marker, this.largeInfoWindow));
		}		
	};

	this.initMap();

	// this.typeOfVenue = ko.computed(function(place) {
	// 	for (var i = 0; i < places.length; i++) {
	// 		this.type = places[i].type;
	// 		this.setMap(null);

	// 		if (this.type == "attractions") {
	// 			this.setMap(map);
	// 		}

	// 		if (this.type == "parks") {
	// 			this.setMap(map);
	// 		}

	// 		if (this.type == "restaurants") {
	// 			this.setMap(map);
	// 		}

	// 		if (this.type == "shopping") {
	// 			this.setMap(map);
	// 		}
	// 	}

	// });


	// PLACES A SEARCH BAR FOR THE PLACES & FILTERS BOTH THE MARKERS AND THE LIST OF PLACES WHEN SEARCHING

	this.filterMarkers = ko.computed(function() {
		var filterList = [];	

		for (var i = 0; i < this.markers.length; i++) {

			var locationOfMarker = this.markers[i];
			
			var listTitle = locationOfMarker.title;


			
			console.log(listTitle);

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



// CHANGING CODE HERE




	
// function showAll() {

// 	for (var i = 0; i < markers.length; i++) {
// 		markers[i].setMap(null);
// 		markers[i].setMap(map);
// 	}
// }

	// document.getElementById('no-filter').addEventListener('click', showAll);
	// document.getElementById('attractions-filter').addEventListener('click', showAttractions);
	// document.getElementById('parks-filter').addEventListener('click', showParks);
	// document.getElementById('restaurants-filter').addEventListener('click', showRestaurants);
	// document.getElementById('shopping-filter').addEventListener('click', showShopping);
// var viewModel = {
	// query: ko.observable('')
// }
	
// TO CHANGE KO.OBSERVABLE, YOU PLACE A NEW VALUE INTO IT-- EX: VAR NUM = KO.OBSERVABLE(42);
// KNOCKOUT MAKES YOU RUN A FUNCITON IN ORDER TO CHANGE THE VALUE  -- EX. NUM(43);

// viewModel.markers = function() {

// }


// ko.applyBindings(viewModel);

	// function showAttractions() {
	// 	console.log(markers);
	// 	for (var i = 0; i < markers.length; i++) {
	// 		markers[i].setMap(null);
	// 		if (markers[i].type == 'attractions') {

	// 			markers[i].setMap(map);
	// 		} else {
	// 			document.getElementById('no-possibilities').innerHTML = '<span> There are no results.</span>';
	// 		}
	// 	}
	// }

	// function showParks() {
	// 	for (var i = 0; i < markers.length; i++) {
	// 		markers[i].setMap(null);
	// 		if (markers[i].type == 'parks') {

	// 			markers[i].setMap(map);
	// 		} else {
	// 			document.getElementById('no-possibilities').innerHTML = '<span> There are no results.</span>';
	// 		}
	// 	}
	// }

	// function showRestaurants() {
	// 	for (var i = 0; i < markers.length; i++) {
	// 		markers[i].setMap(null);
	// 		if (markers[i].type == 'restaurants') {

	// 			markers[i].setMap(map);
	// 		} else {
	// 			document.getElementById('no-possibilities').innerHTML = '<span> There are no results.</span>';
	// 		}
	// 	}
	// }

	// function showShopping() {

	// 	for (var i = 0; i < markers.length; i++) {
	// 		markers[i].setMap(null);
	// 		if (markers[i].type == 'shopping') {
		
	// 			markers[i].setMap(map);
	// 		} else {
	// 			document.getElementById('no-possibilities').innerHTML = '<span> There are no results.</span>';
	// 		}
	// 	}
	// }

// }	
// }


// var myViewModel = {
// 	name: ko.observable('Bob'),
// 	age: ko.observable(23)
// };

// ko.applyBindings(myViewModel); 
// ko.applyBindings(viewmodel);
function startUpApp() {
	ko.applyBindings(new viewModel());
}