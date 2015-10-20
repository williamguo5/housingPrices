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

	var heatmaps = {
		"numSchools": [1, 1, 1, 1, 1, 1, 1, 1, 1],
	    "housePrice": [1, 1, 1, 1, 1, 1, 1, 1, 1],
	    "houseRentalPrice": [1, 1, 1, 1, 1, 1, 1, 1, 1],
	    "unitPrice": [1, 1, 1, 1, 1, 1, 1, 1, 1],
	    "unitRentalPrice": [1, 1, 1, 1, 1, 1, 1, 1, 1],
	    "timeToCbdPublic": [1, 1, 1, 1, 1, 1, 1, 1, 1],
	    "timeToCbdPrivate": [1, 1, 1, 1, 1, 1, 1, 1, 1]
	};


	$("#heatmap-housing").addClass('selected');
    $("#heatmap-housing").click(function(event){
		currHeatmap = "housePrice";
		replaceCheckboxes();
        changeHeatmap("housePrice", heatmaps[currHeatmap]);

		$(this).addClass('selected');
		$("#heatmap-schools").removeClass('selected');
		$("#heatmap-transport").removeClass('selected');
        document.getElementById('units').innerHTML = '<b>' + 'House Price ($)' + '</b>';
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
		currHeatmap = "numSchools";
		replaceCheckboxes();
        changeHeatmap("numSchools", heatmaps[currHeatmap])

		// $(this).css({background:"blue"});
		$(this).addClass('selected');
		$("#heatmap-housing").removeClass('selected');
		$("#heatmap-transport").removeClass('selected');
        document.getElementById('units').innerHTML = '<b>' + '# of Schools' + '</b>';
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
		currHeatmap = "timeToCbdPublic";
		replaceCheckboxes();
       	changeHeatmap("timeToCbdPublic", heatmaps[currHeatmap]);

		$(this).addClass('selected');
		$("#heatmap-schools").removeClass('selected');
		$("#heatmap-housing").removeClass('selected');
        document.getElementById('units').innerHTML = '<b>' + 'Time to CBD (mins)' + '</b>';
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

            $("#summary").css("display", "inline");
            $("#detailed-info").css("display", "none");

            $("#sidebar-wrapper").css({"background-color":"rgb(60, 60, 60)", "color":"#b5b5b7"});




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

            // document.getElementById('cmp-suburb').innerHTML = "";
            // document.getElementById('cmp-summary').innerHTML = "";
            if (cmpLayer.feature.getProperty('name') != lastClickedLayer.feature.getProperty('name')) {
                lastClickedLayer.feature.setProperty('isColorful', false);
                lastClickedLayer = cmpLayer;
            }
            console.log(lastClickedLayer, cmpLayer);
        }
    });

    $("#close-sidebar").click(function(event){
        event.preventDefault();
        // if ($("#wrapper").hasClass('cmpSuburbClicked')) {
        if ($("#wrapper").hasClass('cmpChecked')) {

            $("#wrapper").toggleClass("cmpChecked");

            $("#wrapper").toggleClass("cmpSuburbClicked");

            // document.getElementById('cmp-suburb').innerHTML = "";
            // document.getElementById('cmp-summary').innerHTML = "";
            document.getElementById('cmp-suburb').innerHTML = "";
            
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
                console.log("click here");
            }
            $("#add-suburb").find('i').toggleClass('fa-plus').toggleClass('fa-times');
            $("#wrapper").toggleClass("clicked");

        } 
        // else {
        //     // $("#wrapper").toggleClass("cmpChecked");

        //     // if (!$("#wrapper").hasClass("cmpChecked")) {
        //     //     $("#wrapper").toggleClass("cmpChecked");
        //     //     $("#wrapper").removeClass("cmpSuburbClicked");



        //     //     $('#cmp-checkbox').attr('checked', false);
        //     // }
        //     $("#wrapper").toggleClass("showSidebar");
        //     lastClickedLayer.feature.setProperty('isColorful', false);
        //     console.log(cmpLayer);
        // }
        //$("#wrapper").removeClass('#page-content-toggle');


    });

    $("#add-suburb").click(function(event) {
        $(this).find('i').toggleClass('fa-plus').toggleClass('fa-times');
        $("#wrapper").toggleClass("clicked");
        // $("add-suburb").css("display", "none");

        // IF !clicked that then you close this sidebar by replacing the data containe in it
        if (!$("#wrapper").hasClass("clicked")) {
            
            document.getElementById('suburb').innerHTML = document.getElementById('cmp-suburb').innerHTML;
            
            document.getElementById('house-price').innerHTML = document.getElementById('cmp-house-price').innerHTML;
            document.getElementById('house-rent').innerHTML = document.getElementById('cmp-house-rent').innerHTML;
            
            document.getElementById('unit-price').innerHTML = document.getElementById('cmp-unit-price').innerHTML;
            document.getElementById('unit-rent').innerHTML = document.getElementById('cmp-unit-rent').innerHTML;
            
            document.getElementById('salary').innerHTML = document.getElementById('cmp-salary').innerHTML;

            document.getElementById('travel-time-private').innerHTML = document.getElementById('cmp-travel-time-private').innerHTML;
            document.getElementById('travel-time-public').innerHTML = document.getElementById('cmp-travel-time-public').innerHTML;
            // $("#add-suburb").css("display", "none");
            if (!$("wrapper").hasClass('cmpSuburbClicked')) {
                $("#add-suburb").css("display", "none");
                $("#wrapper").removeClass("showSidebar");

            }
        } else {

        }

        $("#wrapper").toggleClass("cmpChecked");
        if (!$("#wrapper").hasClass('cmpChecked')) {
            $("#wrapper").removeClass("cmpSuburbClicked");

            // document.getElementById('cmp-suburb').innerHTML = "";
            // document.getElementById('cmp-summary').innerHTML = "";
            if (cmpLayer.feature.getProperty('name') != lastClickedLayer.feature.getProperty('name')) {
                lastClickedLayer.feature.setProperty('isColorful', false);
            }
            lastClickedLayer = cmpLayer;
        }

    });

    $('.carousel').carousel({
        interval: 6000
    })

    $('ul.nav.nav-pills li a').click(function() {
        $(this).parent().addClass('active').siblings().removeClass('active');
    });
	$('input:checkbox[name=lgd-checkbox0]').change(function(event){
		heatmaps[currHeatmap][0] += 1;
		heatmaps[currHeatmap][0] %= 2;
		changeHeatmap(currHeatmap, heatmaps[currHeatmap]);

	});
	$('input:checkbox[name=lgd-checkbox1]').change(function(event){
		heatmaps[currHeatmap][1] += 1;
		heatmaps[currHeatmap][1] %= 2;
		changeHeatmap(currHeatmap, heatmaps[currHeatmap]);
	});
	$('input:checkbox[name=lgd-checkbox2]').change(function(event){
		heatmaps[currHeatmap][2] += 1;
		heatmaps[currHeatmap][2] %= 2;
		changeHeatmap(currHeatmap, heatmaps[currHeatmap]);
	});
	$('input:checkbox[name=lgd-checkbox3]').change(function(event){
		heatmaps[currHeatmap][3] += 1;
		heatmaps[currHeatmap][3] %= 2;
		changeHeatmap(currHeatmap, heatmaps[currHeatmap]);
	});
	$('input:checkbox[name=lgd-checkbox4]').change(function(event){
		heatmaps[currHeatmap][4] += 1;
		heatmaps[currHeatmap][4] %= 2;
		changeHeatmap(currHeatmap, heatmaps[currHeatmap]);
	});
	$('input:checkbox[name=lgd-checkbox5]').change(function(event){
		heatmaps[currHeatmap][5] += 1;
		heatmaps[currHeatmap][5] %= 2;
		changeHeatmap(currHeatmap, heatmaps[currHeatmap]);
	});
	$('input:checkbox[name=lgd-checkbox6]').change(function(event){
		heatmaps[currHeatmap][6] += 1;
		heatmaps[currHeatmap][6] %= 2;
		changeHeatmap(currHeatmap, heatmaps[currHeatmap]);
	});
	$('input:checkbox[name=lgd-checkbox7]').change(function(event){
		heatmaps[currHeatmap][7] += 1;
		heatmaps[currHeatmap][7] %= 2;
		changeHeatmap(currHeatmap, heatmaps[currHeatmap]);
	});

	function replaceCheckboxes(){
		if(heatmaps[currHeatmap][0] == 1){
			$('input:checkbox[name=lgd-checkbox0]').prop("checked", true);
		}else{
			$('input:checkbox[name=lgd-checkbox0]').prop("checked", false);
		}
		if(heatmaps[currHeatmap][1] == 1){
			$('input:checkbox[name=lgd-checkbox1]').prop("checked", true);
		}else{
			$('input:checkbox[name=lgd-checkbox1]').prop("checked", false);
		}
		if(heatmaps[currHeatmap][2] == 1){
			$('input:checkbox[name=lgd-checkbox2]').prop("checked", true);
		}else{
			$('input:checkbox[name=lgd-checkbox2]').prop("checked", false);
		}
		if(heatmaps[currHeatmap][3] == 1){
			$('input:checkbox[name=lgd-checkbox3]').prop("checked", true);
		}else{
			$('input:checkbox[name=lgd-checkbox3]').prop("checked", false);
		}
		if(heatmaps[currHeatmap][4] == 1){
			$('input:checkbox[name=lgd-checkbox4]').prop("checked", true);
		}else{
			$('input:checkbox[name=lgd-checkbox4]').prop("checked", false);
		}
		if(heatmaps[currHeatmap][5] == 1){
			$('input:checkbox[name=lgd-checkbox5]').prop("checked", true);
		}else{
			$('input:checkbox[name=lgd-checkbox5]').prop("checked", false);
		}
		if(heatmaps[currHeatmap][6] == 1){
			$('input:checkbox[name=lgd-checkbox6]').prop("checked", true);
		}else{
			$('input:checkbox[name=lgd-checkbox6]').prop("checked", false);
		}
		if(heatmaps[currHeatmap][7] == 1){
			$('input:checkbox[name=lgd-checkbox7]').prop("checked", true);
		}else{
			$('input:checkbox[name=lgd-checkbox7]').prop("checked", false);
		}
	}

});

