define(["gmaps!"], function(gmaps) {
    var mapOptions = {
        // Use the approximate center of all boris bike stations.
        center: new gmaps.LatLng(51.52352626361478, -0.1154064172498881),
        zoom: 13,
        mapTypeId: gmaps.MapTypeId.ROADMAP
    };

    return new gmaps.Map(document.getElementById("map-canvas"), mapOptions);
});
