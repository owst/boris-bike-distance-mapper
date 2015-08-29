var colours = ["E5000D", "DD4800", "D59800", "B8CE00", "65C600", "16BF00"];

function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [Math.floor(h * 360), s, l];
}

function toHexChars(s) {
    return s.match(/.{2}/g);
}

var hexChars = $.map(colours, function(c) { return [toHexChars(c)]; });

var ints = $.map(hexChars, function(hs) {
    return [$.map(hs, function(h) { return parseInt(h, 16); })];
});

var hsls = $.map(ints, function(is) {
    return [rgbToHsl.apply(null, is)];
});

$.map(hsls, function(hsl) { console.log(hsl); });
