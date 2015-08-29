requirejs.config({
    "baseUrl": "scripts/lib",
    "paths": {
        app: "../app",
        jquery: "//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min",
        gmaps: "googlemaps",
        async: "async"
    }
});

requirejs(["app/main"]);
