define(["gmaps!", "app/map"], function(gmaps, map) {
    function markerWithClickHandler(station) {
        var marker = new gmaps.Marker({
            position: station.getLatLng(),
            map: map,
            title: station.name,
            icon: station.markerIcon(),
            size: new gmaps.Size(22, 40),
            visible: false
        });

        gmaps.event.addListener(marker, "click", function() {
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
        return n + "/" + this.total_docks;
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
        return new gmaps.LatLng(this.latitude, this.longitude);
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

    // For a percentage 0 <= p <= 100, return an int indicating availability:
    // 0 => 0, 1-19 => 1, ... 81-100 => 5 (N.B. inclusive of 100!)
    function getAvailabilityIndicator(percentage) {
        return Math.ceil(percentage / 20);
    }

    Station.prototype.markerIcon = function() {
        var iconWidth = 22;
        var availability = getAvailabilityIndicator(this.percentageOfFreeDocks());
        var originX = this.selected ? 0 : iconWidth * (availability + 1);

        return {
            url: "icons/sprites.png",
            size: new gmaps.Size(iconWidth, 40),
            // The origin for this image is (0, 0).
            origin: new gmaps.Point(originX, 0),
            anchor: new gmaps.Point(iconWidth / 2, 40)
        };
    };

    return Station;
});
