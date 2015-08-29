define(["gmaps!", "app/map", "spin.min"], function (gmaps, map, Spinner) {
    var opts = {
        lines: 17,
        length: 30,
        width: 9,
        radius: 30,
        scale: 0.5,
        corners: 1,
        color: "#006",
        opacity: 0.25,
        rotate: 0,
        direction: 1,
        speed: 1.2,
        trail: 70,
        fps: 20,
        zIndex: 2e9,
        className: "spinner",
        top: "50%",
        left: "50%",
        shadow: false,
        hwaccel: true,
        markerPosition: "absolute"
    };

    var spinner = new Spinner(opts);
    var loadingElement = document.getElementById("loading");

    // Used to get the x,y coordinate of a marker, relative to the map div.
    var overlay = new gmaps.OverlayView();
    overlay.draw = function() {};
    overlay.setMap(map);

    function moveLoadingElementToPositionOf(marker) {
        var proj = overlay.getProjection();
        var markerPos = marker.getLatLng();
        var point = proj.fromLatLngToContainerPixel(markerPos);
        var style = loadingElement.style;
        style.left = point.x + "px";
        style.top = point.y + "px";
    }

    return {
        removeSpinner: function () {
            spinner.spin(false);
        },
        addSpinnerAt: function(marker) {
            moveLoadingElementToPositionOf(marker);
            spinner.spin(loadingElement);
        }
    };
});
