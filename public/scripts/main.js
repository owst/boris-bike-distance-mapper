require(["init", "stations", "navigator"], function(init, stations, navigator) {
    // TODO: use requirejs to require the gmaps api.
    map = init.initializeMap();
    infowindow = new google.maps.InfoWindow();
    directionsDisplay = new google.maps.DirectionsRenderer({
        suppressBicyclingLayer: true,
        suppressInfoWindows: false,
        suppressMarkers: true,
        preserveViewport: true
    });
    directionsService = new google.maps.DirectionsService();
    directionsDisplay.setMap(map);

    stations.loadStations();

    navigator.moveToBrowserLocationIfPossible();

    google.maps.event.addListener(map, 'idle', function(){
        stations.updateVisibleStations();
    });
});
