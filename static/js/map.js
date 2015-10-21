function initAutocomplete() {
    var customMapType = new google.maps.StyledMapType([{
        "elementType": "labels",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [{
            "color": "#f7f1df"
        }]
    }, {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [{
            "color": "#d0e3b4"
        }]
    }, {
        "featureType": "landscape.natural.terrain",
        "elementType": "geometry",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "poi.medical",
        "elementType": "geometry",
        "stylers": [{
            "color": "#fbd3da"
        }]
    }, {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{
            "color": "#bde6ab"
        }]
    }, {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#ffe15f"
        }]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#efd151"
        }]
    }, {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#ffffff"
        }]
    }, {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "black"
        }]
    }, {
        "featureType": "transit.station.airport",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#cfb2db"
        }]
    }, {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
            "color": "#a2daf2"
        }]
    }], {
        name: 'Map'
    });

    var customMapTypeId = 'map';

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {
            lat: -33.835716,
            lng: 151.21703
        },
        mapTypeControlOptions: {
            mapTypeIds: [customMapTypeId, google.maps.MapTypeId.SATELLITE]
        },
        zoomControl: true,
        scaleControl: true,
        streetViewControl: false,
    });
    map.mapTypes.set(customMapTypeId, customMapType);
    map.setMapTypeId(customMapTypeId);

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

