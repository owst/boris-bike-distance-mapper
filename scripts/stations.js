define(['Station'], function(Station) {
    var stations = [
        new Station("River Street, Clerkenwell", 51.52916347, -0.109970527, 18, 1),
        new Station("Phillimore Gardens, Kensington", 51.49960695, -0.197574246, 2, 35),
        new Station("Caldwell Street, Stockwell", 51.477839, -0.116493, 43, 1)
    ];

    function drawStation(map, station) {
        console.log('Drawing: ' + station.name);

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(station.latitude, station.longitude),
            map: map,
            title: station.name
        });

        var infowindow = new google.maps.InfoWindow({
            content: "<div>name: " + station.name + "<br/>bikes free: " +
                station.available_bikes + "<br/>free docking points: " + station.free_docks +
                "</div>"
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });
    }

    return {
        drawStations: function(map) {
            for(var i = 0; i < stations.length; i++) {
                drawStation(map, stations[i]);
            }
        }
    }
});
