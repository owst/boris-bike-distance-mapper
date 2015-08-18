require(["init", "stations", "navigator"], function(init, stations, navigator) {
    // TODO: use requirejs to require the gmaps api.
    map = init.initializeMap();
    infowindow = new google.maps.InfoWindow();

    stations.loadStations();

    navigator.moveToBrowserLocationIfPossible();

    google.maps.event.addListener(map, 'idle', function(){
        stations.updateVisibleStations();
    });
});
