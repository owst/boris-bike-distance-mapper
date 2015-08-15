define(['stationLoader'], function(stationLoader) {
    var stations = [];
    var highlightedStations = [];
    var visibleStations = [];
    var highlight = {
        circle: null,
        station: null
    };
    var currentBounds = null;

    function loadStations() {
        stations = stations.concat(stationLoader.loadStations());

        $.map(stations, function(station) {
            station.setClickCallback(clickStationCallback);
        });
    }

    function setNewHighLightedStation(station) {
        // Hide the current circle and route if there are either.
        if (highlight.circle) {
            highlight.circle.setMap(null);
        }

        directionsDisplay.setDirections(null);
        directionsDisplay.setMap(null);

        highlight.circle = new google.maps.Circle({
            map: map,
            radius: 5000, // meters
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

    function setRouteBetweenStations(start, end) {
        var request = {
            origin: start.getLatLng(),
            destination: end.getLatLng(),
            travelMode: google.maps.TravelMode.BICYCLING
        };
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                directionsDisplay.setMap(map);
                var leg = response.routes[0].legs[0];
                console.log('Route: ' + leg.distance.text + ', ~' + leg.duration.text);
            } else {
                console.log("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
            }
        });

        $.map(stations, function(station) {
            station.setVisible([start, end].indexOf(station) !== -1);
        });
    }

    function clickStationCallback(station) {
        console.log('click callback');
        if (highlight.station !== station) {
            console.log('checking if: ' + station.name + ' is highlighted: ' + station.highlighted);
            if (station.highlighted) {
                setRouteBetweenStations(highlight.station, station);
            } else {
                setNewHighLightedStation(station);
            }
        } else {
            console.log('same station clicked');
        }
    }

    return {
        loadStations: loadStations,
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
