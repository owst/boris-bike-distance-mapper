define(['stationLoader'], function(stationLoader) {
    var stations = [];
    var highlightedStations = [];
    var visibleStations = [];
    var highlight = {
        circle: null,
        station: null
    };

    function loadStations() {
        stations = stations.concat(stationLoader.loadStations());

        $.map(stations, function(station) {
            station.setClickCallback(clickStationCallback);
        });
    }

    function clickStationCallback(station) {
        console.log('click callback');
        // Clear the circle of the previous clicked station.
        if (highlight.station !== station) {
            // Hide the current circle if there is one.
            if (highlight.circle) {
                highlight.circle.setMap(null);
            }

            highlight.circle = new google.maps.Circle({
                map: map,
                radius: 1000, // meters
                fillColor: '#AA0000'
            });

            highlight.circle.bindTo('center', station.marker, 'position');
            highlight.station = station;

            // clear existing highlights...
            $.map(highlightedStations, function(station) { station.setHighlighted(false); });

            // ...and set new highlights.
            $.map(stations, function(station) {
                if (station.inBounds(highlight.circle.getBounds())) {
                    station.setHighlighted(true);
                    highlightedStations.push(station);
                }
            });
        }
    }

    return {
        loadStations: loadStations,
        updateVisibleStations: function() {
            var mapBounds = map.getBounds();

            $.map(stations, function(station) {
                var inBounds = station.inBounds(mapBounds);

                station.setVisible(inBounds);
            });
        }
    };
});
