define(['Station'], function(Station) {
    function getElementText(container, elementName) {
        return container.find(elementName).text();
    }

    function getElementFloat(container, elementName) {
        return parseFloat(getElementText(container, elementName));
    }

    function getElementInt(container, elementName) {
        return parseInt(getElementText(container, elementName));
    }

    // TODO: this more neatly, without async:false.
    function loadStations() {
        var stations = [];

        $.ajax({
            url: "livecyclehireupdates.xml",
            async: false,
            success: function(data) {
                $(data).find('station').each(function() {
                    var s = $(this);
                    var station = new Station(
                            getElementText(s, 'name'),
                            getElementFloat(s, 'lat'),
                            getElementFloat(s, 'long'),
                            getElementInt(s, 'nbBikes'),
                            getElementInt(s, 'nbEmptyDocks')
                            );

                    stations.push(station);
                });
            }
        });

        return stations;
    }

    var stations = loadStations();

    // Use a single infowindow for all markers, so that we only have a single active infowindow
    // regardless of how many markers have been clicked.
    var infowindow = new google.maps.InfoWindow();

    function drawStation(map, station) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(station.latitude, station.longitude),
            map: map,
            title: station.name
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(station.descriptionHtml());
            infowindow.open(map, marker);
        });

        return marker;
    }

    var visibleMarkers = [];

    function clearStations() {
        $.map(visibleMarkers, function(marker) { marker.setMap(null); });

        visibleMarkers = [];
    }

    return {
        drawStations: function(map) {
            clearStations();

            $.map(stations, function(station) {
                var bounds = map.getBounds();

                if (station.inBounds(bounds)) {
                    visibleMarkers.push(drawStation(map, station));
                }
            });
        }
    };
});
