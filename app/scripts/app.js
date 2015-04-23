/**
 * Main module for POPAYANJS
 * @type {Object}
 * @namespace POPAYANJS
 * @author Alejandro Nanez Ortiz <alejonanez@gmail.com>
 */

var POPAYANJS = POPAYANJS || {};

POPAYANJS.Counter = function (options) {
    'use strict';
    this.count = 0;
    this.buttonElement = options.button;
    this.labelElement = options.paragraph;
};

POPAYANJS.Counter.prototype.add = function () {
    'use strict';
    this.count++;
    return this.count;
};

POPAYANJS.Counter.prototype.startListeners = function () {
    'use strict';
    this.buttonElement.addEventListener('click', this.clicking.bind(this));
};

POPAYANJS.Counter.prototype.clicking = function () {
    'use strict';
    var newVal = this.add();
    this.setLabelText(newVal);
};

POPAYANJS.Counter.prototype.setLabelText = function (newValue) {
    'use strict';
    this.labelElement.textContent = newValue;
};

/**
 * Initializer for POPAYANJS
 * @type {Object}
 * @namespace POPAYANJS
 * @author Alejandro Nanez Ortiz <alejonanez@gmail.com>
 */

var POPAYANJS = POPAYANJS || {};

// New instance
POPAYANJS.App = new POPAYANJS.Counter({
    button: document.getElementsByTagName('button')[0],
    paragraph: document.getElementsByClassName('counter')[0],
});

// Add listeners to the DOM elements
POPAYANJS.App.startListeners();
