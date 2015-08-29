require(["app/stations", "app/navigator"], function(stations, navigator) {
    // TODO: do we really require all of jQuery? I think we only use it for map/each
    stations.loadStations();
    navigator.moveToBrowserLocationIfPossible();
});
