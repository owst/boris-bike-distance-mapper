console.log('stations');

define(['app/stationLoader', 'app/directions'], function(stationLoader, directions) {
    var stations = [];
    var highlightedStations = [];
    var visibleStations = [];
    var highlight = {
        circle: null,
        station: null
    };
    var currentBounds = null;

    function setHighlight(station) {
        highlight.circle = new google.maps.Circle({
            map: map,
            radius: 5000 // meters
        });

        highlight.circle.bindTo('center', station.marker, 'position');
        station.setSelected(true);
        highlight.station = station;
    }

    function clearHighlight() {
        highlight.circle.setMap(null);
        highlight.station.setSelected(false);
        highlight.station = null;
    }

    function clickStationCallback(station) {
        directions.clearRoute();

        if (highlight.station === null) {
            setHighlight(station);
        } else if (highlight.station !== station) {
            directions.showRouteBetween(highlight.station, station);
        } else {
            clearHighlight();
        }
    }

    return {
        loadStations: function() {
            stationLoader.loadStations(function(loaded_stations) {
                stations = loaded_stations;

                $.each(stations, function(id, station) {
                    station.setClickCallback(clickStationCallback);
                });

            });
        },
        updateVisibleStations: function() {
            var mapBounds = map.getBounds();

            if (mapBounds !== currentBounds) {

                $.each(stations, function(id, station) {
                    var inBounds = station.inBounds(mapBounds);

                    station.setVisible(inBounds);
                });

                currentBounds = mapBounds;
            }
        }
    };
});
