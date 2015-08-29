define(["gmaps!", "app/map"], function(gmaps, map) {
    return {
        moveToBrowserLocationIfPossible: function() {
            // Override center, if we can get it from the browser.
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    map.setCenter(
                        new gmaps.LatLng(position.coords.latitude, position.coords.longitude)
                    );
                });
            }
        }
    };
});
