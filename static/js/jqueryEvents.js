$(document).ready(function() {

    $.getJSON('../suburbs.json?simple=True', function(data) {
        suburbData = data;
        console.log(suburbData);
    });


    var stringHousePrice = "";
    var stringUnitPrice = "";
    var stringSalary = "";
    var stringTravelTime = "";
    var cmpContentString = "";

    $('[data-toggle="tooltip"]').tooltip();

    $('[data-toggle="map-tooltip"]').tooltip();

    // When the user clicks on the page-content-wrapper button it will toggle the sidebarExpanded class
    $("#page-content-toggle").click(function(event) {
        // Prevents the default action linked to this event
        // e.g. href="#" is not activated on click
        event.preventDefault();
        // Switches the glyphicon from > to <
        $(this).find('i').toggleClass('fa-chevron-right').toggleClass('fa-chevron-left');
        $("#wrapper").toggleClass("sidebarExpanded");

        var description = document.getElementById('description');
        // var schoolsInfo = document.getElementById('schools-info');
        // var transportInfo = document.getElementById('transport-info');


        // Gets the id of the html element and clears the text
        if ($("#wrapper").hasClass('sidebarExpanded')) {

            $("#sidebar-wrapper").css({
                "background-color": "white",
                "color": "black"
            });
            $("#detailed-info").css("display", "inline");

            $("#summary").css("display", "none");

            var descriptionString = suburbData[lastClickedSuburbIndex].description;
            // console.log(descriptionString)
            var suburbName = suburbData[lastClickedSuburbIndex].name;
            suburbName = suburbName.replace(/ /g, "_");

            var panelHousePrice = document.getElementById('panel-house-price');
            var panelHouseRent = document.getElementById('panel-house-rent');
            var panelUnitPrice = document.getElementById('panel-unit-price');
            var panelUnitRent = document.getElementById('panel-unit-rent');

            var housePriceValue = (suburbData[lastClickedSuburbIndex].housePrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            var houseRentalValue = (suburbData[lastClickedSuburbIndex].houseRentalPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            var unitPriceValue = (suburbData[lastClickedSuburbIndex].unitPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            var unitRentalValue = (suburbData[lastClickedSuburbIndex].unitRentalPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            $("#primary-school-table").load("../schoolTable/" + suburbName + "?primary=True");
            $("#secondary-school-table").load("../schoolTable/" + suburbName + "?secondary=True");
            $("#hospital-table").load("../hospitalsTable/" + suburbName);
            $("#suburb-images-carousel").load("../suburbImageCarousel/" + suburbName);

            var iframe = document.getElementById('age-chart');
            iframe.src = "../ageChart/" + suburbName;
            console.log(iframe.src);
            // document.getElementById('age-chart').contentWindow.location.reload(true);

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

            panelHousePrice.innerHTML = housePriceValue;
            panelHouseRent.innerHTML = houseRentalValue;
            panelUnitPrice.innerHTML = unitPriceValue;
            panelUnitRent.innerHTML = unitRentalValue;

            description.innerHTML = descriptionString;

        } else {

            $("#summary").css("display", "inline");
            $("#detailed-info").css("display", "none");

            $("#sidebar-wrapper").css({
                "background-color": "rgb(60, 60, 60)",
                "color": "#b5b5b7"
            });
        }

    });

    // When the user clicks on the checkbox the class cmpChecked will toggle on
    $('input:checkbox[name=suburb]').click(function(event) {
        $("#wrapper").toggleClass("cmpChecked");
        if (!$("#wrapper").hasClass('cmpChecked')) {
            $("#wrapper").removeClass("cmpSuburbClicked");

            // document.getElementById('cmp-suburb').innerHTML = "";
            // document.getElementById('cmp-summary').innerHTML = "";
            if (cmpLayer.feature.getProperty('name') != lastClickedLayer.feature.getProperty('name')) {
                lastClickedLayer.feature.setProperty('isColorful', false);
                lastClickedLayer = cmpLayer;
            }
            // console.log(lastClickedLayer, cmpLayer);
        }
    });

    $("#close-sidebar").click(function(event) {
        event.preventDefault();
        // if ($("#wrapper").hasClass('cmpSuburbClicked')) {
        if ($("#wrapper").hasClass('cmpChecked')) {

            $("#wrapper").toggleClass("cmpChecked");

            // console.log($("wrapper").hasClass("cmpSuburbClicked"));

            $("#wrapper").removeClass("cmpSuburbClicked");

            // document.getElementById('cmp-suburb').innerHTML = "";
            // document.getElementById('cmp-summary').innerHTML = "";
            document.getElementById('cmp-suburb').innerHTML = "Select a Suburb";

            document.getElementById('cmp-house-price').innerHTML = "<br>";
            document.getElementById('cmp-house-rent').innerHTML = "<br>";

            document.getElementById('cmp-unit-price').innerHTML = "<br>";
            document.getElementById('cmp-unit-rent').innerHTML = "<br>";

            document.getElementById('cmp-salary').innerHTML = "<br>";

            document.getElementById('cmp-travel-time-private').innerHTML = "<br>";
            document.getElementById('cmp-travel-time-public').innerHTML = "<br>";
            if (cmpLayer.feature.getProperty('name') != lastClickedLayer.feature.getProperty('name')) {
                lastClickedLayer.feature.setProperty('isColorful', false);
                lastClickedLayer = cmpLayer;
                // console.log("click here");
            }
            $("#add-suburb").find('i').toggleClass('fa-plus').toggleClass('fa-times');
            $("#wrapper").toggleClass("clicked");
            $("#close-sidebar").css("display", "none");

            var housePriceValue = (suburbData[cmpSuburbIndex].housePrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            var houseRentalValue = (suburbData[cmpSuburbIndex].houseRentalPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            var unitPriceValue = (suburbData[cmpSuburbIndex].unitPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            var unitRentalValue = (suburbData[cmpSuburbIndex].unitRentalPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            var salaryValue = (suburbData[cmpSuburbIndex].averageSalary).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

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
            travelTimeStringPrivate = suburbData[cmpSuburbIndex].timeToCbdPrivate + '<br>';
            travelTimeStringPublic = suburbData[cmpSuburbIndex].timeToCbdPublic;

            document.getElementById('house-price').innerHTML = housePriceString;
            document.getElementById('house-rent').innerHTML = houseRentString;

            document.getElementById('unit-price').innerHTML = unitPriceString;
            document.getElementById('unit-rent').innerHTML = unitRentString;

            document.getElementById('salary').innerHTML = salaryString;

            document.getElementById('travel-time-private').innerHTML = travelTimeStringPrivate;
            document.getElementById('travel-time-public').innerHTML = travelTimeStringPublic;
        }

    });

    $("#add-suburb").click(function(event) {
        $(this).find('i').toggleClass('fa-plus').toggleClass('fa-times');
        $("#wrapper").toggleClass("clicked");
        // $("add-suburb").css("display", "none");

        // IF !clicked that then you close this sidebar by replacing the data containe in it
        if (!$("#wrapper").hasClass("clicked")) {

            var housePriceValue = (suburbData[lastClickedSuburbIndex].housePrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            var houseRentalValue = (suburbData[lastClickedSuburbIndex].houseRentalPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            var unitPriceValue = (suburbData[lastClickedSuburbIndex].unitPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            var unitRentalValue = (suburbData[lastClickedSuburbIndex].unitRentalPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            var salaryValue = (suburbData[lastClickedSuburbIndex].averageSalary).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            // console.log("<<<<<<<<<<<<<<<<");
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
            travelTimeStringPrivate = suburbData[lastClickedSuburbIndex].timeToCbdPrivate + '<br>';
            travelTimeStringPublic = suburbData[lastClickedSuburbIndex].timeToCbdPublic;

            document.getElementById('suburb').innerHTML = document.getElementById('cmp-suburb').innerHTML;

            document.getElementById('house-price').innerHTML = housePriceString;
            document.getElementById('house-rent').innerHTML = houseRentString;

            document.getElementById('unit-price').innerHTML = unitPriceString;
            document.getElementById('unit-rent').innerHTML = unitRentString;

            document.getElementById('salary').innerHTML = salaryString;

            document.getElementById('travel-time-private').innerHTML = travelTimeStringPrivate;
            document.getElementById('travel-time-public').innerHTML = travelTimeStringPublic;
            // $("#add-suburb").css("display", "none");
            // console.log($("wrapper").hasClass("cmpSuburbClicked"));
            // $("#cmp-summary").css("display", "none");

            if (lastClickedLayer == cmpLayer) {
                $("#add-suburb").css("display", "none");
                $("#wrapper").removeClass("showSidebar");

            }
            console.log("inner X clicked");
            console.log("cmpLayer: ", cmpLayer.feature.getProperty('name'),
                "lastClickedLayer: ", lastClickedLayer.feature.getProperty('name'));
            if (cmpLayer.feature.getProperty('name') != lastClickedLayer.feature.getProperty('name')) {
                cmpLayer.feature.setProperty('isColorful', false);
                cmpLayer = lastClickedLayer;
                // lastClickedLayer = cmpLayer;
                // cmpLayer = undefined;
            }

        } else {
            // $("#cmp-summary").css("display", "inline");

            document.getElementById('cmp-suburb').innerHTML = "Select a Suburb";

            document.getElementById('cmp-house-price').innerHTML = "<br>";
            document.getElementById('cmp-house-rent').innerHTML = "<br>";

            document.getElementById('cmp-unit-price').innerHTML = "<br>";
            document.getElementById('cmp-unit-rent').innerHTML = "<br>";

            document.getElementById('cmp-salary').innerHTML = "<br>";

            document.getElementById('cmp-travel-time-private').innerHTML = "<br>";
            document.getElementById('cmp-travel-time-public').innerHTML = "<br>";
        }

        $("#wrapper").toggleClass("cmpChecked");
        if (!$("#wrapper").hasClass('cmpChecked')) {
            $("#wrapper").removeClass("cmpSuburbClicked");

            // document.getElementById('cmp-suburb').innerHTML = "";
            // document.getElementById('cmp-summary').innerHTML = "";
            console.log("cmpLayer: ", cmpLayer.feature.getProperty('name'),
                "lastClickedLayer: ", lastClickedLayer.feature.getProperty('name'));
            if (cmpLayer == undefined || cmpLayer.feature.getProperty('name') != lastClickedLayer.feature.getProperty('name')) {
                lastClickedLayer.feature.setProperty('isColorful', false);
            }
            lastClickedLayer = cmpLayer;
        }

    });

    $('.carousel').carousel({
        interval: 6000
    });


    // $('ul.nav.nav-pills li a').click(function() {
    //     $(this).parent().addClass('active').siblings().removeClass('active');
    // });
});
