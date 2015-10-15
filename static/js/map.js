function initAutocomplete() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {lat: -33.835716, lng: 151.21703},
        //zoom: 12, //Test setting for map
        //center: {lat: -33.916383, lng: 151.257885},
        //zoom: 10,
        //center: {lat: -33.7969235, lng: 150.9224326},

        zoomControl: true,
        scaleControl: true,
        streetViewControl: false,
    });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // [START region_getplaces]
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
  initMap();
  // [END region_getplaces]
}
function initMap(){
    var customMapType = new google.maps.StyledMapType([
    {
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
   {
      "featureType":"landscape.man_made",
      "elementType":"geometry",
      "stylers":[
         {
            "color":"#f7f1df"
         }
      ]
   },
   {
      "featureType":"landscape.natural",
      "elementType":"geometry",
      "stylers":[
         {
            "color":"#d0e3b4"
         }
      ]
   },
   {
      "featureType":"landscape.natural.terrain",
      "elementType":"geometry",
      "stylers":[
         {
            "visibility":"off"
         }
      ]
   },
   {
      "featureType":"poi",
      "elementType":"labels",
      "stylers":[
         {
            "visibility":"off"
         }
      ]
   },
   {
      "featureType":"poi.business",
      "elementType":"all",
      "stylers":[
         {
            "visibility":"off"
         }
      ]
   },
   {
      "featureType":"poi.medical",
      "elementType":"geometry",
      "stylers":[
         {
            "color":"#fbd3da"
         }
      ]
   },
   {
      "featureType":"poi.park",
      "elementType":"geometry",
      "stylers":[
         {
            "color":"#bde6ab"
         }
      ]
   },
   {
      "featureType":"road",
      "elementType":"geometry.stroke",
      "stylers":[
         {
            "visibility":"off"
         }
      ]
   },
   {
      "featureType":"road",
      "elementType":"labels",
      "stylers":[
         {
            "visibility":"off"
         }
      ]
   },
   {
      "featureType":"road.highway",
      "elementType":"geometry.fill",
      "stylers":[
         {
            "color":"#ffe15f"
         }
      ]
   },
   {
      "featureType":"road.highway",
      "elementType":"geometry.stroke",
      "stylers":[
         {
            "color":"#efd151"
         }
      ]
   },
   {
      "featureType":"road.arterial",
      "elementType":"geometry.fill",
      "stylers":[
         {
            "color":"#ffffff"
         }
      ]
   },
   {
      "featureType":"road.local",
      "elementType":"geometry.fill",
      "stylers":[
         {
            "color":"black"
         }
      ]
   },
   {
      "featureType":"transit.station.airport",
      "elementType":"geometry.fill",
      "stylers":[
         {
            "color":"#cfb2db"
         }
      ]
   },
   {
      "featureType":"water",
      "elementType":"geometry",
      "stylers":[
         {
            "color":"#a2daf2"
         }
      ]
   }
   ]);

    var customMapTypeId = 'custom_style';
    map.mapTypes.set(customMapTypeId, customMapType);
    map.setMapTypeId(customMapTypeId);

    // Load GeoJSON.
    map.data.loadGeoJson('/static/json/suburbs0.json');
    map.data.loadGeoJson('/static/json/suburbs1.json');
    map.data.loadGeoJson('/static/json/suburbs2.json');
    map.data.loadGeoJson('/static/json/suburbs3.json');
    map.data.setStyle(function(feature) {
        color = feature.getProperty('housingColor');
        opacity = 0.25;
        if (!feature.getProperty('isColorful')) {
            color = feature.getProperty('housingColor');
            opacity = 0.9;
        }

        return /** @type {google.maps.Data.StyleOptions} */({
            fillColor: color,
            fillOpacity: opacity,
            strokeColor: "black",
            strokeWeight: 1
        });
    });

	var strictBounds = new google.maps.LatLngBounds(
		// SW corner
		new google.maps.LatLng(-34.206766, 150.652075),
		// NE corner
		new google.maps.LatLng(-33.428651, 151.392279)
	);

 // Listen for the dragend event
    google.maps.event.addListener(map, 'bounds_changed', function() {
      if (strictBounds.contains(map.getCenter())) return;

      // We're out of bounds - Move the map back within the bounds

      var c = map.getCenter(),
          x = c.lng(),
          y = c.lat(),
          maxX = strictBounds.getNorthEast().lng(),
          maxY = strictBounds.getNorthEast().lat(),
          minX = strictBounds.getSouthWest().lng(),
          minY = strictBounds.getSouthWest().lat();

      if (x < minX) x = minX;
      if (x > maxX) x = maxX;
      if (y < minY) y = minY;
      if (y > maxY) y = maxY;

      map.setCenter(new google.maps.LatLng(y, x));
    });

 // Limit the zoom level
 // This is the minimum zoom level that we'll allow
    var minZoomLevel = 9;
	var maxZoomLevel = 15;
    google.maps.event.addListener(map, 'zoom_changed', function() {
      if (map.getZoom() < minZoomLevel) map.setZoom(minZoomLevel);
      if (map.getZoom() > maxZoomLevel) map.setZoom(maxZoomLevel);
    });

    // Keep track of the previously clicked layer
    var contentString = "";

    var isChecked;
    map.data.addListener('click', function(event) {


        // Gets the name of the event layer clicked
        var suburbName = event.feature.getProperty('name');
		for (var i = 0; i < suburbData.length; i++) {
            console.log(suburbData[i].housePrice);
            if (suburbData[i].name.toUpperCase() === suburbName.toUpperCase()) {
                contentString = '<hr>' + 'Median House Price: $' + (suburbData[i].housePrice) +
                        '<hr>' + 'Time to CBD (Private): ' + suburbData[i].timeToCbdPrivate +
                        '<hr>' + 'Time to CBD (Public): ' + suburbData[i].timeToCbdPublic;
                        console.log(contentString);
                break;
            }
        }


        var suburb = document.getElementById('suburb');
        var summary = document.getElementById('summary');

        // Checks if the cmpChecked has been toggled i.e. the checkbox has been ticked
        if($("#wrapper").hasClass('cmpChecked')) {
           if (!$("#wrapper").hasClass("cmpSuburbClicked")) {
               $("#wrapper").toggleClass("cmpSuburbClicked");
           }
           isChecked = true;
           // Switches the text to the element by the name of cmp-suburb
           suburb = document.getElementById('cmp-suburb');
           summary = document.getElementById('cmp-summary');

           if (cmpLayer.feature.getProperty('name') == event.feature.getProperty('name')) {
               $("#wrapper").removeClass("cmpSuburbClicked");
               suburbName = "";
               contentString = "";
           }
       } else {
           isChecked = false;
           cmpLayer = event;
       }

        // Calls the capitalise string function
        suburbName = capitaliseFirstLetter(suburbName);

        // Applies the changes to the string to the html contained in suburb
        suburb.innerHTML = suburbName;
        summary.innerHTML = contentString;


        // Checks if the previous layer has been clicked
        if ((isChecked && cmpLayer != lastClickedLayer && cmpLayer != event) ||
            (!isChecked && lastClickedLayer))  {
            // Then reverts the colour back the original state

            lastClickedLayer.feature.setProperty('isColorful', false);
        }

        lastClickedLayer = event;
        event.feature.setProperty('isColorful', true);


        // Checks the state of the class showSidebar
        // If the it is not toggled, then it will be toggled as the map layer has been clicked
        if (!$("#wrapper").hasClass('showSidebar')) {
            $("#wrapper").toggleClass("showSidebar");
            $("#wrapper").toggleClass("showClose");
        }

	});
    map.data.addListener('mouseover', function(event) {
        // newColor = feature.getProperty('color');
        //newColor = 'red';
        // newColor = (parseInt(newColor, 16) + 0xFFFF00).toString(16);
        // newColor = newColor + '#111111';
        map.data.revertStyle();
        map.data.overrideStyle(event.feature, {fillOpacity: 0.25});
        var suburbName = event.feature.getProperty('name');
        var suburbDisplay = document.getElementById('suburb-hover-id');
        suburbName = capitaliseFirstLetter(suburbName);

        suburbDisplay.innerHTML = suburbName;


    });

    map.data.addListener('mouseout', function(event) {
        map.data.revertStyle();
        var suburbDisplay = document.getElementById('suburb-hover-id');
        suburbDisplay.innerHTML = "";

    });
}
var count = 1;
var map;
var setHeatmap1Fn = function(feature){
	var color = feature.getProperty('housingColor');
    var opacity = 0.25;
	
    if (!feature.getProperty('isColorful')) {
        color = feature.getProperty('housingColor');
		opacity = 0.9;
    }
	// console.log('set heatmap' + opacity);
	if (ifHeatmapChecked(color)){
		return{
	        fillColor: color,
			fillOpacity: 0.1,
	        // strokeColor: feature.getProperty('housingColor'),
	        strokeColor: "grey",
	        strokeWeight: 0.1
		};
	}
	
	return{
        fillColor: color,
		fillOpacity: opacity,
        // strokeColor: feature.getProperty('housingColor'),
        strokeColor: "black",
        strokeWeight: 1
	};
};
var setHeatmap2Fn = function(feature){
	var color = feature.getProperty('schoolColor');
    var opacity = 0.25;
    if (!feature.getProperty('isColorful')) {
        color = feature.getProperty('schoolColor');
		opacity = 0.9;
    }
	if (ifHeatmapChecked(color)){
		return{
	        fillColor: color,
			fillOpacity: 0.1,
	        // strokeColor: feature.getProperty('housingColor'),
	        strokeColor: "grey",
	        strokeWeight: 0.1
		};
	}
	return{
        fillColor: color,
		fillOpacity: opacity,
        // strokeColor: feature.getProperty('schoolColor'),
		strokeColor: "black",
        strokeWeight: 1
	};
};
var setHeatmap3Fn = function(feature){
	var color = feature.getProperty('transportColor');
    var opacity = 0.25;

    if (!feature.getProperty('isColorful')) {
        color = feature.getProperty('transportColor');
		opacity = 0.9;
    }
	if (ifHeatmapChecked(color)){
		return{
	        fillColor: color,
			fillOpacity: 0.1,
	        // strokeColor: feature.getProperty('housingColor'),
	        strokeColor: "grey",
	        strokeWeight: 0.1
		};
	}
	return{
        fillColor: color,
		fillOpacity: opacity,
        // strokeColor: feature.getProperty('transportColor'),
		strokeColor: "black",
        strokeWeight: 1
	};
};
function changeHeatmap(){
	// map.data.setStyle(setHeatmap2Fn);
	if(count % 3 == 0){
		map.data.setStyle(setHeatmap1Fn);
	}else if(count % 3 == 1){
		map.data.setStyle(setHeatmap2Fn);
	}else{
		map.data.setStyle(setHeatmap3Fn);
	}
	count++;
}

function heatmapHousing(){
	map.data.setStyle(setHeatmap1Fn);
}

function heatmapSchools(){
	map.data.setStyle(setHeatmap2Fn);
}

function heatmapHospitals(){
	map.data.setStyle(setHeatmap3Fn);
}

function ifHeatmapChecked(color){
	var checked = false;
	if(!$('input:checkbox[name=lgd-checkbox0]').is(':checked')){
		if (color == '#7bc742'){
			checked = true;
		}
	}
	if(!$('input:checkbox[name=lgd-checkbox1]').is(':checked')){
		if (color == '#97c338'){
			checked = true;
		}
	}
	if(!$('input:checkbox[name=lgd-checkbox2]').is(':checked')){
		if (color == '#b6bf2e'){
			checked = true;
		}
	}
	if(!$('input:checkbox[name=lgd-checkbox3]').is(':checked')){
		if (color == '#bb9d24'){
			checked = true;
		}
	}
	if(!$('input:checkbox[name=lgd-checkbox4]').is(':checked')){
		if (color == '#b7711b'){
			checked = true;
		}
	}
	if(!$('input:checkbox[name=lgd-checkbox5]').is(':checked')){
		if (color == '#b34112'){
			checked = true;
		}
	}
	if(!$('input:checkbox[name=lgd-checkbox6]').is(':checked')){
		if (color == '#af100a'){
			checked = true;
			// console.log('is checked' + opacity + color);
		}
	}
	if(!$('input:checkbox[name=lgd-checkbox7]').is(':checked')){
		if (color == '#ac0227'){
			checked = true;
		}
	}
	return checked;
}

function capitaliseFirstLetter(string) {
    return string.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}