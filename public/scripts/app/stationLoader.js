define(["jquery", "app/station"], function($, Station) {
    return {
        "loadStations": function (stationsLoadedCallback) {
            $.ajax({
                url: "station_data.json",
                dataType: "json",
                success: function (data) {
                    var stations = {};

                    $.each(data.stations.station, function(index, s) {
                        var station = new Station(
                            s.name,
                            parseFloat(s.lat),
                            parseFloat(s.long),
                            s.nbBikes,
                            s.nbEmptyDocks,
                            s.nbDocks
                        );

                        stations[s.id] = station;
                    });

                    stationsLoadedCallback(stations);
                }
            });
        }
    };
});
