define(function() {
    return {
        initializeMap: function() {
            var mapCanvas = document.getElementById('map-canvas');

            var mapOptions = {
                center: new google.maps.LatLng(51.5072, 0.1275),
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            return new google.maps.Map(mapCanvas, mapOptions);
        }
    };
});
