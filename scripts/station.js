define("Station", function() {
    function markerIcon(highlighted) {
        var icon_name = highlighted ? 'highlighted' : 'normal';

        return 'icons/' + icon_name + '.png';
    }

    function markerWithClickHandler(station) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(station.latitude, station.longitude),
            map: map,
            title: station.name,
            icon: markerIcon(false),
            size: new google.maps.Size(22, 40),
            visible: false
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(station.descriptionHtml());
            infowindow.open(map, marker);

            if (station.clickCallback) {
                station.clickCallback(station);
            }
        });

        return marker;
    }

    var Station = function Station(name, latitude, longitude, available_bikes, free_docks) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.available_bikes = available_bikes;
        this.free_docks = free_docks;
        this.marker = markerWithClickHandler(this);
    };

    // TODO: this, more neatly.
    Station.prototype.descriptionHtml = function() {
        return "<div>Name: " + this.name + "<br/>Bikes free: " +
            this.available_bikes + "<br/>Free docking points: " + this.free_docks +
            "</div>";
    };

    Station.prototype.inBounds = function(bounds) {
        var latRight = bounds.getNorthEast().lat();
        var latLeft = bounds.getSouthWest().lat();
        var longTop = bounds.getNorthEast().lng();
        var longBottom = bounds.getSouthWest().lng();

        var latInRange = this.latitude >= latLeft && this.latitude <= latRight;
        var longInRange = this.longitude >= longBottom && this.longitude <= longTop;

        return latInRange && longInRange;
    };

    Station.prototype.setHighlighted = function(highlighted) {
        console.log('setting highlight: ' + highlighted);
        this.marker.setIcon(markerIcon(highlighted));
    };

    Station.prototype.setVisible = function(visible) {
        this.marker.setVisible(visible);
    };

    Station.prototype.setClickCallback = function(callback) {
        this.clickCallback = callback;
    };

    return Station;
});
