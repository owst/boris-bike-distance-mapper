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
        return "<div>Name: " + this.name + "<br/>Bikes free: " +
            this.available_bikes + "<br/>Free docking points: " + this.free_docks +
            "</div>";
    };

    Station.prototype.inBounds = function(bounds) {
        var latRight = bounds.getNorthEast().lat();
        var latLeft = bounds.getSouthWest().lat();
        var longTop = bounds.getNorthEast().lng();
        var longBottom = bounds.getSouthWest().lng();

        return this.latitude >= latLeft && this.latitude <= latRight &&
            this.longitude >= longBottom && this.longitude <= longTop;
    };

    function drawCircleAround(map, marker) {
        console.log('drawing around: ' + marker);
        // Add circle overlay and bind to marker
        var circle = new google.maps.Circle({
            map: map,
            radius: 1000, // meters
            fillColor: '#AA0000'
        });

        circle.bindTo('center', marker, 'position');

        return circle;
    }

    Station.prototype.draw = function(map, infowindow) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.latitude, this.longitude),
            map: map,
            title: this.name
        });

        var that = this;

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(that.descriptionHtml());
            infowindow.open(map, marker);

            // TODO: how to clear any existing circle?
            var circle = drawCircleAround(map, marker);
            map.fitBounds(circle.getBounds());
        });

        return marker;
    };

    return Station;
});
