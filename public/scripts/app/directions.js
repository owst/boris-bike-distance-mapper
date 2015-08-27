define(["app/spinner_helper"],function(spinnerHelper) {
    var directionsDisplay = new google.maps.DirectionsRenderer({
        suppressBicyclingLayer: true,
        suppressInfoWindows: false,
        suppressMarkers: true,
        preserveViewport: true
    });

    var directionsService = new google.maps.DirectionsService();

    function showRouteBetween(start, end) {
        var request = {
            origin: start.getLatLng(),
            destination: end.getLatLng(),
            travelMode: google.maps.TravelMode.BICYCLING
        };

        // TODO: get this working!
        //spinnerHelper.addSpinnerTo();

        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                directionsDisplay.setMap(map);
                var leg = response.routes[0].legs[0];
                console.log('Route: ' + leg.distance.text + ', ~' + leg.duration.text);
                spinnerHelper.removeSpinner();
            } else {
                console.log("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
            }
        });
    }

    function clearRoute() {
        //directionsDisplay.setDirections(null);
        directionsDisplay.setMap(null);
    }

    return {
        clearRoute: clearRoute,
        showRouteBetween: showRouteBetween
    };
});
