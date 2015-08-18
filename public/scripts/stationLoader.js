define(['Station'], function(Station) {
    function getElementText(container, elementName) {
        return container[elementName];
    }

    function getElementFloat(container, elementName) {
        return parseFloat(getElementText(container, elementName));
    }

    function getElementInt(container, elementName) {
        return parseInt(getElementText(container, elementName));
    }

    function loadStations(stationsLoadedCallback) {
        $.ajax({
            url: "station_data.json",
            dataType: 'json',
            success: function (data) {
                var stations = [];
                $.each(data.stations.station, function(index, s) {
                    var station = new Station(
                        getElementText(s, 'name'),
                        getElementFloat(s, 'lat'),
                        getElementFloat(s, 'long'),
                        getElementInt(s, 'nbBikes'),
                        getElementInt(s, 'nbEmptyDocks'),
                        getElementInt(s, 'nbDocks')
                    );

                    stations.push(station);
                });

                stationsLoadedCallback(stations);
            }
        });
    }

    return {
        'loadStations': loadStations
    };
});