function initMap() {

    // Load GeoJSON.
    map.data.loadGeoJson('/static/json/suburb_heatmaps.json');
    // heatmapHousing();
    changeHeatmap('housePrice', [1, 1, 1, 1, 1, 1, 1, 1, 1]);

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
    var houseRentString = "";
    var unitPriceString = "";
    var unitRentString = "";
    var salaryString = "";
    var travelTimeStringPrivate = "";
    var travelTimeStringPublic = "";

    var isChecked;
    map.data.addListener('click', function(event) {


        // Gets the name of the event layer clicked
        var suburbName = event.feature.getProperty('name');
        for (var i = 0; i < suburbData.length; i++) {
            if (suburbData[i].name.toUpperCase() === suburbName.toUpperCase()) {
                var housePriceValue = (suburbData[i].housePrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                var houseRentalValue = (suburbData[i].houseRentalPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                var unitPriceValue = (suburbData[i].unitPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                var unitRentalValue = (suburbData[i].unitRentalPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                var salaryValue = (suburbData[i].averageSalary).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                lastClickedSuburbIndex = i;

                break;
            }
        }

        //Formatting the sidebar section
        if (housePriceValue == 0) {
            housePriceValue = 'n/a';
        } else {
            housePriceValue = '$' + housePriceValue;
        }
        if (houseRentalValue == 0) {
            houseRentalValue = 'n/a';
        } else {
            houseRentalValue = '$' + houseRentalValue + ' p/w';
        }
        if (unitPriceValue == 0) {
            unitPriceValue = 'n/a';
        } else {
            unitPriceValue = '$' + unitPriceValue;
        }
        if (unitRentalValue == 0) {
            unitRentalValue = 'n/a';
        } else {
            unitRentalValue = '$' + unitRentalValue + ' p/w';
        }
        if (salaryValue == 0) {
            salaryValue = 'n/a';
        } else {
            salaryValue = '$' + salaryValue + ' p/a';
        }
        housePriceString = housePriceValue + '<br>';
        houseRentString = houseRentalValue;
        unitPriceString = unitPriceValue + '<br>';
        unitRentString = unitRentalValue;
        salaryString = salaryValue;
        travelTimeStringPrivate = suburbData[i].timeToCbdPrivate + '<br>';
        travelTimeStringPublic = suburbData[i].timeToCbdPublic;
        // console.log(contentString);

        var suburb = document.getElementById('suburb');

        var housePrice = document.getElementById('house-price');
        var houseRent = document.getElementById('house-rent');

        var unitPrice = document.getElementById('unit-price');
        var unitRent = document.getElementById('unit-rent');

        var salary = document.getElementById('salary');

        var travelTimePrivate = document.getElementById('travel-time-private');
        var travelTimePublic = document.getElementById('travel-time-public');

        // Checks if the cmpChecked has been toggled i.e. the checkbox has been ticked
        if ($("#wrapper").hasClass('cmpChecked')) {
            if (!$("#wrapper").hasClass("cmpSuburbClicked")) {
                $("#wrapper").toggleClass("cmpSuburbClicked");
            }

            console.log("IM HERE!!!" + $("#wrapper").hasClass("cmpSuburbClicked"));


            isChecked = true;
            // Switches the text to the element by the name of cmp-suburb
            suburb = document.getElementById('cmp-suburb');

            housePrice = document.getElementById('cmp-house-price');
            houseRent = document.getElementById('cmp-house-rent');

            unitPrice = document.getElementById('cmp-unit-price');
            unitRent = document.getElementById('cmp-unit-rent');

            salary = document.getElementById('cmp-salary');

            travelTimePrivate = document.getElementById('cmp-travel-time-private');
            travelTimePublic = document.getElementById('cmp-travel-time-public');


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

            if (cmpHousePriceValue == 0) {
               cmpHousePriceValue = 'n/a';
            } else {
                cmpHousePriceValue = '$' + cmpHousePriceValue;
            }
            if (cmpHouseRentalValue == 0) {
                cmpHouseRentalValue = 'n/a';
            } else {
                cmpHouseRentalValue = '$' + cmpHouseRentalValue + ' p/w';
            }
            if (cmpUnitPriceValue == 0) {
                cmpUnitPriceValue = 'n/a';
            } else {
                cmpUnitPriceValue = '$' + cmpUnitPriceValue;
            }
            if (cmpUnitRentalValue == 0) {
                cmpUnitRentalValue = 'n/a';
            } else {
                cmpUnitRentalValue = '$' + cmpUnitRentalValue + ' p/w';
            }
            if (cmpSalaryValue == 0) {
                cmpSalaryValue = 'n/a';
            } else {
                cmpSalaryValue = '$' + cmpSalaryValue + ' p/a';
            }

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
                    tempHousePriceString = '<span style="color: #7bc742;">' + housePriceValue + '</span>' + '<br>';
                    tempHousePriceStringCmp = '<span style="color: #af100a;">' + cmpHousePriceValue + '</span>' + '<br>';
                } else {
                    console.log("I AM RED");

                    tempHousePriceString = '<span style="color: #af100a;">' + housePriceValue + '</span>' + '<br>';
                    tempHousePriceStringCmp = '<span style="color: #7bc742;">' + cmpHousePriceValue + '</span>' + '<br>';

                }
            } else {
                tempHousePriceString = housePriceValue + '<br>';
                tempHousePriceStringCmp = cmpHousePriceValue + '<br>';

            }

            inRange = false;

            if (Math.abs(suburbData[i].houseRentalPrice - suburbData[cmpSuburbIndex].houseRentalPrice) < 100) {
                inRange = true;
            }

            // Comparing house rent prices
            if (!inRange) {
                if (suburbData[i].houseRentalPrice < suburbData[cmpSuburbIndex].houseRentalPrice) {
                    console.log("I AM GREEN");
                    tempHouseRentString += '<span style="color: #7bc742;">' + houseRentalValue + '</span>';
                    tempHouseRentStringCmp += '<span style="color: #af100a;">' + cmpHouseRentalValue + '</span>';



                } else {
                    console.log("I AM RED");

                    tempHouseRentString += '<span style="color: #af100a;">' + houseRentalValue + '</span>';
                    tempHouseRentStringCmp += '<span style="color: #7bc742;">' + cmpHouseRentalValue + '</span>';

                }
            } else {
                tempHouseRentString = houseRentalValue;
                tempHouseRentStringCmp = cmpHouseRentalValue;


            }

            // Comparing unit prices
            if (Math.abs(suburbData[i].unitPrice - suburbData[cmpSuburbIndex].unitPrice) < 100000) {
                inRange = true;
            }

            if (!inRange) {
                if (suburbData[i].unitPrice < suburbData[cmpSuburbIndex].unitPrice) {
                    console.log("I AM GREEN");
                    tempUnitPriceString += '<span style="color: #7bc742;">' + unitPriceValue + '</span>' + '<br>';
                    tempUnitPriceStringCmp += '<span style="color:  #af100a;">' + cmpUnitPriceValue + '</span>' + '<br>';

                } else {
                    console.log("I AM RED");

                    tempUnitPriceString += '<span style="color: #af100a;">' + unitPriceValue + '</span>' + '<br>';
                    tempUnitPriceStringCmp += '<span style="color: #7bc742;">' + cmpUnitPriceValue + '</span>' + '<br>';

                }
            } else {
                tempUnitPriceString = unitPriceValue + '<br>';
                tempUnitPriceStringCmp = cmpUnitPriceValue + '<br>';


            }

            // Comparing unit rent prices
            if (Math.abs(suburbData[i].unitRentalPrice - suburbData[cmpSuburbIndex].unitRentalPrice) < 100) {
                inRange = true;
            }

            if (!inRange) {
                if (suburbData[i].unitRentalPrice < suburbData[cmpSuburbIndex].unitRentalPrice) {
                    console.log("I AM GREEN");
                    tempUnitRentString += '<span style="color: #7bc742;">' + unitRentalValue + '</span>';
                    tempUnitRentStringCmp += '<span style="color: #af100a;">' + cmpUnitRentalValue + '</span>';

                } else {
                    console.log("I AM RED");

                    tempUnitRentString += '<span style="color: #af100a;">' + unitRentalValue + '</span>';
                    tempUnitRentStringCmp += '<span style="color: #7bc742;">' + cmpUnitRentalValue + '</span>';

                }
            } else {
                tempUnitRentString = unitRentalValue;
                tempUnitRentStringCmp = cmpUnitRentalValue;

            }



            housePriceString = tempHousePriceString;
            houseRentString = tempHouseRentString;
            unitPriceString = tempUnitPriceString;
            unitRentString = tempUnitRentString;

            var cmpHousePriceString = tempHousePriceStringCmp;
            var cmpHouseRentString = tempHouseRentStringCmp;
            var cmpUnitPriceString = tempUnitPriceStringCmp;
            var cmpUnitRentString = tempUnitRentStringCmp;

            document.getElementById('house-price').innerHTML = cmpHousePriceString;

            document.getElementById('house-rent').innerHTML = cmpHouseRentString;

            document.getElementById('unit-price').innerHTML = cmpUnitPriceString;
            document.getElementById('unit-rent').innerHTML = cmpUnitRentString;


            if (cmpLayer.feature.getProperty('name') == event.feature.getProperty('name')) {
                $("#wrapper").removeClass("cmpSuburbClicked");
                suburbName = "";
                contentString = "";
            }
        } else {
            isChecked = false;
            cmpLayer = event;
            cmpSuburbIndex = i;
            $("#add-suburb").css("display", "inline");
        }

        // Calls the capitalise string function
        suburbName = capitaliseFirstLetter(suburbName);

        // Applies the changes to the string to the html contained in suburb
        suburb.innerHTML = suburbName;
        housePrice.innerHTML = housePriceString;
        houseRent.innerHTML = houseRentString;
        unitPrice.innerHTML = unitPriceString;
        unitRent.innerHTML = unitRentString;
        salary.innerHTML = salaryString;
        travelTimePrivate.innerHTML = travelTimeStringPrivate;
        travelTimePublic.innerHTML = travelTimeStringPublic;

        // Checks if the previous layer has been clicked
        if ((isChecked && cmpLayer != lastClickedLayer && cmpLayer != event) ||
            (!isChecked && lastClickedLayer)) {
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
        // map.data.revertStyle();
    });
    map.data.addListener('mouseover', function(event) {
        map.data.revertStyle();
        map.data.overrideStyle(event.feature, {
            fillOpacity: 0.25,
            strokeColor: "grey",
            strokeWeight: 3,
            zIndex: 1
        });
        var suburbName = event.feature.getProperty('name');
        var suburbDisplay = document.getElementById('suburb-hover-id');
        suburbName = capitaliseFirstLetter(suburbName);

        suburbDisplay.innerHTML = suburbName;

        // highlight the corresponding band in the legend
        var value = event.feature.getProperty(currHeatmap);
        var checkboxId = "#lgd-" + value;
        $(checkboxId).addClass("checkbox-highlight");
        var heatmapValue = "#heatmap-value" + value;
        $(heatmapValue).addClass("highlight-text");
        // $(checkboxId)
    });

    map.data.addListener('mouseout', function(event) {
        var value = event.feature.getProperty(currHeatmap);
        var checkboxId = "#lgd-" + value;
        $(checkboxId).removeClass("checkbox-highlight");
        var heatmapValue = "#heatmap-value" + value;
        $(heatmapValue).removeClass("highlight-text");
        map.data.revertStyle();
        var suburbDisplay = document.getElementById('suburb-hover-id');
        suburbDisplay.innerHTML = "";

    });
}
var count = 1;
var map;
var currHeatmap = "housePrice";
var colorValues = [
    "#6FB33B", // 0
    "#94B846", // 1
    "#b6bf2e", // 2
    "#bb9d24", // 3
    "#b7711b", // 4
    "#b34112", // 5
    "#af100a", // 6
    "#9B0223", // 7
    "#bbbbbb" // 8
];

var legendText = {
    "numSchools": ['0', '1', '2', '3', '4', '5', '6', '> 6','# of Schools'],
    "housePrice": ['< 500K','500K - 750K', '750K - 1M', '1M - 1.25M', '1.25M - 1.5M', '1.5M - 2M', '2M - 3M', '> 3M', 'House Price ($)'],
    "houseRentalPrice": ['< 400','400 - 500', '500 - 600', '600 - 700', '700 - 800', '800 - 900', '900 - 1000', '> 1000', 'House Rent Price ($)'],
    "unitPrice": ['< 400K','400K - 500K', '500K - 600K', '600K - 700K', '700K - 800K', '800K - 900K', '900K - 1M', '> 1M', 'Unit Price ($)'],
    "unitRentalPrice": ['< 400','400 - 450', '450 - 500', '500 - 550', '550 - 600', '600 - 650', '650 - 700', '> 700', 'Unit Rent Price ($)'],
    "timeToCbdPublic": ['0 - 30', '30 - 45', '45 - 60', '60 - 75', '75 - 90', '90 - 105', '105 - 120', '> 120', 'Time to CBD (mins)'],
    "timeToCbdPrivate": ['0 - 10', '10 - 20', '20 - 30', '30 - 40', '40 - 50', '50 - 60', '60 - 70', '> 70', 'Time to CBD (mins)']
}

var heatmapButtonIds = {
    "housePrice": "house-price",
    "houseRentalPrice": "house-rent",
    "unitPrice": "unit-price",
    "unitRentalPrice": "unit-rent",
    "timeToCbdPublic": "travel-time-public",
    "timeToCbdPrivate": "travel-time-private",
}

var heatmaps = {
    "numSchools": [1, 1, 1, 1, 1, 1, 1, 1, 1],
    "housePrice": [1, 1, 1, 1, 1, 1, 1, 1, 1],
    "houseRentalPrice": [1, 1, 1, 1, 1, 1, 1, 1, 1],
    "unitPrice": [1, 1, 1, 1, 1, 1, 1, 1, 1],
    "unitRentalPrice": [1, 1, 1, 1, 1, 1, 1, 1, 1],
    "timeToCbdPublic": [1, 1, 1, 1, 1, 1, 1, 1, 1],
    "timeToCbdPrivate": [1, 1, 1, 1, 1, 1, 1, 1, 1]
};

function changeHeatmap(heatmap) {
    // console.log(heatmap);
    changeLegendText(heatmap);
    highlightSelectedHeatmap(heatmap);
    // unchecking checkbox for heatmap ranges
    map.data.setStyle(function(feature) {
        var value = feature.getProperty(heatmap);
        var color = colorValues[value];
        var opacity = 0.25;

        if (!feature.getProperty('isColorful')) {
            // color = feature.getProperty(heatmap);
            opacity = 0.88;
        }
        if (!heatmaps[currHeatmap][value]) {
            return {
                fillColor: color,
                fillOpacity: 0.1,
                strokeColor: "grey",
                strokeWeight: 0.1
            };
        } else {
            return {
                fillColor: color,
                fillOpacity: opacity,
                strokeColor: color,
                strokeWeight: 1
            };
        }
    });
}



function changeLegendText(heatmap) {
    document.getElementById('units').innerHTML = '<b>' + legendText[heatmap][8] + '</b>';
    document.getElementById('heatmap-value0').innerHTML = legendText[heatmap][0];
    document.getElementById('heatmap-value1').innerHTML = legendText[heatmap][1];
    document.getElementById('heatmap-value2').innerHTML = legendText[heatmap][2];
    document.getElementById('heatmap-value3').innerHTML = legendText[heatmap][3];
    document.getElementById('heatmap-value4').innerHTML = legendText[heatmap][4];
    document.getElementById('heatmap-value5').innerHTML = legendText[heatmap][5];
    document.getElementById('heatmap-value6').innerHTML = legendText[heatmap][6];
    document.getElementById('heatmap-value7').innerHTML = legendText[heatmap][7];
}

function highlightSelectedHeatmap(heatmap) {
    buttonId = "#" + heatmapButtonIds[heatmap];
    cmpButtonId = "#cmp-" + heatmapButtonIds[heatmap];

    for (var key in heatmapButtonIds){
        tmp = "#" + heatmapButtonIds[key];
        $(tmp).removeClass("heatmap-selected");
        tmp = "#cmp-" + heatmapButtonIds[key];
        $(tmp).removeClass("heatmap-selected");
    }

    $(buttonId).addClass("heatmap-selected");
    $(cmpButtonId).addClass("heatmap-selected");
}

function capitaliseFirstLetter(string) {
    return string.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
