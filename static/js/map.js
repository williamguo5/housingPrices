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
        "elementType": "labels",
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
    // map.data.loadGeoJson('/static/json/suburbs0.json');
    // map.data.loadGeoJson('/static/json/suburbs1.json');
    // map.data.loadGeoJson('/static/json/suburbs2.json');
    // map.data.loadGeoJson('/static/json/suburbs3.json');
    map.data.loadGeoJson('/static/json/suburb_heatmaps.json');
	// heatmapHousing();
	changeHeatmap('housePrice');

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
    var housePriceString = "";
    var unitPriceString = "";
    var salaryString = "";
    var travelTimeString = "";

    var isChecked;
    map.data.addListener('click', function(event) {


        // Gets the name of the event layer clicked
        var suburbName = event.feature.getProperty('name');
		for (var i = 0; i < suburbData.length; i++) {
            console.log(suburbData[i].housePrice);
            if (suburbData[i].name.toUpperCase() === suburbName.toUpperCase()) {
                var housePriceValue = (suburbData[i].housePrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                var houseRentalValue = (suburbData[i].houseRentalPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                var unitPriceValue = (suburbData[i].unitPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                var unitRentalValue = (suburbData[i].unitRentalPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                var salaryValue = (suburbData[i].averageSalary).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                housePriceString =
                        '<b>Buy:</b> ' + '$' + housePriceValue +
                        '<br>' + '<b>Rent:</b> ' + '$' + houseRentalValue + ' p/w';
                        // 'Median Unit Price: $' + (suburbData[i].unitPrice) +
                        // 'Median Unit Rental: $' + (suburbData[i].unitRentalPrice) +
                        // 'Average Salary: ' + (suburbData[i].averageSalary) +
                        // 'Time to CBD (Private): ' + suburbData[i].timeToCbdPrivate +
                        // 'Time to CBD (Public): ' + suburbData[i].timeToCbdPublic;
                unitPriceString =
                        '<b>Buy:</b> ' + '$' + unitPriceValue +
                        '<br>' + '<b>Rent:</b> ' + '$' + unitRentalValue + ' p/w';
                salaryString =
                        '$' +  salaryValue + ' p/a';
                travelTimeString =
                        '<b>Private:</b> ' + suburbData[i].timeToCbdPrivate + '<br>' +
                        '<b>Public:</b> ' + suburbData[i].timeToCbdPublic;
                        //console.log(contentString);
                lastClickedSuburbIndex = i;

                break;
            }
        }


        var suburb = document.getElementById('suburb');
        var housePrice = document.getElementById('house-price');
        var unitPrice = document.getElementById('unit-price');
        var salary = document.getElementById('salary');
        var travelTime = document.getElementById('travel-time');

        // Checks if the cmpChecked has been toggled i.e. the checkbox has been ticked
        if($("#wrapper").hasClass('cmpChecked')) {
            if (!$("#wrapper").hasClass("cmpSuburbClicked")) {
               $("#wrapper").toggleClass("cmpSuburbClicked");
            }

            isChecked = true;
            // Switches the text to the element by the name of cmp-suburb
            suburb = document.getElementById('cmp-suburb');
            housePrice = document.getElementById('cmp-house-price');
            unitPrice = document.getElementById('cmp-unit-price');
            salary = document.getElementById('cmp-salary');
            travelTime = document.getElementById('cmp-travel-time');

            var inRange = false;
            var tempHousePriceString = "";
            var tempHousePriceStringCmp = "";

            var tempHouseRentString = "";
            var tempHouseRentStringCmp = "";

            var tempUnitPriceString = "";
            var tempUnitPriceStringCmp = "";

            var tempUnitRentString = "";
            var tempUnitRentStringCmp = "";

            var cmpHousePriceValue = (suburbData[cmpSuburbIndex].housePrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            var cmpHouseRentalValue = (suburbData[cmpSuburbIndex].houseRentalPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            var cmpUnitPriceValue = (suburbData[cmpSuburbIndex].unitPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            var cmpUnitRentalValue = (suburbData[cmpSuburbIndex].unitRentalPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            var cmpSalaryValue = (suburbData[cmpSuburbIndex].averageSalary).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            console.log(cmpSuburbIndex);

            if (Math.abs(suburbData[i].housePrice - suburbData[cmpSuburbIndex].housePrice) < 100000) {
                inRange = true;
            }
            // Comparing house prices
            // RED = More expensive
            // GREEN = Less expensive
            if (!inRange) {
                if (suburbData[i].housePrice < suburbData[cmpSuburbIndex].housePrice) {
                    console.log("I AM GREEN");
                    tempHousePriceString = '<b>Buy:</b> ' + '<span style="color: #7bc742;">' + '$' + housePriceValue + '</span>' + '<br>';
                    tempHousePriceStringCmp = '<b>Buy:</b> ' + '<span style="color: #af100a;">' + '$' + cmpHousePriceValue + '</span>' + '<br>';
                } else {
                    console.log("I AM RED");

                    tempHousePriceString = '<b>Buy:</b> '+ '<span style="color: #af100a;">' + '$' + housePriceValue + '</span>' + '<br>';
                    tempHousePriceStringCmp = '<b>Buy:</b> '+ '<span style="color: #7bc742;">' + '$' + cmpHousePriceValue + '</span>' + '<br>';

                }
            } else {
                tempHousePriceString = '<b>Buy:</b> ' + '$' + housePriceValue + '<br>';
                tempHousePriceStringCmp  = '<b>Buy:</b> ' + '$' + cmpHousePriceValue + '<br>';

            }

            inRange = false;

            if (Math.abs(suburbData[i].houseRentalPrice - suburbData[cmpSuburbIndex].houseRentalPrice) < 100) {
                inRange = true;
            }

            // Comparing house rent prices
            if (!inRange) {
                if (suburbData[i].houseRentalPrice < suburbData[cmpSuburbIndex].houseRentalPrice) {
                    console.log("I AM GREEN");
                    tempHouseRentString += '<b>Rent:</b> ' + '<span style="color: #7bc742;">' + '$' + houseRentalValue + ' p/w' +'</span>';
                    tempHouseRentStringCmp += '<b>Rent:</b> ' + '<span style="color: #af100a;">' + '$' + cmpHouseRentalValue + ' p/w' +'</span>';


                } else {
                    console.log("I AM RED");

                    tempHouseRentString += '<b>Rent:</b> '+ '<span style="color: #af100a;">' + '$' + houseRentalValue + ' p/w' + '</span>';
                    tempHouseRentStringCmp += '<b>Rent:</b> '+ '<span style="color: #7bc742;">' + '$' + cmpHouseRentalValue + ' p/w' + '</span>';

                }
            } else {
                tempHouseRentString = '<b>Rent:</b> ' + '$' + houseRentalValue + ' p/w';
                tempHouseRentStringCmp = '<b>Rent:</b> ' + '$' + cmpHouseRentalValue + ' p/w';


            }

            // Comparing unit prices
            if (Math.abs(suburbData[i].unitPrice - suburbData[cmpSuburbIndex].unitPrice) < 100000) {
                inRange = true;
            }

            if (!inRange) {
                if (suburbData[i].unitPrice < suburbData[cmpSuburbIndex].unitPrice) {
                    console.log("I AM GREEN");
                    tempUnitPriceString += '<b>Buy:</b> ' + '<span style="color: #7bc742;">' + '$' + unitPriceValue + '</span>' + '<br>';
                    tempUnitPriceStringCmp += '<b>Buy:</b> ' + '<span style="color:  #af100a;">' + '$' + cmpUnitPriceValue + '</span>' + '<br>';

                } else {
                    console.log("I AM RED");

                    tempUnitPriceString += '<b>Buy:</b> '+ '<span style="color: #af100a;">' + '$' + unitPriceValue + '</span>' + '<br>';
                    tempUnitPriceStringCmp += '<b>Buy:</b> '+ '<span style="color: #7bc742;">' + '$' + cmpUnitPriceValue + '</span>' + '<br>';

                }
            } else {
                tempUnitPriceString = '<b>Buy:</b> ' + '$' + unitPriceValue + '<br>';
                tempUnitPriceStringCmp = '<b>Buy:</b> ' + '$' + cmpUnitPriceValue + '<br>';


            }

            // Comparing unit rent prices
            if (Math.abs(suburbData[i].unitRentalPrice - suburbData[cmpSuburbIndex].unitRentalPrice) < 100) {
                inRange = true;
            }

            if (!inRange) {
                if (suburbData[i].unitRentalPrice < suburbData[cmpSuburbIndex].unitRentalPrice) {
                    console.log("I AM GREEN");
                    tempUnitRentString += '<b>Rent:</b> ' + '<span style="color: #7bc742;">' + '$' + unitRentalValue + ' p/w' + '</span>';
                    tempUnitRentStringCmp += '<b>Rent:</b> ' + '<span style="color: #af100a;">' + '$' + cmpUnitRentalValue + ' p/w' + '</span>';

                } else {
                    console.log("I AM RED");

                    tempUnitRentString += '<b>Rent:</b> '+ '<span style="color: #af100a;">' + '$' + unitRentalValue + ' p/w' + '</span>';
                    tempUnitRentStringCmp += '<b>Rent:</b> ' + '<span style="color: #7bc742;">' + '$' + cmpUnitRentalValue + ' p/w' + '</span>';

                }
            } else {
                tempUnitRentString = '<b>Rent:</b> ' + '$' + unitRentalValue + ' p/w';
                tempUnitRentStringCmp = '<b>Rent:</b> ' + '$' + cmpUnitRentalValue + ' p/w';

            }



            housePriceString = tempHousePriceString + tempHouseRentString;
            unitPriceString = tempUnitPriceString + tempUnitRentString;

            var cmpHousePriceString = tempHousePriceStringCmp + tempHouseRentStringCmp;
            var cmpUnitPriceString = tempUnitPriceStringCmp + tempUnitRentStringCmp;

            document.getElementById('house-price').innerHTML = cmpHousePriceString;
            document.getElementById('unit-price').innerHTML = cmpUnitPriceString;

            if (cmpLayer.feature.getProperty('name') == event.feature.getProperty('name')) {
               $("#wrapper").removeClass("cmpSuburbClicked");
               suburbName = "";
               contentString = "";
            }
       } else {
           isChecked = false;
           cmpLayer = event;
           cmpSuburbIndex = i;
       }

        // Calls the capitalise string function
        suburbName = capitaliseFirstLetter(suburbName);

        // Applies the changes to the string to the html contained in suburb
        suburb.innerHTML = suburbName;
        housePrice.innerHTML = housePriceString;
        unitPrice.innerHTML = unitPriceString;
        salary.innerHTML = salaryString;
        travelTime.innerHTML = travelTimeString;

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
        map.data.overrideStyle(event.feature, {fillOpacity: 0.25, strokeColor: "grey", strokeWeight: 3, zIndex: 1});
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
colorValues = [
	"#7bc742",  // 0
	"#97c338",  // 1
	"#b6bf2e",  // 2
	"#bb9d24",  // 3
	"#b7711b",  // 4
	"#b34112",  // 5
	"#af100a",  // 6
	"#ac0227",  // 7
	"grey" 		// 8
];

function changeHeatmap(heatmap){
	var heatmapChecked = [1, 1, 1, 1, 1, 1, 1, 1, 1];
	heatmapChecked = isHeatmapChecked(heatmapChecked);

	map.data.setStyle(function(feature){
		var value = feature.getProperty(heatmap);
		var color = colorValues[value];
	    var opacity = 0.25;

	    if (!feature.getProperty('isColorful')) {
	        // color = feature.getProperty(heatmap);
			opacity = 0.9;
	    }
		if (!heatmapChecked[value]){
			return{
		        fillColor: color,
				fillOpacity: 0.1,
		        strokeColor: "grey",
		        strokeWeight: 0.1
			};
		}
		return{
	        fillColor: color,
			fillOpacity: opacity,
			strokeColor: color,
	        strokeWeight: 1
		};
	});
}

function isHeatmapChecked(heatmapChecked){
	if(!$('input:checkbox[name=lgd-checkbox0]').is(':checked')){
		heatmapChecked[0] = 0;
	}
	if(!$('input:checkbox[name=lgd-checkbox1]').is(':checked')){
		heatmapChecked[1] = 0;
	}
	if(!$('input:checkbox[name=lgd-checkbox2]').is(':checked')){
		heatmapChecked[2] = 0;
	}
	if(!$('input:checkbox[name=lgd-checkbox3]').is(':checked')){
		heatmapChecked[3] = 0;
	}
	if(!$('input:checkbox[name=lgd-checkbox4]').is(':checked')){
		heatmapChecked[4] = 0;
	}
	if(!$('input:checkbox[name=lgd-checkbox5]').is(':checked')){
		heatmapChecked[5] = 0;
	}
	if(!$('input:checkbox[name=lgd-checkbox6]').is(':checked')){
		heatmapChecked[6] = 0;
	}
	if(!$('input:checkbox[name=lgd-checkbox7]').is(':checked')){
		heatmapChecked[7] = 0;
	}
	return heatmapChecked;
}

function capitaliseFirstLetter(string) {
    return string.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}