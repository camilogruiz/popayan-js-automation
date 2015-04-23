/**
 * Initializer for POPAYANJS
 * @type {Object}
 * @namespace POPAYANJS
 * @author Alejandro Nanez Ortiz <alejonanez@gmail.com>
 */

var POPAYANJS = POPAYANJS || {};

// New instance
POPAYANJS.App = new POPAYANJS.Counter({
    buttonElement: document.getElementsByTagName('button')[0],
    labelElement: document.getElementsByClassName('counter')[0],
});

// Add listeners to the DOM elements
 POPAYANJS.App.startListeners();
