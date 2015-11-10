﻿import ProCalculator from './proCalc.js'

(function () { // using IIFE to make sure DOM is loaded same as using event on document load
    var calc = new ProCalculator();
})();

(function () {
    function sayMyName(age) {
        return this.firstName + " " + this.lastName + ", " + age;
    }

    var rami = {
        firstName: "Rami",
        lastName: "Amayre"
    };

    var bar = sayMyName.bind(rami)(24);
    console.log(bar);
})();

