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
    this.count = this.count + 10;
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
