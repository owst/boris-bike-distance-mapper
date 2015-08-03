require(["init", "stations"], function(init, stations) {
    // TODO: use requirejs to require the gmaps api.
    var map = init.initialize();

    stations.drawStations(map);
});
