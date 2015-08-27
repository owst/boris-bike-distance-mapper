define(['spin.min'], function (Spinner) {
    var opts = {
        lines: 17,
        length: 30,
        width: 9,
        radius: 30,
        scale: 0.5,
        corners: 1,
        color: '#000',
        opacity: 0.25,
        rotate: 0,
        direction: 1,
        speed: 1.2,
        trail: 70,
        fps: 20,
        zIndex: 2e9,
        className: 'spinner',
        top: '50%',
        left: '50%',
        shadow: false,
        hwaccel: true,
        position: 'absolute'
    };

    var spinner = new Spinner(opts);

    function removeSpinner() {
        console.log('removing spinner');
        spinner.spin(false);
    }

    function addSpinnerTo(element) {
        console.log('adding spinner: ' + element);
        spinner.spin(element);
    }

    return {
        addSpinnerTo: addSpinnerTo,
        removeSpinner: removeSpinner
    };
});
