define(["gmaps!", "jquery", "app/map", "app/stationLoader", "app/directions"], function(gmaps, $, map, stationLoader, directions) {
    var stations = [];
    var selection = {
        circle: null,
        startStation: null
    };

    function setSelection(station) {
        selection.circle = new gmaps.Circle({
            map: map,
            radius: 5000 // meters
        });

        selection.circle.bindTo("center", station.marker, "position");
        station.setSelected(true);
        selection.startStation = station;
    }

    function clearSelection() {
        selection.circle.setMap(null);
        selection.startStation.setSelected(false);
        selection.startStation = null;
    }

    function clickStationCallback(station) {
        directions.clearRoute();

        if (selection.startStation === null) {
            setSelection(station);
        } else if (selection.startStation !== station) {
            directions.showRouteBetween(selection.startStation, station);
        } else {
            clearSelection();
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
        }
    };
});
