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

    // when user clicks on the toggle heatmap button
	
	var heatmaps = [
		"numSchools",
        "housePrice",
        "houseRentalPrice",
        "unitPrice",
        "unitRentalPrice",
        "timeToCbdPublic",
        "timeToCbdPrivate"	
	];
	
	var currHeatmap = "housePrice";
	
	$("#heatmap-housing").addClass('selected');
    $("#heatmap-housing").click(function(event){
        changeHeatmap("housePrice");
		currHeatmap = "housePrice";
		$(this).addClass('selected');
		$("#heatmap-schools").removeClass('selected');
		$("#heatmap-transport").removeClass('selected');
        document.getElementById('units').innerHTML = '<b>' + 'Legend ($)' + '</b>';
        document.getElementById('heatmap-value1').innerHTML = '< 500K';
        document.getElementById('heatmap-value2').innerHTML = '500K - 750K';
        document.getElementById('heatmap-value3').innerHTML = '750K - 1M';
        document.getElementById('heatmap-value4').innerHTML = '1M - 1.25M';
        document.getElementById('heatmap-value5').innerHTML = '1.25M - 1.5M';
        document.getElementById('heatmap-value6').innerHTML = '1.5M - 2M';
        document.getElementById('heatmap-value7').innerHTML = '2M - 3M';
        document.getElementById('heatmap-value8').innerHTML = '> 3M';

    });

    $("#heatmap-schools").click(function(event){
        changeHeatmap("numSchools")
		currHeatmap = "numSchools";
		// $(this).css({background:"blue"});
		$(this).addClass('selected');
		$("#heatmap-housing").removeClass('selected');
		$("#heatmap-transport").removeClass('selected');
        document.getElementById('units').innerHTML = '<b>' + 'Legend (# of Schools)' + '</b>';
        document.getElementById('heatmap-value1').innerHTML = '0';
        document.getElementById('heatmap-value2').innerHTML = '1';
        document.getElementById('heatmap-value3').innerHTML = '2';
        document.getElementById('heatmap-value4').innerHTML = '3';
        document.getElementById('heatmap-value5').innerHTML = '4';
        document.getElementById('heatmap-value6').innerHTML = '5';
        document.getElementById('heatmap-value7').innerHTML = '6';
        document.getElementById('heatmap-value8').innerHTML = '> 6';

    });

    $("#heatmap-transport").click(function(event){
       	changeHeatmap("timeToCbdPublic");
		currHeatmap = "timeToCbdPublic";
		$(this).addClass('selected');
		$("#heatmap-schools").removeClass('selected');
		$("#heatmap-housing").removeClass('selected');
        document.getElementById('units').innerHTML = '<b>' + 'Legend (mins)' + '</b>';
        document.getElementById('heatmap-value1').innerHTML = '0 - 30';
        document.getElementById('heatmap-value2').innerHTML = '30 - 45';
        document.getElementById('heatmap-value3').innerHTML = '45 - 60';
        document.getElementById('heatmap-value4').innerHTML = '60 - 75';
        document.getElementById('heatmap-value5').innerHTML = '75 - 90';
        document.getElementById('heatmap-value6').innerHTML = '90 - 105';
        document.getElementById('heatmap-value7').innerHTML = '105 - 120';
        document.getElementById('heatmap-value8').innerHTML = '> 120';

    });


    // When the user clicks on the page-content-wrapper button it will toggle the sidebarExpanded class
    $("#page-content-toggle").click(function(event){
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

            $("#sidebar-wrapper").css({"background-color":"white", "color":"black"});
            $("#detailed-info").css("display", "inline");

            $("#summary").css("display", "none");
            var descriptionString = suburbData[lastClickedSuburbIndex].description;

            var panelHousePrice = document.getElementById('panel-house-price');
            var panelHouseRent = document.getElementById('panel-house-rent');
            var panelUnitPrice = document.getElementById('panel-unit-price');
            var panelUnitRent = document.getElementById('panel-unit-rent');

            var housePriceValue = (suburbData[lastClickedSuburbIndex].housePrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            var houseRentalValue = (suburbData[lastClickedSuburbIndex].houseRentalPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            var unitPriceValue = (suburbData[lastClickedSuburbIndex].unitPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            var unitRentalValue = (suburbData[lastClickedSuburbIndex].unitRentalPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            
            panelHousePrice.innerHTML = '$' + housePriceValue;
            panelHouseRent.innerHTML = '$' + houseRentalValue + ' p/w';
            panelUnitPrice.innerHTML = '$' + unitPriceValue;
            panelUnitRent.innerHTML = '$' + unitRentalValue + ' p/w';    

            description.innerHTML = descriptionString;

            // var schoolsString = '';

            // schoolsInfo.innerHTML = schoolsString;


            // var transportString = '';

            // transportInfo.innerHTML = transportString;

            // stringHousePrice = document.getElementById('house-price').innerHTML;
            // stringUnitPrice = document.getElementById('unit-price').innerHTML;
            // stringSalary = document.getElementById('salary').innerHTML;
            // stringTravelTime = document.getElementById('travel-time').innerHTML;

            // document.getElementById('house-price').innerHTML = "";
            // document.getElementById('unit-price').innerHTML = "";
            // document.getElementById('salary').innerHTML = "";
            // document.getElementById('travel-time').innerHTML = "";
                       

            // cmpContentString = document.getElementById('cmp-summary').innerHTML;
            // document.getElementById('summary').innerHTML = "";
            // document.getElementById('cmp-summary').innerHTML = "";
        } else {

            $("#sidebar-wrapper").css({"background-color":"rgb(60, 60, 60)", "color":"#b5b5b7"});
            $("#summary").css("display", "inline");


            // $("#sidebar-wrapper").delay(500);
            // $(".sidebar-open").css("display", "inline");

            // document.getElementById('house-price').innerHTML = stringHousePrice;
            // document.getElementById('unit-price').innerHTML = stringUnitPrice;
            // document.getElementById('salary').innerHTML = stringSalary;
            // document.getElementById('travel-time').innerHTML = stringTravelTime;
           
            // document.getElementById('summary').innerHTML = contentString;
            // document.getElementById('cmp-summary').innerHTML = cmpContentString;

            // // pricesInfo.innerHTML = "";
            // description.innerHTML = "";
            // schoolsInfo.innerHTML = "";
            // transportInfo.innerHTML = "";
        }

    });

    // When the user clicks on the checkbox the class cmpChecked will toggle on
    $('input:checkbox[name=suburb]').click(function(event){
        $("#wrapper").toggleClass("cmpChecked");
        if (!$("#wrapper").hasClass('cmpChecked')) {
            $("#wrapper").removeClass("cmpSuburbClicked");

            document.getElementById('cmp-suburb').innerHTML = "";
            document.getElementById('cmp-summary').innerHTML = "";
            if (cmpLayer.feature.getProperty('name') != lastClickedLayer.feature.getProperty('name')) {
                lastClickedLayer.feature.setProperty('isColorful', false);
            }
            lastClickedLayer = cmpLayer;
        }
    });

    $("#close-sidebar").click(function(event){
        event.preventDefault();
        if ($("#wrapper").hasClass('cmpSuburbClicked')) {

            $("#wrapper").toggleClass("cmpSuburbClicked");

            document.getElementById('cmp-suburb').innerHTML = "";
            document.getElementById('cmp-summary').innerHTML = "";
            if (cmpLayer.feature.getProperty('name') != lastClickedLayer.feature.getProperty('name')) {
                lastClickedLayer.feature.setProperty('isColorful', false);
            }
            lastClickedLayer = cmpLayer;

        } else {
            if ($("#wrapper").hasClass("cmpChecked")) {
                $("#wrapper").toggleClass("cmpChecked");
                $('#cmp-checkbox').attr('checked', false);
            }
            $("#wrapper").toggleClass("showSidebar");
            lastClickedLayer.feature.setProperty('isColorful', false);
        }

        //$("#wrapper").removeClass('#page-content-toggle');


    });

    $('.carousel').carousel({
        interval: 6000
    })

    $('ul.nav.nav-pills li a').click(function() {
        $(this).parent().addClass('active').siblings().removeClass('active');
    });
	
	
	// unchecking checkbox for heatmap ranges
	$('input:checkbox[name=lgd-checkbox0]').change(function(event){
		changeHeatmap(currHeatmap);
	});
	$('input:checkbox[name=lgd-checkbox1]').change(function(event){
		changeHeatmap(currHeatmap);
	});
	$('input:checkbox[name=lgd-checkbox2]').change(function(event){
		changeHeatmap(currHeatmap);
	});
	$('input:checkbox[name=lgd-checkbox3]').change(function(event){
		changeHeatmap(currHeatmap);
	});
	$('input:checkbox[name=lgd-checkbox4]').change(function(event){
		changeHeatmap(currHeatmap);
	});
	$('input:checkbox[name=lgd-checkbox5]').change(function(event){
		changeHeatmap(currHeatmap);
	});
	$('input:checkbox[name=lgd-checkbox6]').change(function(event){
		changeHeatmap(currHeatmap);
	});
	$('input:checkbox[name=lgd-checkbox7]').change(function(event){
		changeHeatmap(currHeatmap);
	});
});