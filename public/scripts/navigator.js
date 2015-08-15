define(function() {
    return {
        moveToBrowserLocationIfPossible: function() {
            // Override center, if we can get it from the browser.
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    map.setCenter(
                        new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
                    );
                });
            }
        }
    };
});
