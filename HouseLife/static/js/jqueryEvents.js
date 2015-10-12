$(document).ready(function() {

    $.getJSON('https://bitbucket.org/ak305/bootstraptest/raw/6b94b8f732344ca25b6c8053f273884b2f407473/suburbprices.json', function(data) {
        suburbPrices = data;
    });


    $.getJSON('https://bitbucket.org/ak305/bootstraptest/raw/c175a2734c9eb472de0f51139202f6cb994d54f4/traveltimes.json', function(data) {
        travelTimes = data;
    });

    var contentString = "";
    var cmpContentString = "";

    $('[data-toggle="tooltip"]').tooltip();

    $('[data-toggle="map-tooltip"]').tooltip();


    // when user clicks on the toggle heatmap button
	$("#heatmap-housing").addClass('selected');
    $("#heatmap-housing").click(function(event){
        heatmapHousing();
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
        heatmapSchools();
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
        heatmapHospitals();
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

        var pricesInfo = document.getElementById('prices-info');
        var schoolsInfo = document.getElementById('schools-info');
        var transportInfo = document.getElementById('transport-info');



        // Gets the id of the html element and clears the text
        if ($("#wrapper").hasClass('sidebarExpanded')) {
            var pricesString = 'Randwick was named after the village of Randwick, ' +
                'Gloucestershire, England, birthplace of Simeon Henry Pearce, ' +
                'who became Mayor of Randwick no less than six times.[3] Simeon and his brother James, ' +
                'who migrated to Australia in 1842, were responsible for the early development of Randwick as ' +
                'well as suburb Coogee.. Simeon lived in a house called Blenheim, which can still be seen ' +
                'in Blenheim Street. It was neglected for some time but was eventually acquired by' +
                ' Randwick Council and then restored.';





            pricesInfo.innerHTML = pricesString;

            var schoolsString = 'Primary schools in the area include Our Lady Of The Sacred Heart,[33] Coogee Public School,' +
                '[34] Claremont College,[35] Randwick Public School,[36] Coogee Preparatory School,' +
                '[37] The Joseph Varga School [38] and Rainbow Street Primary.[39] ' +
                'Secondary schools include two systemic Catholic schools, Brigidine College and Marcellin College,' +
                '[40] a Jewish day school Emanuel School [41] and three state schools, Randwick Boys High School,' +
                '[42] Randwick Girls\' High School,[43] and the Open High School.[44] ' +
                'Randwick North High School was closed in 2001 and the site was divided between Open High School and Randwick Public School.' +
                'There are branch campuses of the University of New South Wales and Sydney Institute of TAFE located in the area.[45]';

            schoolsInfo.innerHTML = schoolsString;


            var transportString = 'Randwick is currently only served by buses. ' +
                'The main bus corridor is Belmore Rd with buses to Bondi Junction, ' +
                'Burwood, Campsie, Coogee, Eastgardens, Maroubra, Sydney Airport and Sydney CBD.' +
                'On 13 December 2012, the NSW Government announced a commitment to build the ' +
                'CBD and South East Light Rail from Circular Quay down George Street to Central Station, ' +
                'then across to Moore Park and down Anzac Parade. South of Moore Park the line will spit into two branches' +
                ' - one of which will head to Randwick via Alison Road.[46] A bus/tram interchange will be established in Randwick' +
                ' and many of the bus routes that currently traverse Anzac Parade to access the city would be replaced by feeder routes' +
                ' connecting to the light rail.[47] In April 2014, Randwick City Council put forward a $68 million funding package' +
                ' in its bid to force significant changes to the state government\'s tram line from Circular Quay to the eastern suburbs,' +
                ' including Randwick suburb.[48]';

            transportInfo.innerHTML = transportString;

            contentString = document.getElementById('summary').innerHTML;
            cmpContentString = document.getElementById('cmp-summary').innerHTML;
            document.getElementById('summary').innerHTML = "";
            document.getElementById('cmp-summary').innerHTML = "";
        } else {

            document.getElementById('summary').innerHTML = contentString;
            document.getElementById('cmp-summary').innerHTML = cmpContentString;

            pricesInfo.innerHTML = "";
            schoolsInfo.innerHTML = "";
            transportInfo.innerHTML = "";
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

});