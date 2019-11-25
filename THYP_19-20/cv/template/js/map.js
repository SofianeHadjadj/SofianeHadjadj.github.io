var cities = {

// mekkah
// medine
// jeddah
// amman
// caire 
// alexandrie
// matrouh
// casablanca
// maghina
// tlemxen
// wahran
// alger
// bejaia
// jijel
// constantine
// skikda
// annaba
// almeria
// alicante
// turin
// luxembourg

  "Europe": {
    // Luxembourg
    "Luxembourg" : { lat: 49.614065, lng: 6.133449 },
    // Espagne
    "Almeria" : { lat: 36.831926, lng: -2.461366 },
    "Alicante" : { lat: 38.342866, lng: -0.484555 },
    // Italie
    "Turin" : { lat: 45.077885, lng: 7.678678 },
    // france
    "Paris": { lat: 48.856614, lng: 2.352222 }
  },

  "Africa": {
    // Maroc
    "Casablanca" : { lat: 33.572254, lng: -7.599353 },
    // Algerie
    "Maghina" : { lat: 34.852991, lng: -1.734229 },
    "Tlemcen" : { lat: 34.896930, lng: -1.315098 },
    "Wahran" : { lat: 35.709192, lng: -0.640757 },
    "Alger" : { lat: 36.765318, lng: 3.059865 },
    "Boumerdes" : { lat: 36.766319, lng: 3.479963 },
    "Bejaia" : { lat: 36.812495, lng: 4.986964 },
    "Jijel" : { lat: 36.825404, lng: 5.749983 },
    "Constantine" : { lat: 36.360311, lng: 6.635464 },
    "Skikda" : { lat: 36.884102, lng: 6.913233 },
    "Annaba" : { lat: 36.928164, lng: 7.759359 },
    // Egypte
    "Le Caire" : { lat: 30.047746, lng: 31.236146 },
    "Alexandrie" : { lat: 31.207647, lng: 29.916426 },
    "Matruh" : { lat: 31.357149, lng: 27.237870 }
  },

  "Asia": {
    // Arabie saoudite
    "Mekkah" : { lat: 21.394350, lng: 39.848566},
    "Medine" : { lat: 24.526597, lng: 39.579833},
    "Jeddah" : { lat: 21.502091, lng: 39.194757},
    // Jordanie
    "Amman" : { lat: 31.952305, lng: 35.917538}
  }
};

// markers currently added
var markers = {
  "North America": [],
  "Europe": [],
  "Asia": [],
  "Australia": [],
  "Africa": [],
  "South America": []
};

function initMap() {
  // map constructor
  var map = new google.maps.Map(document.getElementById("map"), {
    gestureHandling: "auto",
    zoom: 10,
    center: { lat: 39.296092, lng: 9.212074 }, // Paris
    minZoom: 3,
    maxZoom: 20,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    zoomControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: true,
          styles: [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
]
  });

  function zoomInMarker(marker) {
    var marker = marker;

    function nested() {
      console.log(marker.label.text);
      map.setZoom(map.zoom + 6);
      map.setCenter(marker.getPosition());
    }
    return nested;
  }

  // timeout so not everything drops at once
  function addMarkerWithTimeout(country, city, time) {
    window.setTimeout(function() {
      addMarker(country, city);
    }, time);
  }

  function addMarker(country, city) {
    var marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      position: cities[country][city],
      map: map
    });

    markers[country].push(marker);
    google.maps.event.addListener(marker, "click", zoomInMarker(marker));
  }

  function addCountry(country) {
    for (var i = 0; i < markers[country].length; i++) {
      markers[country][i].setMap(null);
    }
    var counter = 0;
    for (var city in cities[country]) {
      addMarkerWithTimeout(country, city, counter * 50);
      counter++;
    }
  }


  // init buttons
  for (var country in markers) {
    // first letter lowercase + 1 to the end for button ID
    var id =
      country[0].toLowerCase() +
      country.slice(1, country.length).replace(/ /g, "") +
      "Button";

  }

  // all
  var all = function() {
    for (var country in cities) {
      addCountry(country);
    }
    map.setZoom(5);
  };
  document.getElementById("all").onclick = all;
  // People kept asking me if I've been in Berkeley my entire life
  window.onload = all; 

  // BUTTONS END

  // making sure doens't go out of bounds
  var lastValidCenter;
  setOutOfBoundsListener();

  function setOutOfBoundsListener() {
    google.maps.event.addListener(map, "dragend", function() {
      checkLatitude(map);
    });
    google.maps.event.addListener(map, "idle", function() {
      checkLatitude(map);
    });
    google.maps.event.addListener(map, "zoom_changed", function() {
      checkLatitude(map);
    });
  }

  function checkLatitude(map) {
    var bounds = map.getBounds();
    var sLat = map
      .getBounds()
      .getSouthWest()
      .lat();
    var nLat = map
      .getBounds()
      .getNorthEast()
      .lat();
    if (sLat < -85 || nLat > 85) {
      //the map has gone beyone the world's max or min latitude - gray areas are visible
      //return to a valid position
      if (this.lastValidCenter) {
        map.setCenter(this.lastValidCenter);
      }
    } else {
      this.lastValidCenter = map.getCenter();
    }
  }
}

