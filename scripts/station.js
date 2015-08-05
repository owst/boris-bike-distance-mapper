define("Station", function() {
    var Station = function Station(name, latitude, longitude, available_bikes, free_docks) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.available_bikes = available_bikes;
        this.free_docks = free_docks;
    };

    // TODO: this.
    Station.prototype.descriptionHtml = function() {
        return "<div>name: " + this.name + "<br/>bikes free: " +
            this.available_bikes + "<br/>free docking points: " + this.free_docks +
            "</div>";
    };

    Station.prototype.inBounds = function(bounds) {
        var latRight = bounds.getNorthEast().lat();
        var latLeft = bounds.getSouthWest().lat();
        var longTop = bounds.getNorthEast().lng();
        var longBottom = bounds.getSouthWest().lng();

        return this.latitude >= latLeft &&
            this.latitude <= latRight &&
            this.longitude >= longBottom &&
            this.longitude <= longTop;
    };

    return Station;
});
