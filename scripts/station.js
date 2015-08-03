define("Station", function() {
    return function Station(name, latitude, longitude, available_bikes, free_docks) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.available_bikes = available_bikes;
        this.free_docks = free_docks;
    }
});
