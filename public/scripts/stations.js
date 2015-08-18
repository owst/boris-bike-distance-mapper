define(['stationLoader', 'directions'], function(stationLoader, directions) {
    var stations = [];
    var highlightedStations = [];
    var visibleStations = [];
    var highlight = {
        circle: null,
        station: null
    };
    var currentBounds = null;

    function clearAnyHighlightAndRoute() {
        // Hide the current circle and route if there are either.
        if (highlight.circle) {
            highlight.circle.setMap(null);
        }

        directions.clearRoute();
    }

    function highlightStation(station) {
        highlight.circle = new google.maps.Circle({
            map: map,
            radius: 5000, // meters
            fillColor: '#AA0000'
        });

        highlight.circle.bindTo('center', station.marker, 'position');
        highlight.station = station;
    }

    // TODO: name better
    function setNewHighLightedStation(station) {
        clearAnyHighlightAndRoute();

        highlightStation(station);

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

    function setRouteBetweenStations(start, end) {
        directions.showRouteBetween(highlight.station, station);

        $.map(stations, function(station) {
            station.setVisible([start, end].indexOf(station) !== -1);
        });
    }

    function clickStationCallback(station) {
        if (highlight.station !== station) {
            if (station.highlighted) {
                setRouteBetweenStations(highlight.station, station);
            } else {
                setNewHighLightedStation(station);
            }
        }
    }

    return {
        loadStations: function() {
            stationLoader.loadStations(function(loaded_stations) {
                stations = loaded_stations;

                $.map(stations, function(station) {
                    station.setClickCallback(clickStationCallback);
                });

            });
        },
        updateVisibleStations: function() {
            var mapBounds = map.getBounds();

            if (mapBounds !== currentBounds) {

                $.map(stations, function(station) {
                    var inBounds = station.inBounds(mapBounds);

                    station.setVisible(inBounds);
                });

                currentBounds = mapBounds;
            }
        }
    };
});
