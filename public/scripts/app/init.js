define(function() {
    return {
        initializeMap: function() {
            var mapCanvas = document.getElementById('map-canvas');

            var mapOptions = {
                center: new google.maps.LatLng(51.5022668, -0.1203357),
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            return new google.maps.Map(mapCanvas, mapOptions);
        }
    };
});
