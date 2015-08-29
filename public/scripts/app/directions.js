define(["gmaps!", "app/map", "app/spinner_helper"], function(gmaps, map, spinnerHelper) {
    var directionsDisplay = new gmaps.DirectionsRenderer({
        suppressBicyclingLayer: true,
        suppressInfoWindows: false,
        suppressMarkers: true,
        preserveViewport: true
    });

    var directionsService = new gmaps.DirectionsService();

    function showRouteBetween(start, end) {
        spinnerHelper.moveLoadingElementToPositionOf(end);

        var request = {
            origin: start.getLatLng(),
            destination: end.getLatLng(),
            travelMode: gmaps.TravelMode.BICYCLING
        };

        spinnerHelper.addSpinner();

        directionsService.route(request, function(response, status) {
            if (status == gmaps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                directionsDisplay.setMap(map);
                //     var leg = response.routes[0].legs[0];
                //     console.log('Route: ' + leg.distance.text + ', ~' + leg.duration.text);
                spinnerHelper.removeSpinner();
            }
        });
    }

    function clearRoute() {
        directionsDisplay.setMap(null);
    }

    return {
        clearRoute: clearRoute,
        showRouteBetween: showRouteBetween
    };
});
