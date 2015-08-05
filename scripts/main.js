require(["init", "stations"], function(init, stations) {
    // TODO: use requirejs to require the gmaps api.
    var map = init.initialize();

    // Override center, if we can get it from the browser.
    if (navigator.geolocation) {
        console.log('using navigator location');
        navigator.geolocation.getCurrentPosition(function (position) {
            map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
        });
    }


    google.maps.event.addListener(map, 'idle', function(){ stations.drawStations(map); });
});
