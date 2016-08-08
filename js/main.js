$(function () {
    rings.init();
    rings.initRings();
    rings.setupControls();
});
var rings = {
    pi: "314159265358979323846264338327950288419716939937510",
    e: "271828182845904523536028747135266249775724709369995",
    primes: "012357111317192329313741434753596167717379838997101",
    colors: ["#FB9B00", "#FBE700", "#BEB32E", "#FDF270", "#F50012", "#A1000C", "#FA6F79", "#0D4FA5", "#04326D", "#6695D1"],
    piArray: [],
    eArray: [],
    primesArray: [],
    ringHtMultiplier: 5,
    spaceHtMultiplier: 2,
    numRings: 0,
    ringContainer: "",
    init: function () {
        this.piArray = this.pi.split("");
        this.eArray = this.e.split("");
        this.primesArray = this.primes.split("");
        this.numRings = Math.min(this.piArray.length, this.eArray.length, this.primesArray.length);
    },
    initRings: function () {
        this.ringContainer = $('<div id="rings"></div>');
        this.generateRings();
        this.changeHeight();
        this.changeSpacing();
        this.changeColors();
    },
    setupControls: function () {
        $('#height, #height-amount, #height-multiplier').on('change keyup', function () {
            rings.changeHeight();
        });
        $('#spacing, #space-amount, #space-multiplier').on('change keyup', function () {
            rings.changeSpacing();
        });
        $('#colors').on('change keyup', function () {
            rings.changeColors();
        });
        $('#single-color').on('change', function () {
            $('#colors').val("single");
            rings.changeColors();
        });
        $('#grey-scale').on('change keyup', function () {
            $('#colors').val("grey");
            rings.changeColors();
        });
        $('.hide').on('click', function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active').text('Controls: Hide');
                $('.section').slideDown();
                $('#btn-container').removeClass('fade');
            } else {
                $(this).addClass('active').text('Controls: Show');
                $('.section').slideUp();
                $('#btn-container').addClass('fade');
            }
        });
    },
    generateRings: function (ht, space, op, clr) {
        for (var i = 0; i < rings.numRings; i++) {
            var ring = $('<div class="ring"></div>');
            ring.appendTo(this.ringContainer);
        }
        this.ringContainer.appendTo($('#container'));
    },
    changeHeight: function () {
        var val = $('#height').val();
        var ht = parseInt($('#height-amount').val());
        var mult = parseInt($('#height-multiplier').val());
        switch (val) {
            case "same":
                ht = ht;
                break;
            case "e":
                ht = this.eArray;
                break;
            case "pi":
                ht = this.piArray;
                break;
            case "primes":
                ht = this.primesArray;
                break;
        }
        if (Array.isArray(ht)) {
            for (var i = 0; i < this.numRings; i++) {
                $('.ring').eq(i).height(ht[i] * mult);
            }
        } else {
            $('.ring').height(ht * mult);
        }

    },
    changeSpacing: function () {
        var val = $('#spacing').val();
        var space = parseInt($('#space-amount').val());
        var mult = parseInt($('#space-multiplier').val());
        switch (val) {
            case "same":
                space =  space;
                break;
            case "e":
                space = this.eArray;
                break;
            case "pi":
                space = this.piArray;
                break;
            case "primes":
                space = this.primesArray;
                break;
        }
        if (Array.isArray(space)) {
            for (var i = 0; i < this.numRings; i++) {
                $('.ring').eq(i).css({
                    "marginBottom": Math.max(space[i] * mult, 1) + "px"
                });
            }
        } else {
            $('.ring').css({
                "marginBottom": Math.max(space * mult, 1) + "px"
            });
        }

    },
    changeColors: function (val) {
        var val = $('#colors').val();
        var color;
        switch (val) {
            case "black":
                color = "#000000"
                break;
            case "grey":
                color = this.eArray;
                break;
            case "single":
                color = $('#single-color').val();
                break;
            case "color":
                color = this.colors;
                break;
        }
        if (Array.isArray(color) && val === "color") {
            for (var i = 0; i < this.numRings; i++) {
                var clr = this.colors[this.piArray[i]];
                $('.ring').eq(i).css({
                    "backgroundColor": clr,
                    "opacity": 1
                });
            }
        } else if (Array.isArray(color) && val === "grey") {
            var greyScale;
            var greyVal = $('#grey-scale').val();
            switch (greyVal) {
                case "e":
                    greyScale = this.eArray;
                    break;
                case "primes":
                    greyScale = this.primesArray;
                    break;
                case "pi":
                    greyScale = this.piArray;
                    break;
            }
            for (var i = 0; i < this.numRings; i++) {
                var opacity = (greyScale[i] * 0.1) + 0.1;
                $('.ring').eq(i).css({
                    "backgroundColor": "#000000",
                    "opacity": opacity
                });
            }
        } else {
            $('.ring').css({
                "backgroundColor": color,
                "opacity": 1
            });
        }

    },
}