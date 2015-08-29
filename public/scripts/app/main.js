require(["gmaps!", "app/map", "app/stations", "app/navigator"], function(gmaps, map, stations, navigator) {
    // TODO: do we really require all of jQuery? I think we only use it for map/each
    // TODO: use requirejs to require the gmaps api.
    stations.loadStations();

    navigator.moveToBrowserLocationIfPossible();

    gmaps.event.addListener(map, "idle", function(){
        stations.updateVisibleStations();
    });
});
