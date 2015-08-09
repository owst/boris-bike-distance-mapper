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

    // TODO: this more neatly somehow, without async:false?
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

    return {
        'loadStations': loadStations
    };
});
