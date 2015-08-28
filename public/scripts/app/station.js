define(function() {
    function markerWithClickHandler(station) {
        var marker = new google.maps.Marker({
            position: station.getLatLng(),
            map: map,
            title: station.name,
            icon: station.markerIcon(),
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
        this.selected = false;
    };

    Station.prototype.outOfTotal = function(n) {
        return n + '/' + this.total_docks;
    };

    // TODO: this, more neatly.
    Station.prototype.descriptionHtml = function() {
        return "<div>Name: " + this.name + "<br/>Bikes free: " +
            this.outOfTotal(this.available_bikes) + "<br/>Free docking points: " +
            this.outOfTotal(this.free_docks) + "</div>";
    };

    Station.prototype.percentageOfFreeDocks = function() {
        return Math.floor(this.free_docks / this.total_docks * 100);
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

    Station.prototype.setSelected = function(selected) {
        this.selected = selected;
        this.marker.setIcon(this.markerIcon());
    };

    // For a percentage 0 <= p <= 100, determine the quintile:
    // 0-19 => 1, 20-39 => 2, ... 80-100 => 5 (N.B. inclusive of 100!)
    function getQuintile(percentage) {
        // Ensure roundedQuintile is in the range 0-4
        percentage = percentage === 100 ? 99 : percentage;
        var roundedQuintile = Math.floor(percentage / 20);

        return roundedQuintile + 1;
    }

    Station.prototype.markerIcon = function() {
        var iconWidth = 22;
        var quintile = getQuintile(this.percentageOfFreeDocks());
        var originX = this.selected ? 0 : iconWidth * quintile;

        return {
            url: 'icons/sprites.png',
            size: new google.maps.Size(iconWidth, 40),
            // The origin for this image is (0, 0).
            origin: new google.maps.Point(originX, 0),
            anchor: new google.maps.Point(iconWidth / 2, 40)
        };
    };

    return Station;
});
