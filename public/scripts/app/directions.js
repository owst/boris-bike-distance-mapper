define(["gmaps!", "app/map", "app/spinner_helper"], function(gmaps, map, spinnerHelper) {
    var directionsDisplay = new gmaps.DirectionsRenderer({
        suppressBicyclingLayer: true,
        suppressInfoWindows: false,
        suppressMarkers: true,
        preserveViewport: true
    });

    var directionsService = new gmaps.DirectionsService();

    function showRouteBetween(start, end) {
        spinnerHelper.addSpinnerAt(end);

        var request = {
            origin: start.getLatLng(),
            destination: end.getLatLng(),
            travelMode: gmaps.TravelMode.BICYCLING
        };

        var routeData = {};

        directionsService.route(request, function(response, status) {
            if (status == gmaps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                directionsDisplay.setMap(map);
                spinnerHelper.removeSpinner();
                var leg = response.routes[0].legs[0];
                routeData.distance = leg.distance.text;
                routeData.duration = leg.duration.text;
            }
        });

        return routeData;
    }

    function clearRoute() {
        directionsDisplay.setMap(null);
    }

    return {
        clearRoute: clearRoute,
        showRouteBetween: showRouteBetween
    };
});
