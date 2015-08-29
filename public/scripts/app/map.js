define(["gmaps!"], function(gmaps) {
    var mapCanvas = document.getElementById("map-canvas");

    var mapOptions = {
        center: new gmaps.LatLng(51.52352626361478, -0.1154064172498881),
        zoom: 13,
        mapTypeId: gmaps.MapTypeId.ROADMAP
    };

    var map = new gmaps.Map(mapCanvas, mapOptions);

    return map;
});
