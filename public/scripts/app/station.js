define(function() {
    function markerIcon(highlighted) {
        var icon_name = highlighted ? 'highlighted' : 'normal';

        return 'icons/' + icon_name + '.png';
    }

    function markerWithClickHandler(station) {
        var marker = new google.maps.Marker({
            position: station.getLatLng(),
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

    var Station = function Station(name, latitude, longitude,
    available_bikes, free_docks, total_docks) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.available_bikes = available_bikes;
        this.free_docks = free_docks;
        this.total_docks = total_docks;
        this.marker = markerWithClickHandler(this);
    };

    // TODO: this, more neatly.
    Station.prototype.descriptionHtml = function() {
        var that = this;

        function outOfTotal(n) {
            return n + '/' + that.total_docks;
        }

        return "<div>Name: " + this.name + "<br/>Bikes free: " +
            outOfTotal(this.available_bikes) + "<br/>Free docking points: " +
            outOfTotal(this.free_docks) + "</div>";
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

    Station.prototype.getLatLng = function() {
        return new google.maps.LatLng(this.latitude, this.longitude);
    };

    Station.prototype.setVisible = function(visible) {
        this.marker.setVisible(visible);
    };

    Station.prototype.setClickCallback = function(callback) {
        this.clickCallback = callback;
    };

    Station.prototype.setHighlighted = function(highlighted) {
        this.marker.setIcon(markerIcon(highlighted));
    };

    return Station;
});
